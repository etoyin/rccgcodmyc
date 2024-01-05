const fs = require('fs');
const cloudinary = require('../cloudinary');
const { genSaltSync, hashSync, compareSync } = require("bcrypt")
const { sign } = require("jsonwebtoken");
//const { checkToken } = require("../auth/token_validation");
// if (typeof localStorage === "undefined" || localStorage === null) {
//   var LocalStorage = require('node-localstorage').LocalStorage;
//   localStorage = new LocalStorage('../scratch');
// }
let dataUpdate = {};
const { 
  create,
  getUsers,
  getUserById,
  updateUser,
  updatePassword,
  updateImage,
  statusUpdate,
  deleteUser,
  getAllWithDepartments,
  getUserByEmail,
  getAdminEmail,
  createAdmin,
 } = require("../services/user.service");
//const { genSaltSync, hashSync, compareSync } = require("bcrypt")
//const { sign } = require("jsonwebtoken");

module.exports = {
  verifyPayment: (req, res) => {
    const https = require('https');
    console.log(req.query.ref);

    // const options = {
    //   hostname: 'api.paystack.co',
    //   port: 443,
    //   path: `/transaction/verify/${req.query.ref}`,
    //   method: 'GET',
    //   headers: {
    //     Authorization: 'Bearer sk_test_daae4ae009a4e566eacd46aa1dd6ca3e1092962b'
    //   }
    // }
    // let data = '';
    
    // https.request(options, res => {
    //   res.on('data', (chunk) => {
    //     data += chunk
    //   });

    //   res.on('end', () => {
    //     console.log(JSON.parse(data))
    //   })
    // }).on('error', error => {
    //   console.error(error)
    // })

    fetch(`https://api.paystack.co/transaction/verify/${req.query.ref}`,{
      headers: {
        Authorization: 'Bearer sk_test_daae4ae009a4e566eacd46aa1dd6ca3e1092962b'
      },
      port: 443,
    })
    .then(res => res.json())
    .then(response => {
      return res.json({
        success: 1,
        data: response
      })
    })
  },
  getPaymentForm: (req, res) => {
    let message = '';
    res.render('payment.ejs', {
      title: 'RCCGCODMYC | Offering & Tithes Payment',
      message: message,
      data: ''
    });
  },
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
  getNonActiveAll: (req, res) => {
    getUsers((error, results) => {
      if(error){
        console.log(error);
      }

      if(!results){
        message = 'No record found';
        res.render('non-active.ejs', {
          title: 'Non Active or Transfered Workers',
          message: message,
          data: results
        });
      }
      //results[0].password = undefined;
      res.render('non-active.ejs', {
        title: 'Non Active or Transfered Workers',
        data: results,
        message: 'Good'
      });
    })
  },
  getAllWithDepartments: (req, res) => {
    getAllWithDepartments((error, results) => {
      if(error){
        console.log(error);
      }

      if(!results){
        message = 'No record found';
        res.status(404).json({
          success: false,
          message,
          data: results
        });
      }
      //results[0].password = undefined;
      res.render('downloadDataInSheet.ejs', {
        data: results,
        message: 'Good',
        success: true,
        title: 'RCCGCODMYC | Download All',
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
  getDashboard: (req, res) => {
    getUsers((error, results) => {
      if(error){
        console.log(error);
      }

      if(!results){
        message = 'No record found';
        res.render('dashboard.ejs', {
          title: 'Dashboard',
          message: message,
          data: results
        });
      }
      //results[0].password = undefined;
      res.render('dashboard.ejs', {
        title: 'Dashboard',
        data: results,
        message: 'Good'
      });
    })
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
  updateImage: async(req, res, next) => {
    const {path} = req.file;
    let url = '';
    cloudinary.uploader.upload(path, function(err, result){
      if(err){
        console.log(err);
      }
      // console.log(result);
      url = result.secure_url;
    })
    .then(() => {
      fs.unlinkSync(path);
      updateImage(req, url, (error, results) => {
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
          message: "Image added successfully"
        });
      });

    })
    // console.log(url);

    
    
  },
  createUser: async (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    let url = "";
    body.password = hashSync(body.password, salt);
    const {path} = req.file;
    cloudinary.uploader.upload(path, function(err, result){
      if(err){
        console.log(err);
      }
      // console.log(result);
      url = result.secure_url;
    })
    .then(()=>{

      fs.unlinkSync(path);
      
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

    })
    
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

      //console.log(data);
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
  updatePassword: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (error, results) => {
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
          message: "Invalid email or password"
        });
      }
      const passwordCorrect = compareSync(body.old, results.password);
      
      if(passwordCorrect){
        const body = req.body;
        const salt = genSaltSync(10);
        body.newP = hashSync(body.newP, salt);
        updatePassword(body, (error, results) => {
          if(error){
            console.log(eror);
          }
          return res.json({
            success: true,
            message: "Password Changed successfully",
            genMessage: "",
            data: results
          });
        });
      }else{
        return res.json({
          success: false,
          message: "invalid Old Password"
        });
      }
    })
  },
  updateUser: (req, res) => {
    const body = req.body;
    // console.log(body)
    updateUser(body, (error, results) => {
      if(error){
        console.log(error);
        return res.json({
          success: false,
          message: error
        });
      }
      if(!results){
        return res.json({
          success: false,
          message: "Failed to Update user"
        });
        
      }
      return res.json({
        success: true,
        message: "Update Succesful",
        data: results
      })
      //dataUpdate.message = 'Updated successfully!';
    });
  },
  statusUpdate: (req, res) => {
    const body = req.body;
    // console.log(body)
    statusUpdate(body, (error, results) => {
      if(error){
        console.log(error);
        return res.json({
          success: false,
          message: error
        });
      }
      if(!results){
        return res.json({
          success: false,
          message: "Failed to Update user"
        });
        
      }
      return res.json({
        success: true,
        message: "Update Succesful",
        data: results
      })
      //dataUpdate.message = 'Updated successfully!';
    });
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