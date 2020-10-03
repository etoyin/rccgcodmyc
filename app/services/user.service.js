const pool = require("../config/database");

const captilize = (str) => {
  str = str.split(" ");
  return str.map((word,i) => {
    return word[0].toUpperCase() + word.substr(1);
  }).join(" ");
}

module.exports = {
  create: (req, newPath, callback) => {
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
          departments,
          training,
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
          newPath,
          departments,
          training,
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
  createAdmin: (data, callback) => {
    pool.query(
      `insert into admin(email, password, name)
                    values(?,?,?)`,
       [
         data.email,
         data.password,
         data.name
       ],
       (error, results, fields) => {
         if(error){
           return callback(error);
         }
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
  getUserByEmail: (email, callback) => {
    pool.query(
      `select
        * from admin
        where email = ?`,
        [email],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results[0])
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