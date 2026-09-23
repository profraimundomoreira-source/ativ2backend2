const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log(`Documentação Swagger em http://localhost:${PORT}/api-docs`);
});
