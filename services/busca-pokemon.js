require("dotenv").config();

const axios = require("axios");

const buscaInfoPokemon = async (pokeId) => {
  try {
    const { data } = await axios.get(process.env.API_URL + pokeId);
    const {
      id,
      name: nome,
      height: altura,
      weight: peso,
      sprites: {
        other: {
          "official-artwork": { front_default: imagem },
        },
      },
      abilities,
      stats,
      game_indices,
    } = data;
    const ataques = abilities.map(({ ability: { name } }) => name).join(", ");
    const estatisticas = stats.reduce((acc, { stat: { name }, base_stat }) => {
      acc[name] = base_stat;
      return acc;
    }, {});
    const jogos = game_indices.map(({ version: { name } }) => name);
    return {
      id,
      nome,
      altura,
      peso,
      imagem,
      ataques,
      estatisticas,
      jogos,
    };
  } catch (e) {
    throw e;
  }
};

module.exports = buscaInfoPokemon;
