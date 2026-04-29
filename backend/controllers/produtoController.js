const { Produto } = require("../config/mockDb");

exports.getAll = async (req, res) => {
  const produtos = await Produto.find();
  res.json(produtos);
};

exports.getById = async (req, res) => {
  try {
    const p = await Produto.findById(req.params.id);
    if (!p) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(p);
  } catch (err) {
    res.status(400).json({ erro: "ID inválido" });
  }
};

exports.create = async (req, res) => {
  const { nome, preco } = req.body;
  if (!nome || !preco) return res.status(400).json({ erro: "Campos obrigatórios: nome, preco" });
  
  const produto = await Produto.create(req.body);
  res.status(201).json(produto);
};

exports.update = async (req, res) => {
  try {
    const p = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(p);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Produto.findByIdAndDelete(req.params.id);
    res.json({ msg: "Removido" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao remover" });
  }
};
