require("dotenv").config();
const axios = require("axios");
const { connect, Pokemon } = require("./models");

// Connect to database
connect();

// Array of Pokemon IDs to fetch from PokeAPI
const pokemonIds = [1, 4, 7, 25, 92, 150, 255, 345, 557, 784];

// Fetch data for each Pokemon and add to database
Promise.all(
  pokemonIds.map(async (id) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      const data = response.data;
      const jogos = data.game_indices.map(({ version: { name } }) => name);
      const pokemon = {
        id: data.id,
        nome: data.name,
        altura: data.height,
        peso: data.weight,
        imagem: data.sprites.other["official-artwork"].front_default,
        ataques: data.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
        estatisticas: {
          hp: data.stats.find((stat) => stat.stat.name === "hp").base_stat,
          attack: data.stats.find((stat) => stat.stat.name === "attack")
            .base_stat,
          defense: data.stats.find((stat) => stat.stat.name === "defense")
            .base_stat,
          "special-attack": data.stats.find(
            (stat) => stat.stat.name === "special-attack"
          ).base_stat,
          "special-defense": data.stats.find(
            (stat) => stat.stat.name === "special-defense"
          ).base_stat,
          speed: data.stats.find((stat) => stat.stat.name === "speed")
            .base_stat,
        },
        jogos,
      };
      await Pokemon.create(pokemon);
      console.log(`Added ${pokemon.nome} to database`);
    } catch (error) {
      console.error(`Error adding Pokemon with ID ${id}:`, error.message);
    }
  })
)
  .then(() => {
    console.log("Finished adding Pokemon to database");
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error adding Pokemon to database:", error.message);
    mongoose.disconnect();
  });
