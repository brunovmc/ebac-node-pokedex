const axios = require("axios");

const buscaInfoPokemon = (pokeId) => {
  return new Promise((resolve, reject) => {
    const url = "https://pokeapi.co/api/v2/pokemon/" + pokeId;
    axios
      .get(url)
      .then((result) => {
        const data = result.data;
        const id = data.id;
        const nome = data.name;
        const altura = data.height;
        const peso = data.weight;
        const imagem = data.sprites.other["official-artwork"].front_default;
        const ataques = data.abilities.map((a) => a.ability.name).join(", ");
        const estatisticas = {};
        data.stats.forEach((estatistica) => {
          estatisticas[estatistica.stat.name] = estatistica.base_stat;
        });
        const jogos = [];
        for (var i = 0; i < data.game_indices.length; i++) {
          jogos.push(data.game_indices[i].version.name);
        }
        resolve({
          id,
          nome,
          altura,
          peso,
          imagem,
          ataques,
          estatisticas,
          jogos,
        });
      })
      .catch((e) => reject(e));
  });
};

module.exports = buscaInfoPokemon;
