const salesModel = require('../models/salesmodes');
const productModel = require('../models/productsModes');

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const getSalesId = async (id) => {
  const sale = await salesModel.getSalesId(id);
  if (!sale || sale.length === 0) {
    return {
      status: 'NOT_FOUND',
      data: {
        message: 'Sale not found',
      },
    };
  }
  return {
    status: 'SUCCESSFUL',
    data: sale,
  };
};
const createSale = async (saleItems) => {
  const insertId = await salesModel.postCreateSale(saleItems);
  const insertProducts = saleItems.map(({ productId, quantity }) => 
    salesModel.postCreateSaleProduct(
      insertId,
      productId,
      quantity,
    ));
  await Promise.all(insertProducts);

  const sale = {
    id: insertId,
    itemsSold: saleItems,
  };
  return sale;
};
module.exports = {
  getAllSales,
  getSalesId,
  createSale,
};
