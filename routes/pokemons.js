const express = require("express");

const { Pokemon } = require("../models");
const router = express.Router();

router.get("/", (res) => {
  Pokemon.find().then((pokemons) => {
    res.render("pages/pokemons/index", {
      pokemons,
    });
  });
});

module.exports = router;
