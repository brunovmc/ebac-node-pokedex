const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./models");
const capturaRouter = require("./routes/api/captura");
const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const port = 3000;
const app = express();

//ejs config
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);

//static files config
app.use(express.static(path.join(__dirname, "public")));

//declaring routes
app.use("/pokemons", pokemonsRouter);
app.use("/batalha", batalhaRouter);

//declaring api routes
app.use("/api", capturaRouter);

app.listen(port, () => {
  connect();
  console.log(`Server running on port: ${port}`);
});
