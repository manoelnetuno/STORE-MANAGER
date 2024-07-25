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

const putUpdateProduct = async (id, name) => {
  const query = 'UPDATE products SET name = ? WHERE id= ?';
  const values = [name, id];
  await dB.execute(query, values);
  return { id, name };
};

const deleteProduct = async (id) => {
  const query = 'DELETE FROM products WHERE id= ?';
  await dB.execute(query, [id]);
};
module.exports = {
  getAllProductz,
  getProductzById,
  postCreateProduct,
  putUpdateProduct,
  deleteProduct,
};