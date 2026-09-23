const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Projects Feedback API",
      version: "1.0.0",
      description:
        "API para cadastro de feedbacks (nota + comentário), upvotes e listagem de projetos com filtro e paginação."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local"
      }
    ]
  },
  apis: [`${__dirname}/routes/*.js`]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
