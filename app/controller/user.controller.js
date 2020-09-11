const { 
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail
 } = require("../services/user.service");
//const { genSaltSync, hashSync, compareSync } = require("bcrypt")
//const { sign } = require("jsonwebtoken");

module.exports = {
  getForms: (req, res) => {
    let message = ''
    res.render('form.ejs', {
      title: 'RCCGCODMYC | View Ministers',
      message: message,
      data: ''
    });
  },
  createUser: (req, res) => {
    //const body = req.body;
    //const salt = genSaltSync(10);
    //body.password = hashSync(body.password, salt);
    //console.log(req.body);
    //console.log(req.file);
    const file = req.file;
    console.log(file);
    console.log(req.body);
    if(file.mimetype == "image/jpeg"||file.mimetype == "image/png"||file.mimetype == "image/gif" ){

      create(req, (error, results) => {
        if(error){
          console.log(error);
          return res.status(500).json({
            success: 0,
            message: "Database connection error"
          });
        }
        return res.status(200).json({
          success: 1,
          data: results
        })
      })
    }else{
      return res.status(500).json({
        success: 0,
        message: "Image format Not supported"
      });
    }
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (error, results) => {
      if(error){
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Record not found"
        });
      }
      return res.json({
        success: 1,
        data: results
      });
    });
  },
  getPastors: (req, res) => {
    getUsers((error, results) => {
      if(error){
        console.log(error);
      }
      if(!results){
        message = 'No record found';
        res.render('pastors.ejs', {
          title: 'The Pastorate',
          message: message,
        });
      }
      let data = results.filter((data) => {
        return data.position == 'Pastorate';
      })
      console.log(data);
      res.render('pastors.ejs', {
        title: 'The Pastorate',
        data,
        message: 'Good'
      });

    })
  },
  getHomePage: (req, res) => {
    //const id = req.params.id;
    let message = '';
    getUsers( (error, results) => {
      if(error){
        console.log(error);
        //res.redirect('/')
      }
      if(!results){
        message = 'No record found';
        res.render('index.ejs', {
          title: 'RCCGCODMYC | View Ministers',
          message: message,
        });
      }
      //console.log(results)
      res.render('index.ejs', {
        title: 'RCCGCODMYC | View Ministers',
        data: results,
        message: 'Good'
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    updateUser(body, (error, results) => {
      if(error){
        console.log(error);
        return res.json({
          success: 0,
          message: error
        });
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Failed to Update user"
        });
      }
      return res.json({
        success: 1,
        message: "Updated successfully"
      })
    })
  }
}