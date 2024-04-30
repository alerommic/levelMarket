const {Pool} = require("pg");
require('dotenv').config()

const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

client.connect();

client.query("SELECT * FROM games", (err, res) => {
  if (!err) {
    console.log(res.rows)
    data = res.rows
  } else {
    console.log(err.message)
  }
  client.end
})
