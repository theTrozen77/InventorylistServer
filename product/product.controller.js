const Product = require("./product.model");

const fetchAllProduct = async (req, res) => {
  const productList = await Product.find();
  res.status(200).json(productList);
};

const fetchProductById = async (req, res) => {
  const productById = await Product.findById(req.params.productId);
  res.status(200).json(productById);
};

const createProduct = async (req, res) => {
  console.log("requset file", req.file);
  var NewProduct = new Product({});
  NewProduct.productName = req.body.productName;
  NewProduct.productCost = req.body.productCost;
  NewProduct.available = req.body.available;
  NewProduct.owner = req.body.owner;
  NewProduct.image = req.file.filename;
  try {
    await NewProduct.save()
      .then((data) => {
        console.log("data is ", data);
        res.status(200).json(data);
      })
      .catch((error) => {
        console.log("err is", error);
        res.end(error);
      });
  } catch (e) {
    res.end(e);
  }
};

const updateProduct = async (req, res) => {
  const updatedProduct = await Product.findById(req.params.productId);

  const { productName, productCost } = req.body;
  const newUpdatedProduct = {
    ...updatedProduct,
    productName,
    productCost,
  };
  res.status(200).json(updatedProduct);
  console.log("new updated product", newUpdatedProduct.productName);
  await Product.update();
};

const uploadProductPhotoFile = (req, res) => {};

const deleteProduct = () => {};

const getAllProductByUser = async (req, res) => {
  try {
    let foundProduct = await Product.find({
      owner: req.params.id,
    }).populate("owner");
    res.status(200).json(foundProduct);
  } catch (e) {
    res.json({ message: e });
  }
};

module.exports = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
  fetchAllProduct: fetchAllProduct,
  fetchProductById: fetchProductById,
  getAllProductByUser: getAllProductByUser,
};
