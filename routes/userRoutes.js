const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middleware/verifyJWT");
//First protect our "users" end points through jwt
router.use(verifyJWT);
// after securing our connection through jwt then go to the "user" end points
// all these method is gonna happen in the same directory
router
  .route("/")
  .get(userController.getAllUsers)
  .post(userController.createNewUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
