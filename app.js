const express = require('express');
const app = express();
const produtosLogic = require('./produtos');
const livrosLogic = require('./livros');

app.use(express.json());

// --- ROTAS DE PRODUTOS ---

// GET /produtos/:id
app.get('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const resultado = produtosLogic.buscarProdutoPorId(id);
    
    if (resultado.erro) {
        return res.status(resultado.status).json({ erro: resultado.erro });
    }
    
    res.status(resultado.status).json(resultado.data);
});

// --- ROTAS DE LIVROS ---

// POST /livros
app.post('/livros', (req, res) => {
    const resultado = livrosLogic.criarLivro(req.body);
    
    if (resultado.erro) {
        return res.status(resultado.status).json({ erro: resultado.erro });
    }
    
    res.status(resultado.status).json(resultado.data);
});

// GET /livros/:id
app.get('/livros/:id', (req, res) => {
    const { id } = req.params;
    const resultado = livrosLogic.buscarLivroPorId(id);
    
    if (resultado.erro) {
        return res.status(resultado.status).json({ erro: resultado.erro });
    }
    
    res.status(resultado.status).json(resultado.data);
});

// Exportamos o app para que possa ser usado nos testes (sem iniciar o servidor aqui)
module.exports = app;

// Iniciamos o servidor apenas se o arquivo for executado diretamente
if (require.main === module) {
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
}
