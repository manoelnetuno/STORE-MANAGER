const salesModel = require('../models/salesmodes');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesId = async (id) => {
  const sale = await salesModel.getSalesId(id);
  if (!sale || sale.length === 0) {
    return {
      status: 404,
      data: {
        message: 'Sale not found',
      },
    };
  }
  return {
    status: 200,
    data: sale,
  };
};

module.exports = {
  getAllSales,
  getSalesId,
};
