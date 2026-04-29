const mongoose = require("mongoose");

const LivroSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  autor: { type: String, required: true },
  genero: { type: String, required: true }
});

module.exports = mongoose.model("Livro", LivroSchema);
