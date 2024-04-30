const {Pool} = require("pg");

app.get("/GameList", (req, res) => {
  res.json(data);
});

client.connect();

const client = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

client.connect();

client.query("SELECT * FROM games", (err, res) => {
  if (!err) {
    data = res.rows
  } else {
    console.log(err.message)
  }
  client.end;
})

module.exports = router;