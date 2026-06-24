# DOCUMENTAÇÃO - SISTEMA DE GERENCIAMENTO DE BIBLIOTECA

## Informações do projeto

- Nome do Projeto: Biblioteca (bake + from)
- Descrição: Sistema completo para gerenciamento de biblioteca com backend em Node.js/Express e frontend em React/Vite.
- Autor: Carlos
- Porta do Servidor: 418
- Banco de Dados: MySQL (nome: biblioteca)

## 1. Tecnologias utilizadas

### Backend (bake)
- Node.js (CommonJS)
- Express 5.2.1
- MySQL2 3.22.3
- JSONWebToken 9.0.3
- Bcryptjs 3.0.3
- Zod 4.4.3
- Cors 2.8.6
- Dotenv 17.4.2
- Nodemon 3.1.14 (dev)

### Frontend (from)
- React 19.2.6
- React DOM 19.2.6
- React Router DOM 7.18.0
- Axios 1.16.1
- TanStack React Query 5.100.14
- Tailwind CSS 4.3.0
- Vite 8.0.12

## 2. Variáveis de ambiente (.env)

### Backend (bake/.env)
- DB_HOST = localhost
- DB_USER = root
- DB_PASS = (vazio)
- DB_NAME = biblioteca
- DB_PORT = 3306
- JWT_SECRET = fisc_web3_secret_carlos_2026

### Frontend (from/.env)
- VITE_LINK_BASE_API = http://localhost:418

## 3. Estrutura de pastas

```text
bake/                               Backend
├── .env                            Variáveis de ambiente
├── package.json                    Dependências do backend
├── server.js                       Ponto de entrada do servidor
└── src/
    ├── config/
    │   └── db.js                   Configuração do pool MySQL
    ├── controllers/
    │   └── useControllers.js       Handlers das rotas
    ├── middlewares/
    │   └── useMiddlewares.js       Middleware de autenticação JWT
    ├── model/
    │   └── useModel.js             Queries SQL
    ├── routes/
    │   └── livroroutes.js          Definição das rotas
    └── zod/
        └── useZod.js               Schemas de validação

from/                               Frontend
├── .env                            Variáveis de ambiente
├── index.html                      HTML de entrada
├── index.css                       Estilos globais
├── eslint.config.js                Configuração do ESLint
├── package.json                    Dependências do frontend
└── src/
    └── main.jsx                    Ponto de entrada React
```

## 4. Banco de dados - Tabelas

### Tabela: bibliotecario
- id: INT, PK, auto-increment
- nome: VARCHAR, nome do bibliotecário
- email: VARCHAR, e-mail (único)
- senha: VARCHAR, hash da senha (bcrypt)

### Tabela: livros
- id: INT, PK, auto-increment
- titulo: VARCHAR, título do livro
- autor: VARCHAR, nome do autor
- categoria: VARCHAR, categoria/gênero
- ano_publicacao: INT, ano de publicação
- image: VARCHAR, URL da imagem de capa (nullable)

### Tabela: leitor
- id: INT, PK, auto-increment
- nome: VARCHAR, nome completo
- email: VARCHAR, e-mail de contato
- cpf: VARCHAR, CPF do leitor
- tel: VARCHAR, telefone (nullable)
- data_criacao: DATE, data de cadastro (automático)

### Tabela: emprestimo
- id: INT, PK, auto-increment
- fk_leitor: INT, FK -> leitor.id
- fk_livro: INT, FK -> livros.id
- data_emprestimo: DATE, data do empréstimo
- data_para_devolucao: DATE, data prevista para devolução
- data_devolvido: DATE, data efetiva da devolução (nullable)
- status: VARCHAR, "EMPRESTADO" ou "DEVOLVIDO"
- divida: DECIMAL, valor de dívida (padrão 0.00)

## 5. Autenticação (JWT)

1. O bibliotecário faz login ou cadastro nos endpoints públicos.
2. O backend valida os dados com Zod, verifica credenciais no banco.
3. Retorna um token JWT com validade de 5 horas.
4. O token contém: `{ usuario: <nome>, id: <id> }`.
5. Rotas protegidas exigem o header: `Authorization: Bearer <token>`.

### Middleware (autenticar)
- Extrai o token do header Authorization.
- Sem token: retorna 403 - "Nenhum token fornecido!"
- Token inválido/expirado: retorna 401 - "Token inválido ou expirado!"
- Token válido: popula `req.user` e `req.usuario` e segue para o handler.

## 6. Validações (Zod)

### Cadastro de usuário
- email: string, trim, formato de e-mail válido
- senha: string, mínimo 6 caracteres
- nome: string, trim, mínimo 2, máximo 100 caracteres

### Login
- email: string, trim, formato de e-mail válido
- senha: string, mínimo 6 caracteres

### Cadastro de livro
- titulo: string, trim, mínimo 2, máximo 100 caracteres
- autor: string, trim, mínimo 2, máximo 100 caracteres
- categoria: string, trim, mínimo 2 caracteres
- ano: número inteiro entre 1900 e 2100 (opcional)
- image: string em formato de URL válida (opcional)

### Cadastro de leitor
- nome: string, trim, mínimo 2 caracteres
- email: string, trim, formato de e-mail válido
- cpf: string, trim, mínimo 11 caracteres
- tel: string (opcional)

### Empréstimo
- fk_leitor: número inteiro positivo
- fk_livro: número inteiro positivo
- data_para_devolucao: string, não pode ser vazia

## 7. Endpoints da API

### Observação
- Endpoints públicos não necessitam de token.
- Endpoints protegidos exigem o header `Authorization: Bearer <token>`.

### 7.1 Rotas públicas

#### POST /login
Descrição: Realiza login de um bibliotecário.

Body:
```json
{
  "email": "string",
  "senha": "string"
}
```

Sucesso (200):
```json
{
  "message": "Login realizado com sucesso!",
  "token": "<jwt>",
  "dados": "<nome>"
}
```

Erros:
- 400 - Dados de login inválidos
- 400 - Senha incorreta
- 404 - Usuário não encontrado
- 500 - Erro interno do servidor

#### POST /cadastro
Descrição: Cadastra um novo bibliotecário.

Body:
```json
{
  "email": "string",
  "senha": "string",
  "nome": "string"
}
```

Sucesso (200):
```json
{
  "message": "Cadastro realizado com sucesso!",
  "token": "<jwt>",
  "dados": "<nome>"
}
```

Erros:
- 400 - Dados de cadastro inválidos
- 409 - E-mail já cadastrado
- 500 - Erro interno do servidor

### 7.2 Rotas protegidas

#### GET /livros
Descrição: Lista todos os livros cadastrados (ordenados por ID desc).

Sucesso (200):
```json
[
  {
    "id": 1,
    "titulo": "string",
    "autor": "string",
    "categoria": "string",
    "ano_publicacao": 2024,
    "image": "https://..."
  }
]
```

Sem conteúdo (204):
```json
{ "message": "vazio" }
```

Erros:
- 500 - Erro interno do servidor

#### POST /livros/cadastrar
Descrição: Cadastra um novo livro.

Body:
```json
{
  "titulo": "string",
  "autor": "string",
  "categoria": "string",
  "ano": 2024,
  "ano_publicacao": 2024,
  "image": "https://..."
}
```

Observação: `ano` e `image` são opcionais. O campo `ano_publicacao` também é aceito como alternativa a `ano`.

Sucesso (200):
```json
{ "message": "Cadastro de livro realizado com sucesso!" }
```

Erros:
- 400 - Dados de cadastro do livro inválidos
- 500 - Erro interno do servidor

#### GET /leitores
Descrição: Lista todos os leitores cadastrados (ordenados por ID desc).

Sucesso (200):
```json
[
  {
    "id": 1,
    "nome": "string",
    "email": "string",
    "cpf": "string",
    "tel": "string",
    "data_criacao": "2025-01-01"
  }
]
```

Erros:
- 500 - Erro interno do servidor

#### POST /leitores/cadastrar
Descrição: Cadastra um novo leitor.

Body:
```json
{
  "nome": "string",
  "email": "string",
  "cpf": "string",
  "tel": "string"
}
```

Observação: O campo `tel` é opcional.

Sucesso (200):
```json
{ "message": "Cadastro de leitor realizado com sucesso!" }
```

Erros:
- 400 - Dados de cadastro do leitor inválidos
- 500 - Erro interno do servidor

#### GET /emprestimos
Descrição: Lista todos os empréstimos com dados do leitor e livro.

Sucesso (200):
```json
[
  {
    "id": 1,
    "fk_leitor": 1,
    "fk_livro": 1,
    "data_emprestimo": "2025-01-01",
    "data_para_devolucao": "2025-02-01",
    "data_devolvido": null,
    "status": "EMPRESTADO",
    "divida": 0.00,
    "leitor": "Nome do Leitor",
    "livro": "Titulo do Livro"
  }
]
```

Erros:
- 500 - Erro interno do servidor

#### POST /emprestimos/cadastrar
Descrição: Registra um novo empréstimo.

Body:
```json
{
  "fk_leitor": 1,
  "fk_livro": 1,
  "data_para_devolucao": "2025-07-01"
}
```

Comportamento automático:
- `data_emprestimo`: preenchida com a data atual (CURDATE)
- `status`: "EMPRESTADO"
- `divida`: 0.00

Sucesso (200):
```json
{ "message": "Empréstimo realizado com sucesso!" }
```

Erros:
- 400 - Dados de empréstimo inválidos
- 500 - Erro interno do servidor

#### PUT /emprestimos/devolver/:id
Descrição: Registra a devolução de um empréstimo.

Parâmetro de rota:
- id: identificador do empréstimo

Comportamento:
- Atualiza `data_devolvido` para a data atual (CURDATE)
- Define `status` como "DEVOLVIDO"

Sucesso (200):
```json
{ "message": "Livro devolvido com sucesso!" }
```

Erros:
- 404 - Empréstimo não encontrado
- 500 - Erro interno do servidor
