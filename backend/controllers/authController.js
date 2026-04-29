const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { user, senha } = req.body;
    const hash = await bcrypt.hash(senha, 10);
    const novo = await User.create({ user, senha: hash });
    res.status(201).json({ msg: "Usuário criado", id: novo._id });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao criar usuário" });
  }
};

exports.login = async (req, res) => {
  const { user, senha } = req.body;
  const usuario = await User.findOne({ user });

  if (!usuario) return res.status(401).json({ erro: "Usuário inválido" });

  const ok = await bcrypt.compare(senha, usuario.senha);
  if (!ok) return res.status(401).json({ erro: "Senha inválida" });

  const token = jwt.sign({ id: usuario._id }, "segredo", { expiresIn: "1h" });
  res.json({ token });
};
