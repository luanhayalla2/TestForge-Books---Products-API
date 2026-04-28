// Base de dados em memória para produtos
let produtos = [
    { id: 1, nome: "Teclado Mecânico", preco: 250.00 },
    { id: 2, nome: "Mouse Gamer", preco: 120.00 },
    { id: 3, nome: "Monitor 144Hz", preco: 1200.00 }
];

// Função para resetar os produtos (útil para os testes)
const resetProdutos = () => {
    produtos = [
        { id: 1, nome: "Teclado Mecânico", preco: 250.00 },
        { id: 2, nome: "Mouse Gamer", preco: 120.00 },
        { id: 3, nome: "Monitor 144Hz", preco: 1200.00 }
    ];
};

// Função para buscar um produto por ID com validação
const buscarProdutoPorId = (id) => {
    // Validação: deve ser um número e não pode ser negativo
    const numericId = Number(id);
    
    if (isNaN(numericId) || numericId < 0 || !Number.isInteger(numericId)) {
        return { erro: "ID inválido", status: 400 };
    }

    const produto = produtos.find(p => p.id === numericId);

    if (!produto) {
        return { erro: "Produto não encontrado", status: 404 };
    }

    return { data: produto, status: 200 };
};

module.exports = {
    buscarProdutoPorId,
    resetProdutos
};
