const store = require("../data/store");

/**
 * GET /api/projects
 * Lista projetos com filtro opcional por tecnologia e paginação.
 */
function listProjects(req, res) {
  const { technology } = req.query;
  const { page, limit } = req.pagination;

  let filtered = store.projects;

  if (technology && String(technology).trim().length > 0) {
    const term = String(technology).trim().toLowerCase();
    filtered = filtered.filter((project) =>
      project.technologies.some((tech) => tech.toLowerCase().includes(term))
    );
  }

  const total = filtered.length;
  const totalPages = Math.max(Math.ceil(total / limit), 1);
  const start = (page - 1) * limit;
  const paginatedData = filtered.slice(start, start + limit);

  res.status(200).json({
    success: true,
    data: paginatedData,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  });
}

/**
 * POST /api/projects/:id/feedbacks
 * Cadastra uma nota (1-5) e um comentário, recalculando a média do projeto.
 */
function createFeedback(req, res) {
  const project = req.project; // anexado pelo middleware loadProject
  const { rating, comment } = req.body;

  const feedback = {
    rating,
    comment: comment.trim(),
    createdAt: new Date().toISOString()
  };

  project.feedbacks.push(feedback);
  project.averageRating = store.calcAverage(project.feedbacks);

  res.status(201).json({
    success: true,
    message: "Feedback cadastrado com sucesso.",
    data: {
      feedback,
      project: {
        id: project.id,
        name: project.name,
        averageRating: project.averageRating,
        totalFeedbacks: project.feedbacks.length
      }
    }
  });
}

/**
 * PUT /api/projects/:id/upvote
 * Incrementa a contagem de upvotes (curtidas/estrelas) do projeto.
 */
function upvoteProject(req, res) {
  const project = req.project; // anexado pelo middleware loadProject

  project.upvotes += 1;

  res.status(200).json({
    success: true,
    message: "Upvote registrado com sucesso.",
    data: {
      id: project.id,
      name: project.name,
      upvotes: project.upvotes
    }
  });
}

module.exports = { listProjects, createFeedback, upvoteProject };
