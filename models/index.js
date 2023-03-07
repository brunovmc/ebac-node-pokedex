const mongoose = require("mongoose");

const PokemonSchema = require("./pokemon");

const Pokemon = mongoose.model("Pokemon", PokemonSchema);

const connect = () => {
  mongoose.connect();
};

module.exports = {
  Pokemon,
  connect,
};
