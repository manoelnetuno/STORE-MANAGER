const saleService = require('../services/salesService');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const getAllSales = async (req, res) => {
  const sales = await saleService.getAllSales();
  return res.status(200).json(sales);
};

const getSalesId = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await saleService.getSalesId(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const postCreateSale = async (req, res) => {
  const saleItems = req.body;
  const saleCreated = await saleService.createSale(saleItems);
  res.status(201).json(saleCreated);
};

module.exports = {
  getAllSales,
  getSalesId,
  postCreateSale,
};