const fs = require('fs');
const cloudinary = require('../cloudinary');
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken");
//const { checkToken } = require("../auth/token_validation");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

const { 
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  createAdmin,
 } = require("../services/user.service");
//const { genSaltSync, hashSync, compareSync } = require("bcrypt")
//const { sign } = require("jsonwebtoken");

module.exports = {
  getAll: (req, res) => {
    getUsers((error, results) => {
      if(error){
        console.log(error);
      }

      if(!results){
        message = 'No record found';
        res.render('allWorkers.ejs', {
          title: 'All Workers in COD',
          message: message,
          data: results
        });
      }

      res.render('allWorkers.ejs', {
        title: 'All Workers in COD',
        data: results,
        message: 'Good'
      });

    })
  },
  getLoginForm: (req, res) => {
    let message = '';
    res.render('login.ejs', {
      title: 'RCCGCODMYC | Administrator Login',
      message: message,
      data: ''
    });
  },
  getForms: (req, res) => {
    let message = '';
    res.render('form.ejs', {
      title: 'RCCGCODMYC | View Ministers',
      message: message,
      data: ''
    });
  },
  createUser: async (req, res) => {
    console.log("object")
    //const body = req.body;
    //const salt = genSaltSync(10);
    //body.password = hashSync(body.password, salt);
    const uploader = async (path) => await cloudinary.uploads(path, 'Images');
    const file = req.file;
    const {path} = file;
    const newPath = await uploader(path);
    //const newPat = uploader(path);
    //const fileName = (new Date).valueOf() + "-" + file.originalname;
    //console.log(fileName);
    console.log(newPath.url);
    //console.log(newPat);
    fs.unlinkSync(path);
    create(req, newPath.url, (error, results) => {
      //console.log("object")
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
      res.render('profile.ejs', {
        title: results[0].name,
        data: results,
        message: 'Good'
      });
    });
  },
  getEachDepartment: (req, res) => {
    let department = req.query.department;
    getUsers((error, results) => {
      if(error){
        console.log(error);
      }
      
      let data = results.filter((data) => {
        let departm = new RegExp(department,"i");
        return data.departments.search(departm) >= 0
      })

      if(!data){
        message = 'No record found';
        res.render('departments.ejs', {
          title: department.toUpperCase() + 'department',
          message: message,
          data,
        });
      }

      res.render('departments.ejs', {
        title: department.toUpperCase() + 'department',
        data,
        message: 'Good'
      });

    })
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
  },
  deleteUser: (req, res) => {
    const body = req.body;
    deleteUser(body, (error, results) => {
      if(error){
        console.log(error);
        return res.json({
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
        message: "user deleted successfully"
      });
    });
  },
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    console.log(req.body);
    console.log("object")
    body.password = hashSync(body.password, salt);
    createAdmin(body, (error, results) => {
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
  },
  logout: (req, res) => {
    localStorage.clear();
    return res.redirect('/');
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (error, results) => {
      if(error){
        console.log(error)
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
      //console.log(results);
      const passwordCorrect = compareSync(body.password, results.password);
      if(passwordCorrect){
        results.password = undefined;
        const token = sign({ result: results}, process.env.JWT_KEY, {
          expiresIn: "24h"
        });
        localStorage.setItem('admin-data', JSON.stringify({
          success: 1,
          message: "Login successfully",
          token: token,
          data: results
        }));
        return res.json({
          success: 1,
          message: "Login successfully",
          token: token,
          data: results
        });
      }else{
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
    })
  }
}