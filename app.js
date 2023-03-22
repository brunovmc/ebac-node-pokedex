require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const createError = require("http-errors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { connect } = require("./models");

require("./routes/auth/");
const apiRouter = require("./routes/api");
const pokemonsRouter = require("./routes/pokemons");
const batalhaRouter = require("./routes/batalha");
const autenticacaoRouter = require("./routes/auth");
const homeRouter = require("./routes/home");
const { checaAutenticado } = require("./routes/middlewares/checa-autenticacao");
const port = 3000;

const app = express();

//body read config
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//auth config
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
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
app.use("/pokemons", checaAutenticado, pokemonsRouter);
app.use("/batalha", checaAutenticado, batalhaRouter);
app.use("/auth", autenticacaoRouter);
app.use("/", checaAutenticado, homeRouter);

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
