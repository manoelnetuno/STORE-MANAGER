const fs = require('fs').promises;
const mysql = require('mysql2/promise');

const path = require('path');
const { queries } = require('./index.json');

const MIGRATION_FILE_PATH = '../../../sql/01-migration.sql';
const SEED_FILE_PATH = '../../../sql/02-seed.sql';

const config = {
  host: process.env.MYSQL_HOSTNAME || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: 'StoreManager',
  multipleStatements: true,
};

const getNewConnection = () => mysql.createPool(config);

const runSql = async ({ sql, args = [] }) => {
  const newConnection = getNewConnection();
  const result = await newConnection.query(sql, args);
  await newConnection.end();
  return result;
};

const runQueriesFromFile = async (filePath) => {
  const sqlFile = await fs.readFile(path.join(__dirname, filePath), 'utf8');
  return runSql({ sql: sqlFile });
};

const runMigration = () => runQueriesFromFile(MIGRATION_FILE_PATH);
const runSeed = () => runQueriesFromFile(SEED_FILE_PATH);

const reloadDb = async () => {
  const [tables] = await runSql({ sql: queries.SHOW_TABLES });
  if (tables.length === 0) await runMigration();
  await runSeed();
  return true;
};

const getSaleProductsBySaleId = async (id) => {
  const [result] = await runSql({ sql: queries.GET_SALES_PRODUCTS_BY_ID, args: [id] });
  return result;
};

const getSales = async () => {
  const [result] = await runSql({ sql: queries.GET_SALES_PRODUCTS });
  return result;
};

const getProductById = async (id) => {
  const [[result]] = await runSql({ sql: queries.GET_PRODUCT_BY_ID, args: [id] });
  return result || null;
};

const getSaleById = async (id) => {
  const [[result]] = await runSql({ sql: queries.GET_SALE_BY_ID, args: [id] });
  return result || null;
};

module.exports = {
  reloadDb,
  runSql,
  runMigration,
  runSeed,
  getSaleProductsBySaleId,
  getSales,
  getProductById,
  getSaleById,
};
