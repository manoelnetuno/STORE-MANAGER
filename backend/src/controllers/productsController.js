const productService = require('../services/productService');

const getAllProductz = async (req, res) => {
  const products = await productService.allproductz();
  return res.status(200).json(products);
};
const getProductzById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.productId(id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
};

module.exports = {
  getAllProductz,
  getProductzById,
};