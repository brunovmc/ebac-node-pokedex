const express = require("express");
const buscaInfoPokemon = require("../services/busca-pokemon");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const pokemonIdRandom = Math.round(Math.random() * 904 + 1);
    const pokemon = await buscaInfoPokemon(pokemonIdRandom);
    res.render("paginas/batalha/index", {
      pokemon,
    });
  } catch (e) {
    res.status(500).json({ erro: e });
  }
});

module.exports = router;
