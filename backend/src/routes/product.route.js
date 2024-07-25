const route = require('express').Router();
const productControler = require('../controllers/productsController');
const middlewares = require('../middlewares/validations');

route.get('/', productControler.getAllProductz);
route.get('/:id', productControler.getProductzById);
route.post('/', middlewares.validateProduct, productControler.postCreateProduct);
route.put('/:id', middlewares.validateProduct, productControler.putUpdateProduct);
route.delete('/:id', productControler.deleteProduct);

module.exports = route;