const AppError = require("../errors/AppError");

/**
 * Deve ser registrado DEPOIS de todas as rotas.
 * Transforma qualquer rota não encontrada em um erro 404 padronizado.
 */
function notFoundHandler(req, res, next) {
  next(new AppError(404, `Rota ${req.method} ${req.originalUrl} não encontrada.`));
}

/**
 * Manipulador global de erros. Deve ser o ÚLTIMO middleware registrado
 * no app (com 4 argumentos, para o Express reconhecer como error handler).
 */
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Erro interno no servidor.";

  // Erro de JSON malformado no corpo da requisição (express.json())
  if (err.type === "entity.parse.failed") {
    statusCode = 400;
    message = "JSON inválido no corpo da requisição.";
  }

  // Erros não operacionais (inesperados) não devem expor detalhes internos
  if (!err.isOperational && statusCode === 500) {
    // eslint-disable-next-line no-console
    console.error("Erro inesperado:", err);
    message = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
  }

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message,
      ...(err.details ? { details: err.details } : {})
    }
  });
}

module.exports = { notFoundHandler, errorHandler };
