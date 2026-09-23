/**
 * "Banco de dados" em memória, apenas para fins de demonstração.
 * Reinicia sempre que o servidor é reiniciado.
 */

function round1(value) {
  return Math.round(value * 10) / 10;
}

function calcAverage(feedbacks) {
  if (!feedbacks.length) return 0;
  const sum = feedbacks.reduce((acc, f) => acc + f.rating, 0);
  return round1(sum / feedbacks.length);
}

const projects = [
  {
    id: 1,
    name: "Sistema de Gestão de Tarefas",
    description: "Aplicação web para organização de tarefas em equipes ágeis.",
    technologies: ["Node.js", "Express", "MongoDB"],
    upvotes: 12,
    feedbacks: [
      { rating: 5, comment: "Excelente projeto, muito bem estruturado!", createdAt: new Date().toISOString() },
      { rating: 4, comment: "Muito bom, só faltou mais documentação.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 2,
    name: "E-commerce Headless",
    description: "Loja virtual desacoplada com API REST e front-end em React.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    upvotes: 8,
    feedbacks: [
      { rating: 5, comment: "Performance excelente e ótimo design.", createdAt: new Date().toISOString() }
    ]
  },
  {
    id: 3,
    name: "Dashboard de Monitoramento",
    description: "Painel em tempo real para métricas de infraestrutura.",
    technologies: ["Python", "FastAPI", "React"],
    upvotes: 3,
    feedbacks: []
  }
];

// Calcula a média inicial de cada projeto a partir dos feedbacks seed
projects.forEach((project) => {
  project.averageRating = calcAverage(project.feedbacks);
});

let nextId = projects.length + 1;

function getNextId() {
  return nextId++;
}

module.exports = {
  projects,
  getNextId,
  calcAverage,
  round1
};
