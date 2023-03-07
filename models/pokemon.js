const { Schema } = require("mongoose");

const Pokemon = new Schema({
  id: {
    type: Number,
    required: true,
  },
  nome: {
    type: String,
    required: true,
  },
  altura: {
    type: Number,
    required: true,
    min: 0,
  },
  peso: {
    type: Number,
    required: true,
    min: 0,
  },
  imagem: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value && value.startsWith("http");
      },
      message: () => "image must be an absolute url",
    },
  },
  ataques: {
    type: String,
    required: true,
  },
  estatisticas: {
    type: Object,
    required: true,
  },
});

module.exports = Pokemon;
