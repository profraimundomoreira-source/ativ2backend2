const AppError = require("../errors/AppError");

/**
 * Valida o corpo da requisição de criação de feedback.
 * Espera: { rating: number (1-5), comment: string }
 */
function validateFeedbackBody(req, res, next) {
  const body = req.body || {};
  const { rating, comment } = body;

  if (rating === undefined || rating === null) {
    return next(new AppError(400, 'O campo "rating" é obrigatório.'));
  }

  if (typeof rating !== "number" || Number.isNaN(rating) || !Number.isInteger(rating)) {
    return next(new AppError(400, 'O campo "rating" deve ser um número inteiro.'));
  }

  if (rating < 1 || rating > 5) {
    return next(new AppError(400, 'O campo "rating" deve estar entre 1 e 5.'));
  }

  if (comment === undefined || comment === null) {
    return next(new AppError(400, 'O campo "comment" é obrigatório.'));
  }

  if (typeof comment !== "string" || comment.trim().length === 0) {
    return next(new AppError(400, 'O campo "comment" deve ser um texto não vazio.'));
  }

  if (comment.trim().length > 500) {
    return next(new AppError(400, 'O campo "comment" deve ter no máximo 500 caracteres.'));
  }

  next();
}

/**
 * Valida e normaliza os parâmetros de paginação (page, limit) da query string.
 */
function validatePagination(req, res, next) {
  const rawPage = req.query.page ?? "1";
  const rawLimit = req.query.limit ?? "10";

  const page = Number(rawPage);
  const limit = Number(rawLimit);

  if (!Number.isInteger(page) || page < 1) {
    return next(
      new AppError(400, 'O parâmetro "page" deve ser um número inteiro maior ou igual a 1.')
    );
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return next(
      new AppError(400, 'O parâmetro "limit" deve ser um número inteiro entre 1 e 100.')
    );
  }

  req.pagination = { page, limit };
  next();
}

module.exports = { validateFeedbackBody, validatePagination };
