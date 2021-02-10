const userController = require("./user.controller");
var checkTokenMiddleware = require("./../middleware/checkTokenMiddleware");

const express = require("express");

const router = express.Router();

router.post("/signup", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/userInfo", checkTokenMiddleware, userController.getAllUsers);

module.exports = router;
