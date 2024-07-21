const route = require('express').Router();
const salescontroller = require('../controllers/salesController');

route.get('/sales/:id', salescontroller.getSalesId);

module.exports = route;