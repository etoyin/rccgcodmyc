const pool = require("../config/database");

const captilize = (str) => {
  str = str.split(" ");
  return str.map((word,i) => {
    return word[0].toUpperCase() + word.substr(1);
  }).join(" ");
}

module.exports = {
  create: (req, callback) => {
    const {
      name, 
      address, 
      number, 
      email, 
      gender, 
      marital_status,
      dob,
      education,
      water_baptism,
      last_ordained_year,
      year_became_worker,
      year_joined_rccg,
      other_comments,
      training,
      departments,
      ordination,
      position
    } = req.body;
    const dString = departments.join(", ");
    const tString = training.join(", ");


    const file = req.file;
    //console.log(req.body);
    console.log(file);
    pool.query(
      `insert into user
        (
          name, 
          address, 
          number, 
          email, 
          gender, 
          marital_status,
          dob,
          education,
          water_baptism,
          last_ordained_year,
          year_became_worker,
          year_joined_rccg,
          other_comments,
          image_name,
          training,
          departments,
          ordination,
          position
        )
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          captilize(name),
          address, 
          number, 
          email, 
          gender, 
          marital_status,
          dob,
          education,
          water_baptism,
          last_ordained_year,
          year_became_worker,
          year_joined_rccg,
          other_comments,
          file.filename,
          dString,
          tString,
          ordination,
          position
        ],
        (error, results, fields) => {
          if(error){
            return callback(error);
          }

          let user_id = results.insertId;
          console.log(user_id);
          return callback(null, results)
        }
      )
  },
  getUsers: (callback) => {
    pool.query(
      `
      select
        *
        from user
      `,
        [],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  },
  getUserById: (id, callback) => {
    pool.query(
      `select 
        * from user
        where user.id = ?
        `,
        [id],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  },
  updateUser: (data, callback) => {
    pool.query(
      `update user set
        first_name=?,
        last_name=?,
        email=?,
        password=?,
        phone=?,
        organization=?
        where id=?`,
        [
          data.first_name,
          data.last_name,
          data.email,
          data.password,
          data.phone,
          data.organization,
          data.id
        ],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  }
}