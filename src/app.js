const express = require("express");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger");
const projectsRoutes = require("./routes/projects.routes");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

// Documentação interativa (Swagger UI)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota raiz simples, útil para checar se o servidor está no ar
app.get("/", (req, res) => {
  res.json({
    message: "API de Projetos rodando. Acesse /api-docs para a documentação interativa."
  });
});

// Rotas da aplicação
app.use("/api/projects", projectsRoutes);

// 404 para rotas não mapeadas (deve vir depois de todas as rotas)
app.use(notFoundHandler);

// Manipulador global de erros (deve ser o último middleware)
app.use(errorHandler);

module.exports = app;
