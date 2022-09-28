// 数据库连接模块

const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10, // 限制连接个数
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'freshproduce'
});

module.exports = pool; // 暴露