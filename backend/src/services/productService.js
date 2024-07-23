const productmodel = require('../models/productsModes');

const allproductz = async () => {
  const producst = await productmodel.getAllProductz();
  return producst;
};

const productId = async (id) => {
  const product = await productmodel.getProductzById(id);
  return product;
};

module.exports = {
  allproductz,
  productId,
};