const express = require("express");
const cors = require("cors");
// require("./config/db"); // Conecta ao MongoDB (Desativado para Modo Mock)

const produtoRoutes = require("./routes/produtoRoutes");
const livroRoutes = require("./routes/livroRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/produtos", produtoRoutes);
app.use("/livros", livroRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("🚀 TestForge PRO rodando");
});

// Somente inicia o servidor se não estiver em ambiente de teste
if (process.env.NODE_ENV !== 'test') {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

module.exports = app;
