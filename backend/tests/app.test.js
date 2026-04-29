const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Produto = require('../models/Produto');
const Livro = require('../models/Livro');
const User = require('../models/User');

beforeAll(async () => {
  // O app já importa o config/db que conecta ao banco
  // Aguardamos a conexão se necessário (mongoose.connection.readyState)
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://127.0.0.1:27017/testforge_test");
  }
});

beforeEach(async () => {
  // Limpa as coleções antes de cada teste
  await Produto.deleteMany({});
  await Livro.deleteMany({});
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

/* ================= PRODUTOS ================= */

describe('GET /produtos', () => {
  test('200 - listar produtos vazios', async () => {
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('200 - listar produtos com dados', async () => {
    await Produto.create({ nome: "Mouse", preco: 50 });
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nome).toBe("Mouse");
  });
});

/* ================= AUTH & PROTECTED ROUTES ================= */

describe('AUTH /produtos (POST)', () => {
  test('401 - criar produto sem token', async () => {
    const res = await request(app)
      .post('/produtos')
      .send({ nome: "Teclado", preco: 100 });

    expect(res.status).toBe(401);
  });

  test('201 - criar produto com token válido', async () => {
    // 1. Registrar e Logar
    await request(app).post('/auth/register').send({ user: "admin", senha: "123" });
    const loginRes = await request(app).post('/auth/login').send({ user: "admin", senha: "123" });
    const token = loginRes.body.token;

    // 2. Criar Produto
    const res = await request(app)
      .post('/produtos')
      .set('Authorization', `Bearer ${token}`)
      .send({ nome: "Teclado", preco: 100 });

    expect(res.status).toBe(201);
    expect(res.body.nome).toBe("Teclado");
  });
});

/* ================= LIVROS ================= */

describe('POST /livros', () => {
  test('201 - criar livro com token', async () => {
    await request(app).post('/auth/register').send({ user: "admin", senha: "123" });
    const loginRes = await request(app).post('/auth/login').send({ user: "admin", senha: "123" });
    const token = loginRes.body.token;

    const res = await request(app)
      .post('/livros')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: "Livro Teste",
        autor: "Autor Teste",
        genero: "Ficção"
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('_id');
  });
});
