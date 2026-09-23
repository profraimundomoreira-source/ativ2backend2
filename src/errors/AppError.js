/**
 * Classe de erro "operacional" (esperado), usada para gerar respostas
 * de erro amigáveis e padronizadas (400, 404, etc.).
 */
class AppError extends Error {
  constructor(statusCode, message, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
