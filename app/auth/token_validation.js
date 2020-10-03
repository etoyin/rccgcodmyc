const { verify } = require("jsonwebtoken");
require("dotenv").config();


module.exports = {
  checkToken: (req, res, next) => {
    let data = JSON.parse(localStorage.getItem('admin-data'));
    if(data && data.token){
      //data.token = data.token.slice(7);
      console.log(data);
      verify(data.token, process.env.JWT_KEY, (error, decoded) => {
        if(error){
          console.log(error)
          res.render('unauthorized.ejs', {
            title: 'Unauthorized to access',
            message: 'Unauthorized User'
          });
        }else{
          next();
        }
      })
    }else{
      res.render('unauthorized.ejs', {
        title: 'Unauthorized to access',
        message: 'Login as admin to get access'
      });
    }
  }
}