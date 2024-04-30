const express = require("express");
const cors = require("cors");
const app = express();
const {Pool} = require("pg");
require('dotenv').config()

app.use(cors());
app.use(express.json());


const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

getGames();





function getGames() {

client.connect();

client.query("SELECT * FROM games", (err, res) => {
  if (!err) {
    data = res.rows
  } else {
    console.log(err.message)
  }
  client.end;

  app.get("/GameList", (req, res) => {
    res.json(data);
  });
  
  app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
  });
  
})}