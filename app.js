const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./models");
const pokemonsRouter = require("./routes/pokemons");
const port = 3000;
const app = express();

//ejs config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//declaring routes
app.use("/pokemons", pokemonsRouter);

app.listen(port, () => {
  connect();
  console.log(`Server running on port: ${port}`);
});
