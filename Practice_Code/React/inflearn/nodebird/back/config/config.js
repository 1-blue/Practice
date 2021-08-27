require("dotenv").config();

module.exports = {
  development: {
    username: "nodebird_user",
    password: process.env.DB_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
  test: {
    username: "nodebird_user",
    password: process.env.DB_PASSWORD,
    database: "nodebird",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    port: "3306",
    dialect: "mysql",
  },
};
