const route = require('express').Router();
const salescontroller = require('../controllers/salesController');

route.get('/', salescontroller.getAllSales);
route.get('/:id', salescontroller.getSalesId);

module.exports = route;