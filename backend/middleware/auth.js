const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });

  try {
    // In a real app, use an environment variable for the secret
    const verified = jwt.verify(token.replace("Bearer ", ""), "segredo");
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ erro: "Token inválido" });
  }
};
