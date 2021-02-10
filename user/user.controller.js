const User = require("./user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Logger } = require("mongodb");

const getHashedPassword = (password, hashedValue) => {
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log("Error in hashing password", err);
      return;
    }
    hashedValue(hash);
  });
};

const createUser = async (req, res, next) => {
  getHashedPassword(req.body.password, async (hashedResult) => {
    var NewUser = new User({});
    NewUser.firstName = req.body.firstName;
    NewUser.lastName = req.body.lastName;
    NewUser.userName = req.body.userName;
    NewUser.password = hashedResult;
    try {
      const user = await NewUser.save((err, saved) => {
        if (err) {
          // next(err);
          return res.status(400).json({
            error: err,
          });
        }
        console.log("Data saved in db", saved);
        res.status(201).json({ message: "User created" });
      });

      console.log(user);
    } catch (e) {
      console.error(e);
    }
  });
};

const getUserData = (user) => {
  return {
    userName: user.userName,
    userId: user._id,
    userFullName: user.firstName + " " + user.lastName,
  };
};

const getAllUsers = async (req, res) => {
  const response = await User.find();
  res.status(200).json(response);
};

const loginUser = (req, res) => {
  try {
    User.findOne({
      userName: req.body.userName,
    })
      .exec()
      .then((loginData) => {
        bcrypt.compare(req.body.password, loginData.password, (err, result) => {
          if (result) {
            const userDetails = getUserData(loginData);
            var token = jwt.sign(userDetails, "mysecret__!");
            res.status(200).json({
              message: "User logged In",
              token: token,
            });
          } else {
            console.log("Error in password hashing parsing", err);
            next({ message: err.message });
          }
        });
      })
      .catch((error) => {
        console.log("User not found");
        res.status(404).json({
          message: "UserName doesnot exists",
          status: 404,
        });
        next({ message: err.message, status: 404 });
      });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getAllUsers: getAllUsers,
};
