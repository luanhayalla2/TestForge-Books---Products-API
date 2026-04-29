const { Livro } = require("../config/mockDb");

exports.getAll = async (req, res) => {
  const livros = await Livro.find();
  res.json(livros);
};

exports.getById = async (req, res) => {
  try {
    const l = await Livro.findById(req.params.id);
    if (!l) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(l);
  } catch (err) {
    res.status(400).json({ erro: "ID inválido" });
  }
};

exports.create = async (req, res) => {
  const { nome, autor, genero } = req.body;
  if (!nome || !autor || !genero) return res.status(400).json({ erro: "Campos obrigatórios: nome, autor, genero" });

  const novoLivro = await Livro.create(req.body);
  res.status(201).json(novoLivro);
};

exports.update = async (req, res) => {
  try {
    const l = await Livro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!l) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(l);
  } catch (err) {
    res.status(400).json({ erro: "Erro ao atualizar" });
  }
};

exports.delete = async (req, res) => {
  try {
    await Livro.findByIdAndDelete(req.params.id);
    res.json({ msg: "Removido" });
  } catch (err) {
    res.status(400).json({ erro: "Erro ao remover" });
  }
};
