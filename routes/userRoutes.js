const express = require("express");
const {
  createUser,
  getUserById,
  protect,
} = require("../controller/userController");
const checkError = require("../middleware/checkError");
const {
  createUserValidator,
  getUserValidator,
} = require("../middleware/validation/userValidator");
const router = express.Router();

router.route("/").post(createUserValidator, checkError, createUser);
router.route("/:id").get(protect, getUserValidator, checkError, getUserById);

module.exports = router;
