const route = require('express').Router();
const productControler = require('../controllers/productsController');

route.get('/products', productControler.getallproductz);


module.exports = route ;