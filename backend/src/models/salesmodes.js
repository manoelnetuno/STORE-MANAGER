const dB = require('./connections');

const getAllSales = async () => {
  const [sales] = await dB.execute(` 
    SELECT 
        s.id AS saleId, 
        s.date, 
        sp.product_id AS productId, 
        sp.quantity
    FROM 
        sales AS s
    INNER JOIN 
        sales_products AS sp 
    ON 
        s.id = sp.sale_id
    ORDER BY 
        s.id, 
        sp.product_id
    `);
  return sales;
};

const getSalesId = async (id) => {
  const [sales] = await dB.execute( 
    `SELECT 
        s.date, 
        sp.product_id as productId,
        sp.quantity
    FROM 
        sales as s
    INNER JOIN 
        sales_products as sp ON s.id = sp.sale_id
    WHERE 
        s.id = ?
    ORDER BY 
        s.id, sp.product_id`, 
    [id],
  );
  return sales;
};

module.exports = {
  getAllSales,
  getSalesId,
};