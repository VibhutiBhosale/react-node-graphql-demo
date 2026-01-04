const { Pool } = require("pg");

const pool = new Pool({
  host: "127.0.0.1",
  user: "vibhuti.topale",   // 👈 your macOS username
  database: "graphql_demo",
  port: 5432,
  // password not required for local Homebrew setup
});

module.exports = pool;
