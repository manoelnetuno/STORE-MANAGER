const productmodel = require('../models/productsModes');


const allproductz = async () =>{
    const producst = await productmodel.getAllProductz();
    return producst;
};

const productId = async () => {
    const product = await productmodel.getProductzById();
    return product
};

module.exports ={
    allproductz,
    productId
};