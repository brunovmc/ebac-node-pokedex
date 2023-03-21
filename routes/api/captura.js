const express = require("express");

const buscaInfoPokemon = require("../../services/busca-pokemon");
const { Pokemon } = require("../../models");
const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const pokemon = await buscaInfoPokemon(req.params.id);
    const pokemonFoiCapturado = Math.random() <= 0.4;
    if (pokemonFoiCapturado) {
      const pokemonCapturado = await Pokemon.create({
        ...pokemon,
        ...{
          capturadoPor: req.usuario._id,
        },
      });
      res.json({
        capturado: true,
        id: pokemonCapturado._id,
      });
    } else {
      window.location.reload();
    }
  } catch (e) {
    res.status(404).json({ erro: "pokemon nao encontrado" });
  }
});

module.exports = router;
