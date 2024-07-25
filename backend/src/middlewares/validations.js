const validateProduct = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: '"Name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"Name" length must be at least 5 characters long' });
  }
  next();
};
// const validateSales = async (req, res, next) => {

// };
module.exports = {
  validateProduct,
  // validateSales,
};
