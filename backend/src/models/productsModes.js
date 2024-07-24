const dB = require('./connections');

const getAllProductz = async () => {
  const [products] = await dB.execute('SELECT * FROM products');
  return products;
};

const getProductzById = async (id) => {
  const [product] = await dB.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

const postCreateProduct = async (name) => {
  const [{ insertId }] = await dB.execute('INSERT INTO products (name) VALUES (?)', [name]);
  return {
    id: insertId,
    name,
  };
};

module.exports = {
  getAllProductz,
  getProductzById,
  postCreateProduct,
};