const AppError = require("../errors/AppError");
const store = require("../data/store");

/**
 * Busca o projeto pelo :id da rota e anexa em req.project.
 * Se o id for inválido -> 400. Se o projeto não existir -> 404.
 */
function loadProject(req, res, next) {
  const rawId = req.params.id;
  const id = Number(rawId);

  if (!rawId || !Number.isInteger(id) || id <= 0) {
    return next(
      new AppError(400, 'O parâmetro "id" deve ser um número inteiro positivo.')
    );
  }

  const project = store.projects.find((p) => p.id === id);

  if (!project) {
    return next(new AppError(404, `Projeto com id ${id} não foi encontrado.`));
  }

  req.project = project;
  next();
}

module.exports = loadProject;
