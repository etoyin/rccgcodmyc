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
      password,
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
      position,

    } = req.body;
    let hodDepartment = (req.body.hodDepartment != undefined) ? req.body.hodDepartment: '';
    
    pool.query(
      `insert into user
        (
          name, 
          address, 
          number, 
          email,
          password, 
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
          position,
          hodDepartment
        )
        values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
        [
          captilize(name),
          address, 
          number, 
          email,
          password,
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
          position,
          hodDepartment
        ],
        (error, results, fields) => {
          if(error){
            return callback(error);
          }

          let user_id = results.insertId;
          return callback(null, results)
        }
      )
  },
  updateImage: (req, newPath, callback) => {
    const {name, type, id} = req.body;
    let typeOfCert;
    switch (type) {
      case "baptismal":
        typeOfCert = "baptismalCertificate"
        break;
      case "worker":
        typeOfCert = "workersCertificate";
        break;
      case "sod":
        typeOfCert = "sodCertificate";
        break;
      case "college":
        typeOfCert = "collegeCertificate"
        break;
      default:
        break;
    }
    pool.query(
      `update user set 
          ${typeOfCert}=?
          where id=?
        `,
        [
          newPath,
          id
        ],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
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
  getAllWithDepartments: (callback) => {
    pool.query(
      `
      select
        name, departments
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
        * from user
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
  getAdminEmail: (email, callback) => {
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
      position,
      id
    } = data;
    // console.log(data);
    let hodDepartment = (data.hodDepartment != undefined) ? data.hodDepartment: '';
    pool.query(
      `update user set
        name=?, 
        address=?, 
        number=?, 
        email=?,
        gender=?, 
        marital_status=?,
        dob=?,
        education=?,
        water_baptism=?,
        last_ordained_year=?,
        year_became_worker=?,
        year_joined_rccg=?,
        other_comments=?,
        departments=?,
        training=?,
        ordination=?,
        position=?,
        hodDepartment=?
        where id=?`,
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
          departments,
          training,
          ordination,
          position,
          hodDepartment,
          id
        ],
        (error, results, field) => {
          if(error){
            return callback(error);
          }
          return callback(null, results)
        }
    )
  },
  updatePassword: (data, callback) => {
    const {
      newP,
      id
    } = data;
    pool.query(
      `update user set
        password=?
        where id=?`,
        [
          newP,
          id
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