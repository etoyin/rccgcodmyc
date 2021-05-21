const fs = require('fs');
const cloudinary = require('../cloudinary');
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken");
//const { checkToken } = require("../auth/token_validation");
if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}
let dataUpdate = {};
const { 
  create,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserByEmail,
  getAdminEmail,
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
      //results[0].password = undefined;
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
      title: 'RCCGCODMYC | Login',
      message: message,
      data: ''
    });
  },
  getAdminLoginForm: (req, res) => {
    let message = '';
    res.render('adminLogin.ejs', {
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
  getFormsForUpdate: (req, res) => {
    let message = '';
    res.render('update.ejs', {
      title: 'RCCGCODMYC | View Ministers',
      message: message,
      data: ''
    });
  },
  createUser: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    const uploader = async (path) => await cloudinary.uploads(path, req.body.name);
    const urls = [];
    const files = req.files;
    for(const file of files){
      const {path} = file;
      const newPath = await uploader(path);
      urls.push(newPath.url);
      fs.unlinkSync(path);
    }
    let url = urls.join(", ");
    
    create(req, url, (error, results) => {
      if(error){
        console.log(error);
        return res.status(500).json({
          success: 0,
          message: "Database connection error"
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
        message: "Registration Successful"
      });
    });
    
  },
  createAdmin: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
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
  renderProfile: (req, res) => {
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
      if(results[0]){
        results[0].password = undefined;
        res.render('profile.ejs', {
          title: results[0].name,
          data: results,
          message: 'Good'
        })
      }
    });
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
        message: "Successful",
        data: results
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
        department,
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
      res.render('index.ejs', {
        title: 'RCCGCODMYC | View Ministers',
        data: results,
        message: 'Good'
      });
    });
  },
  updateUser: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    console.log(req.body);
    const uploader = async (path) => await cloudinary.uploads(path, req.body.name);
    const urls = [];
    const files = req.files;
    for(const file of files){
      const {path} = file;
      const newPath = await uploader(path);
      urls.push(newPath.url);
      fs.unlinkSync(path);
    }
    let url = urls.join(", ");
    updateUser(body, url, (error, results) => {
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
      //dataUpdate.message = 'Updated successfully!';
    });
    getUserByEmail(body.email, (error, results) => {
      if(error){
        console.log(error);
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
        
      results.password = undefined;
      const token = sign({ result: results}, process.env.JWT_KEY, {
        expiresIn: "100h"
      });
      return res.json({
        success: 1,
        message: "updated successfully",
        genMessage: "LoggedIn",
        token: token,
        data: results
      });
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
  logout: (req, res) => {
    localStorage.clear();
    return res.redirect('/');
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (error, results) => {
      if(error){
        console.log(error);
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
      const passwordCorrect = compareSync(body.password, results.password);
      
      if(passwordCorrect){
        
        results.password = undefined;
        const token = sign({ result: results}, process.env.JWT_KEY, {
          expiresIn: "100h"
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          genMessage: "LoggedIn",
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
  },
  adminLogin: (req, res) => {
    const body = req.body;
    getAdminEmail(body.email, (error, results) => {
      if(error){
        console.log(error);
      }
      if(!results){
        return res.json({
          success: 0,
          message: "Invalid email or password"
        });
      }
      const passwordCorrect = compareSync(body.password, results.password);
      
      if(passwordCorrect){
        
        results.password = undefined;
        const token = sign({ result: results}, process.env.JWT_KEY, {
          expiresIn: "100h"
        });
        return res.json({
          success: 1,
          message: "Login successfully",
          genMessage: "LoggedIn",
          admin: true,
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