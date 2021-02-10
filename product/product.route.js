const productControllerMethods = require("./product.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
// var upload = multer({ dest: "./public/uploads" });

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
var upload = multer({
  storage: storage,
});

router.get("/product", (req, res) => {
  res.send("inside");
});
router.get("/productList", productControllerMethods.fetchAllProduct);
router.get(
  "/productList/:productId",
  productControllerMethods.fetchProductById
);
router.post(
  "/createProduct",
  upload.single("img"),
  productControllerMethods.createProduct
);
router.put("/productList/:productId", productControllerMethods.updateProduct);
router.get("/users/:id/product", productControllerMethods.getAllProductByUser);

module.exports = router;
