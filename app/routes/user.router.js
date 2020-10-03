//const {getHomePage} = require('./index')
const upload = require('../multer');
const { 
  createUser,
  getUserById,
  getHomePage,
  getForms,
  getPastors,
  getEachDepartment,
  getLoginForm,
  login,
  logout,
  createAdmin,
  getAll,
  renderProfile,
  /*updateUser,
  deleteUser,
  login*/
 } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");


router.get("/", getHomePage);
router.post("/register", upload.single('uploaded_img'), createUser);
router.get("/register", getForms);
router.get("/pastors", getPastors);
router.get("/departments", getEachDepartment);
router.get("/all-workers", getAll);
router.post("/createAdmin", createAdmin);
router.get("/login", getLoginForm);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile/:id", renderProfile);
router.post("/prof/:id",checkToken, getUserById);
//router.patch("/update", checkToken, updateUser);
//router.delete("/delete", checkToken, deleteUser);
//router.post("/login", login);

module.exports = router;