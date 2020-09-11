const multer  = require('multer');
const upload = multer({ dest: 'public/images/uploaded' })
//const {getHomePage} = require('./index')

const { 
  createUser,
  getUserById,
  getHomePage,
  getForms,
  getPastors,
  getEachDepartment
  /*updateUser,
  deleteUser,
  login*/
 } = require("../controller/user.controller");
const router = require("express").Router();
//const { checkToken } = require("../auth/token_validation");

router.get("/", getHomePage);
router.post("/register", upload.single('uploaded_img'), createUser);
router.get("/register", getForms);
router.get("/pastors", getPastors);
router.get("/departments", getEachDepartment);
//router.get("/register", getForms);
//router.get("/register", getForms);
//router.get("/register", getForms);
//router.get("/register", getForms);
//router.get("/register", getForms);
//router.get("/all", getUsers);
//router.get("/:id", getUserById);
//router.patch("/update", checkToken, updateUser);
//router.delete("/delete", checkToken, deleteUser);
//router.post("/login", login);

module.exports = router;