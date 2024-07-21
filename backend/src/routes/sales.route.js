const route = require('express').Router();
const salescontroller = require('../controllers/salesController');

route.get('/sales', salescontroller.getAllSales);

module.exports = route;