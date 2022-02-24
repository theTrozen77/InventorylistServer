var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var bodyparser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var authRouter = require("./routes/auth");
var user = require("./user/user.router");
var product = require("./product/product.route");
var cors = require("cors");

var app = express();
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: true }));
require("./dbConfig");
app.use("/", indexRouter);
app.use("/product", product);
// app.use("/users", usersRouter);
// app.use("/auth", authRouter);
app.use("/auth", user);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "This path doesnot exists"));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log("Error handling middleware");
  res.json({
    message: err.message,
    status: err.status,
  });
  next();
  // render the error page
  // res.status(err.status || 500);
  // res.render("error");
});

module.exports = app;
