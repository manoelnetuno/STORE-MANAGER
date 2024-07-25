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
const postCreateProduct = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"Name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"Name" length must be at least 5 characters long' });
  }
  try {
    const newProduct = await productService.createProduct(name);
    res.status(201).json(newProduct);
  } catch (error) {
    const errorMessage = error.message && 'Failed to create product';
    res.status(422).json({ message: errorMessage });
  }
};
const putUpdateProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }
  const producst = await productService.productId(productId);
  if (!producst) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const updatedProduct = await productService.updateProduct(productId, name);
  return res.status(200).json(updatedProduct);
};
const deleteProduct = async (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const existingProduct = await productService.productId(productId);
  if (!existingProduct) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await productService.deleteProduct(productId);
  return res.status(204).send();
};
module.exports = {
  getAllProductz,
  getProductzById,
  postCreateProduct,
  putUpdateProduct,
  deleteProduct,
};