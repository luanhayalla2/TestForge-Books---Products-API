# 🚀 TestForge Pro — Full Stack Ecosystem

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## 📖 Sobre o Projeto

O **TestForge Pro** é um ecossistema full stack completo projetado para servir como base para aplicações escaláveis. Ele combina uma API RESTful robusta com uma interface de usuário moderna, focando em segurança, persistência de dados e testes automatizados.

> [!NOTE]
> Este projeto foi desenvolvido seguindo padrões de arquitetura **MVC (Model-View-Controller)** no backend para garantir separação de responsabilidades e facilidade de manutenção.

---

## ✨ Funcionalidades Principais

### 🔐 Segurança e Acesso
- **Auth System**: Fluxo completo de Registro e Login.
- **JWT Protection**: Rotas sensíveis protegidas por middleware de autenticação.
- **Hashed Passwords**: Segurança de dados utilizando `bcryptjs` para criptografia de senhas.

### 📦 Gestão de Recursos
- **Catálogo de Produtos**: CRUD completo com validação de dados.
- **Acervo de Livros**: Sistema de gerenciamento bibliográfico (Nome, Autor, Gênero).
- **Persistência Real**: Integração total com **MongoDB**.

### 🧪 Qualidade de Software
- **Testes de Integração**: Suite automatizada cobrindo fluxos felizes e exceções.
- **Relatórios de Cobertura**: Garantia de que cada linha de código crítico é testada.

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Finalidade |
| :--- | :--- | :--- |
| **Frontend** | React + Vite | SPA de alta performance e interface responsiva. |
| **Backend** | Node.js + Express | Servidor escalável e roteamento eficiente. |
| **Banco de Dados** | MongoDB + Mongoose | Armazenamento NoSQL flexível e modelagem de dados. |
| **Testes** | Jest + Supertest | Automação de testes e validação de endpoints. |
| **Segurança** | JWT + Bcryptjs | Proteção de identidade e dados sensíveis. |

---

## 🚀 Como Começar

### 📋 Pré-requisitos
- **Node.js** (v16 ou superior)
- **MongoDB** local ou conta no [MongoDB Atlas](https://www.mongodb.com/atlas)

### 🔧 Instalação Passo a Passo

1. **Clonar o Repositório**
   ```bash
   git clone https://github.com/seu-usuario/testforge-pro.git
   cd testforge-pro
   ```

2. **Configurar o Backend**
   ```bash
   cd backend
   npm install
   # Configure o MongoDB em config/db.js se necessário
   node app.js
   ```

3. **Configurar o Frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

---

## 📡 API Endpoints (Resumo)

| Método | Rota | Descrição | Acesso |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Cria um novo usuário | Público |
| `POST` | `/auth/login` | Autentica e retorna um Token | Público |
| `GET` | `/produtos` | Lista todos os produtos | Público |
| `POST` | `/produtos` | Adiciona um novo produto | **Privado** |
| `GET` | `/livros` | Lista todos os livros | Público |
| `POST` | `/livros` | Adiciona um novo livro | **Privado** |

---

## 🧪 Suíte de Testes

Para garantir a estabilidade do sistema:

```bash
# Executar todos os testes
cd backend
npm test

# Gerar relatório de cobertura (Coverage)
npm run test:coverage
```

---

## 🏗️ Estrutura de Diretórios

```bash
testforge-pro/
├── backend/                # Core da API
│   ├── config/             # Database connection
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Endpoint definitions
│   ├── middleware/         # Auth & validation filters
│   └── tests/              # Jest integration tests
└── frontend/               # Interface do Usuário
    ├── src/pages/          # Views (Login, Dashboard, etc)
    ├── src/api.js          # Configuração Axios
    └── src/App.css         # Custom UI Styles
```

---

## ☁️ Deploy e Hospedagem

- **Backend**: Recomendado usar **Render** ou Railway.
- **Frontend**: Recomendado usar **Vercel** ou Netlify.
- **Banco de Dados**: Cluster gratuito no **MongoDB Atlas**.

---

## 📄 Licença e Contato

Este projeto está sob a licença MIT. Sinta-se à vontade para usar e contribuir!

---
Desenvolvido com ⚡ por **Seu Nome**
*Transformando testes em confiança.*
