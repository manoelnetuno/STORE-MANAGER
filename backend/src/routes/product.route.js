const route = require('express').Router();
const productControler = require('../controllers/productsController');

route.get('/', productControler.getAllProductz);
route.get('/:id', productControler.getProductzById);
route.post('/', productControler.postCreateProduct);
route.put('/:id', productControler.putUpdateProduct);
route.delete('/:id', productControler.deleteProduct);

module.exports = route;