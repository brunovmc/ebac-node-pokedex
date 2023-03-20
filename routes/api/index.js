const express = require("express");
const cors = require("cors");

//config cors
const corsOptions = {
  origin: "*",
  optionSucessStatus: 200,
};

//importing routes
const capturaRouter = require("./captura");
const statusRouter = require("./status");
const pokemonsRouter = require("./pokemons");
const autenticacaoRouter = require("./autenticacao");

const router = express.Router();

router.use(express.json());

//declaring routes
router.use("/captura", cors(corsOptions), capturaRouter);
router.use("/status", cors(corsOptions), statusRouter);
router.use("/pokemons", cors(corsOptions), pokemonsRouter);
router.use("/autenticacao", cors(corsOptions), autenticacaoRouter);
module.exports = router;
