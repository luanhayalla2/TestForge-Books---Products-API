// Base de dados em memória para livros
let livros = [];
let proximoId = 1;

// Função para resetar os livros (útil para os testes)
const resetLivros = () => {
    livros = [];
    proximoId = 1;
};

// Função para criar um novo livro
const criarLivro = (dados) => {
    const { nome, autor, genero } = dados;

    // Validação de campos obrigatórios
    if (!nome || !autor || !genero) {
        return { erro: "Todos os campos (nome, autor, genero) são obrigatórios", status: 400 };
    }

    const novoLivro = {
        id: proximoId++,
        nome,
        autor,
        genero
    };

    livros.push(novoLivro);
    return { data: novoLivro, status: 201 };
};

// Função para buscar um livro por ID
const buscarLivroPorId = (id) => {
    const numericId = Number(id);
    const livro = livros.find(l => l.id === numericId);

    if (!livro) {
        return { erro: "Livro não encontrado", status: 404 };
    }

    return { data: livro, status: 200 };
};

module.exports = {
    criarLivro,
    buscarLivroPorId,
    resetLivros
};
