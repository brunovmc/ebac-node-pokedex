const { Schema } = require("mongoose");

const Pokemon = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  height: {
    type: Number,
    required: true,
    min: 0,
  },
  weight: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return value && value.startsWith("http");
      },
      message: () => "image must be an absolute url",
    },
  },
  atacks: {
    type: String,
    required: true,
  },
  statistics: {
    type: Object,
    required: true,
  },
});

module.exports = Pokemon;
