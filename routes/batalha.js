const express = require("express");
const buscaInfoPokemon = require("../services/busca-pokemon");

const router = express.Router();

router.get("/", (_req, res) => {
  const pokemonIdRandom = Math.round(Math.random() * 904 + 1);
  buscaInfoPokemon(pokemonIdRandom).then((pokemon) => {
    res.render("paginas/batalha/index", {
      pokemon,
    });
  });
});

module.exports = router;
