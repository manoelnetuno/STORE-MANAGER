const validateSales = (req, res, next) => {
  const saleItems = req.body;
  if (!saleItems || saleItems.length === 0) {
    return res.status(400).json({ message: 'No sale items provided' });
  }
  if (saleItems.some((item) => !item.productId || item.productId <= 0)) {
    return res.status(400).json({ message: '"productId" is required' });
  }
  if (saleItems.some((item) => item.quantity === undefined)) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};
const validateQuantity = (req, res, next) => {
  const saleItems = req.body;
  if (saleItems.some((item) => item.quantity <= 0)) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};
module.exports = {
  validateSales,
  validateQuantity,
};