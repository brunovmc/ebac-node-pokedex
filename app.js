require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const createError = require("http-errors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./models");
const apiRouter = require("./routes/api");
const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const port = 3000;
const app = express();

//auth config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resaave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/api", apiRouter);

//no match found 404
app.use((_req, _res, next) => {
  next(createError(404));
});

//handling error
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.render("paginas/erro", {
    mensagem: err.message,
    erro: err,
  });
});

app.listen(port, () => {
  connect();
  console.log(`Server running on port: ${port}`);
});
