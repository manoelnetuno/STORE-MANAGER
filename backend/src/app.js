const express = require('express');
const { productRoute, salesRoute } = require('./routes');

const app = express();

// não remova esse endpoint,    é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.json({ status: 'Store Manager UP!' });
});
app.use(express.json(''));
app.use('/products', productRoute);
app.use('/sales', salesRoute);

module.exports = app;
