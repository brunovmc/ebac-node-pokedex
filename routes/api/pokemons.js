const express = require("express");
const { Pokemon } = require("../../models");
const router = express.Router();

//Create
router.post("/", async (req, res) => {
  try {
    const pokemon = await Pokemon.create(req.body);
    res.status(201).json({
      sucesso: true,
      pokemon: pokemon,
    });
  } catch (e) {
    res.status(422).json({
      sucesso: false,
      erro: e,
    });
  }
});

//Read

router.get("/", async (req, res) => {
  try {
    const filtros = req.query;
    const options = {};

    if (filtros.nomeComecaCom) {
      options.nome = {
        $regex: filtros.nomeComecaCom + ".*",
      };
    }
    if (filtros.pesoMinimo) {
      options.peso = {
        $gte: filtros.pesoMinimo,
      };
    }
    if (filtros.alturaMinima) {
      options.altura = {
        $gte: filtros.alturaMinima,
      };
    }
    const pokemons = await Pokemon.find(options);
    res.status(200).json({
      sucesso: true,
      pokemons: pokemons,
    });
  } catch (e) {
    res.status(500).json({
      sucesso: false,
      erro: e,
    });
  }
});

//Read by id
router.get("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id });
    res.json({
      sucesso: true,
      pokemon: pokemon,
    });
  } catch {
    res.status(404).json({
      sucesso: false,
      erro: "Pokemon nao encontrado!",
    });
  }
});

//Update with patch
router.patch("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id });

    Object.keys(req.body).forEach((atributo) => {
      pokemon[atributo] = req.body[atributo];
    });
    await pokemon.save();
    res.json({
      sucesso: true,
      pokemon: pokemon,
    });
  } catch (e) {
    res.status(422).json({
      sucesso: false,
      erro: e,
    });
  }
});

//Delete
router.delete("/:id", async (req, res) => {
  try {
    const pokemon = await Pokemon.findOne({ _id: req.params.id });
    await pokemon.deleteOne({ _id: req.params.id });
    res.json({
      sucesso: true,
      pokemon: pokemon,
    });
  } catch (e) {
    res.status(404).json({
      sucesso: false,
      erro: e,
    });
  }
});

module.exports = router;
