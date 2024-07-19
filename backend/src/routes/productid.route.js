const route = require('express').Router();
const productControler = require('../controllers/productsController');

route.get('/products/:id', productControler.getProductzById);

module.exports = route;
