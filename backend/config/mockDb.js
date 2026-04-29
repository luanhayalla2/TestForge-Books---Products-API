const bcrypt = require("bcryptjs");

// Mock Database in memory
let users = [
  { _id: "admin_id", user: "admin", senha: bcrypt.hashSync("123", 10) }
];
let produtos = [
  { _id: "1", nome: "Notebook Pro", preco: 4500 },
  { _id: "2", nome: "Mouse Gamer", preco: 150 }
];
let livros = [
  { _id: "1", nome: "Clean Code", autor: "Robert C. Martin", genero: "Programação" }
];

const MockModel = (data, name) => ({
  find: async () => data,
  findOne: async (query) => data.find(item => Object.keys(query).every(key => item[key] === query[key])),
  findById: async (id) => data.find(item => item._id === id),
  create: async (newItem) => {
    const created = { _id: Math.random().toString(36).substr(2, 9), ...newItem };
    data.push(created);
    return created;
  },
  findByIdAndUpdate: async (id, update) => {
    const index = data.findIndex(item => item._id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...update };
    return data[index];
  },
  findByIdAndDelete: async (id) => {
    const index = data.findIndex(item => item._id === id);
    if (index !== -1) data.splice(index, 1);
    return true;
  }
});

module.exports = {
  User: MockModel(users, "User"),
  Produto: MockModel(produtos, "Produto"),
  Livro: MockModel(livros, "Livro")
};
