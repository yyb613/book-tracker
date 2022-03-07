// const Sequelize = require('sequelize');
require('dotenv').config();

// let sequelize;

// if (process.env.JAWSDB_URL) {
//   sequelize = new Sequelize(process.env.JAWSDB_URL);
// } else {
//   sequelize = new Sequelize(
//     process.env.DB_NAME,
//     process.env.DB_USER,
//     process.env.DB_PASSWORD,
//     {
//       host: 'localhost',
//       dialect: 'mysql',
//       port: 3306
//     }
//   );
// }

// module.exports = sequelize;
const mysql = require("mysql2"); // mysql2

// Connect to database
let connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
connection = mysql.createConnection({
  host: "localhost", // Host
  user: process.env.DB_USER, // Username
  password: process.env.DB_PASSWORD, // Password
  database: process.env.DB_DATABASE, // Database
});

connection.connect(function (err) {
  if (err) throw err; // error handling
});
}

module.exports = connection;