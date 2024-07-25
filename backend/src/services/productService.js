const productmodel = require('../models/productsModes');

const allproductz = async () => {
  const producst = await productmodel.getAllProductz();
  return producst;
};

const productId = async (id) => {
  const product = await productmodel.getProductzById(id);
  console.log(product);
  return product;
};

const createProduct = async (name) => {
  const newProduct = await productmodel.postCreateProduct(name);
  return newProduct;
};

const updateProduct = async (id, name) =>
  productmodel.putUpdateProduct(id, name);

const deleteProduct = async (id) => productmodel.deleteProduct(id);

module.exports = {
  allproductz,
  productId,
  createProduct,
  updateProduct,
  deleteProduct,
};