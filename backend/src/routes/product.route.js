const route = require('express').Router();
const productControler = require('../controllers/productsController');

route.get('/', productControler.getAllProductz);
route.get('/:id', productControler.getProductzById);
route.post('/', productControler.postCreateProduct);

module.exports = route;