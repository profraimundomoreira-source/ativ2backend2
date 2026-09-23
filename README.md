# Projeto  API 

API em Node.js + Express para cadastro de feedbacks, upvotes e listagem de projetos, com documentação interativa via Swagger/OpenAPI.

## Como executar

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:3000`.

- Documentação Swagger: `http://localhost:3000/api-docs`
- Base da API: `http://localhost:3000/api/projects`

Para desenvolvimento com reload automático (requer `nodemon`, já incluído em devDependencies):

```bash
npm run dev
```

## Estrutura do projeto

```
projects-feedback-api/
├── server.js                     # ponto de entrada
├── package.json
└── src/
    ├── app.js                    # configuração do Express
    ├── swagger.js                # configuração do Swagger/OpenAPI
    ├── data/
    │   └── store.js              # "banco" em memória + dados seed
    ├── errors/
    │   └── AppError.js           # classe de erro operacional
    ├── middleware/
    │   ├── errorHandler.js       # 404 + manipulador global de erros
    │   ├── loadProject.js        # busca o projeto pelo :id
    │   └── validate.js           # validações de body/query
    ├── controllers/
    │   └── projects.controller.js
    └── routes/
        └── projects.routes.js    # rotas + anotações Swagger
```

> Os dados são armazenados em memória (array em `src/data/store.js`) e são
> reiniciados sempre que o servidor reinicia. Isso mantém o exemplo simples;
> para persistência real, basta trocar o `store.js` por uma camada de banco
> de dados (MongoDB, PostgreSQL, etc.) mantendo a mesma interface.

## Endpoints

### `GET /api/projects`

Lista projetos com filtro por tecnologia e paginação.

Query params:
- `technology` (opcional): filtra por tecnologia (busca parcial, case-insensitive)
- `page` (opcional, padrão 1)
- `limit` (opcional, padrão 10, máximo 100)

```bash
curl "http://localhost:3000/api/projects?technology=node&page=1&limit=5"
```

### `POST /api/projects/:id/feedbacks`

Cadastra uma nota (1 a 5) e um comentário. A nota média (`averageRating`) do
projeto é recalculada automaticamente a partir de todos os feedbacks.

```bash
curl -X POST http://localhost:3000/api/projects/1/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "comment": "Projeto excelente!"}'
```

### `PUT /api/projects/:id/upvote`

Incrementa em 1 o contador de upvotes (curtidas/estrelas) do projeto.

```bash
curl -X PUT http://localhost:3000/api/projects/1/upvote
```

## Tratamento de erros

Todas as respostas de erro seguem o mesmo formato:

```json
{
  "success": false,
  "error": {
    "statusCode": 400,
    "message": "O campo \"rating\" deve estar entre 1 e 5."
  }
}
```

Casos cobertos:
- `400 Bad Request`: parâmetros/campos inválidos (rating fora de 1–5, comment
  vazio, `page`/`limit` inválidos, JSON malformado no corpo, id não numérico).
- `404 Not Found`: projeto inexistente ou rota não mapeada.
- `500 Internal Server Error`: erros inesperados (mensagem genérica, sem
  expor detalhes internos/stack trace ao cliente).

## Observação sobre o ambiente de geração deste código

Este projeto foi escrito e revisado manualmente (sem bugs de sintaxe — todos
os arquivos passaram por `node --check`), mas não pôde ser executado com
`npm install` real neste ambiente de geração por não haver acesso à internet
aqui. Rode `npm install && npm start` no seu ambiente para validar a
execução completa; o código segue os padrões usuais do Express 4 e das
libs `swagger-jsdoc`/`swagger-ui-express`, então deve funcionar diretamente.
_________________________________________________________________________
## usar esse comando no Postman

## Serve para listar os projetos cadastrados no sistema
GET http://localhost:3000/api/projects
_________________________________________________
## Cadastrar feedback ele vai cadastrar
POST // http://localhost:3000/api/projects/1/feedbacks
{
  "rating": 5,
  "comment": "Excelente projeto!"
}
_____________________________________
Use GET para listar. 
Use POST para cadastrar feedback.
Use PUT para dar upvote.
GET → retorna todos os feedbacks do projeto 1.
___________________________________________
PUT// http://localhost:3000/api/projects/1/upvote
