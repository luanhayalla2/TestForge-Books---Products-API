const mongoose = require("mongoose");

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/testforge")
  .then(() => console.log("Conectado ao MongoDB 🍃"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

module.exports = mongoose;
