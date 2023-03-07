const express = require("express");
const { connect } = require("./models");
const pokemonsRouter = require("./routes/pokemons");
const port = 3000;
const app = express();

app.use("/pokemons", pokemonsRouter);

app.listen(port, () => {
  connect();
  console.log(`Server running on port: ${port}`);
});
