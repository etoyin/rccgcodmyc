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
  getAdminLoginForm,
  login,
  adminLogin,
  logout,
  createAdmin,
  getAll,
  getAllWithDepartments,
  getDashboard,
  renderProfile,
  getFormsForUpdate,
  updateUser,
  updateImage,
  updatePassword
  /*deleteUser,
  login*/
 } = require("../controller/user.controller");
const router = require("express").Router();
const { checkToken } = require("../auth/token_validation");


router.get("/", getHomePage);
router.post("/register", upload.single('image'), createUser);
router.get("/register", getForms);
router.get("/pastors", getPastors);
router.get("/departments", getEachDepartment);
router.get("/all-workers", getAll);
router.get("/all-workersWithDepartments", getAllWithDepartments);
router.get("/update", getFormsForUpdate);
router.post("/createAdmin", createAdmin);
router.get("/login", getLoginForm);
router.get("/admin_login", getAdminLoginForm);
router.post("/login", login);
router.post("/admin_login", adminLogin);
router.post("/logout", logout);
router.get("/profile/:id", renderProfile);
router.post("/profile/:id",checkToken, getUserById);
router.get("/dashboard", getDashboard);
router.patch("/update", checkToken, upload.none(), updateUser);
router.patch("/updateImage", checkToken, upload.single("file"), updateImage);
router.patch("/updatePassword", checkToken, upload.none(), updatePassword);
//router.delete("/delete", checkToken, deleteUser);
//router.post("/login", login);

module.exports = router;