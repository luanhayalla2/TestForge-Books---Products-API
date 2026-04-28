const request = require('supertest');
const app = require('./app');
const { resetProdutos } = require('./produtos');
const { resetLivros } = require('./livros');

describe('TestForge Books & Products API - Integration Tests', () => {

    beforeEach(() => {
        // Reseta os dados antes de cada teste para garantir isolamento
        resetProdutos();
        resetLivros();
    });

    describe('PRODUTOS', () => {
        // 1. Retornar 200 para produto existente
        test('Deve retornar 200 para um produto existente', async () => {
            const res = await request(app).get('/produtos/1');
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('id', 1);
            expect(res.body).toHaveProperty('nome', 'Teclado Mecânico');
        });

        // 2. Retornar 404 para produto inexistente
        test('Deve retornar 404 para um produto inexistente', async () => {
            const res = await request(app).get('/produtos/999');
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ erro: 'Produto não encontrado' });
        });

        // 3. Retornar 400 para ID inválido (ex: "abc", -1)
        test('Deve retornar 400 para ID inválido (string)', async () => {
            const res = await request(app).get('/produtos/abc');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ erro: 'ID inválido' });
        });

        test('Deve retornar 400 para ID inválido (negativo)', async () => {
            const res = await request(app).get('/produtos/-5');
            expect(res.status).toBe(400);
            expect(res.body).toEqual({ erro: 'ID inválido' });
        });

        // 4. Validar response.body
        test('Deve validar a estrutura do body de um produto', async () => {
            const res = await request(app).get('/produtos/2');
            expect(res.status).toBe(200);
            expect(res.body).toMatchObject({
                id: expect.any(Number),
                nome: expect.any(String),
                preco: expect.any(Number)
            });
        });
    });

    describe('LIVROS', () => {
        // 5. Caminho feliz: Criar livro (POST), Validar status 201, Validar id, nome, autor, genero
        test('Deve criar um livro com sucesso e retornar 201', async () => {
            const novoLivro = {
                nome: 'O Hobbit',
                autor: 'J.R.R. Tolkien',
                genero: 'Fantasia'
            };

            const postRes = await request(app)
                .post('/livros')
                .send(novoLivro);

            expect(postRes.status).toBe(201);
            expect(postRes.body).toHaveProperty('id');
            expect(postRes.body.nome).toBe(novoLivro.nome);
            expect(postRes.body.autor).toBe(novoLivro.autor);
            expect(postRes.body.genero).toBe(novoLivro.genero);

            // Valida se o livro realmente foi criado via GET
            const getRes = await request(app).get(`/livros/${postRes.body.id}`);
            expect(getRes.status).toBe(200);
            expect(getRes.body).toEqual(postRes.body);
        });

        // 6. Validação: POST sem "autor", Retornar 400
        test('Deve retornar 400 ao tentar criar um livro sem o campo autor', async () => {
            const livroIncompleto = {
                nome: 'Livro Sem Autor',
                genero: 'Mistério'
            };

            const res = await request(app)
                .post('/livros')
                .send(livroIncompleto);

            expect(res.status).toBe(400);
            expect(res.body).toHaveProperty('erro');
        });

        // 7. Caminho triste: GET livro inexistente, Retornar 404
        test('Deve retornar 404 para um livro inexistente', async () => {
            const res = await request(app).get('/livros/99');
            expect(res.status).toBe(404);
            expect(res.body).toEqual({ erro: 'Livro não encontrado' });
        });
    });
});
