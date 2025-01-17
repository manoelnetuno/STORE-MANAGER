const route = require('express').Router();
const salescontroller = require('../controllers/salesController');
const middlewares = require('../middlewares/validationsSales');

route.get('/', salescontroller.getAllSales);
route.get('/:id', salescontroller.getSalesId);
route.post(
  '/',
  middlewares.validateSales, 
  middlewares.validateQuantity,
  middlewares.validateProduct, 
  salescontroller.postCreateSale,
);

module.exports = route;