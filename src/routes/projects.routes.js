const express = require("express");
const router = express.Router();

const controller = require("../controllers/projects.controller");
const loadProject = require("../middleware/loadProject");
const { validateFeedbackBody, validatePagination } = require("../middleware/validate");

/**
 * @openapi
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       properties:
 *         rating:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         comment:
 *           type: string
 *           example: "Ótimo projeto, muito bem executado!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Sistema de Gestão de Tarefas"
 *         description:
 *           type: string
 *         technologies:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Node.js", "Express", "MongoDB"]
 *         upvotes:
 *           type: integer
 *           example: 12
 *         averageRating:
 *           type: number
 *           example: 4.5
 *         feedbacks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Feedback'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: object
 *           properties:
 *             statusCode:
 *               type: integer
 *               example: 400
 *             message:
 *               type: string
 *               example: 'O campo "rating" deve estar entre 1 e 5.'
 */

/**
 * @openapi
 * /api/projects:
 *   get:
 *     summary: Lista projetos com filtro por tecnologia e paginação
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: technology
 *         schema:
 *           type: string
 *         description: Filtra projetos que utilizam a tecnologia informada (busca parcial, case-insensitive)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por página (máximo 100)
 *     responses:
 *       200:
 *         description: Lista de projetos paginada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Project'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total: { type: integer }
 *                     page: { type: integer }
 *                     limit: { type: integer }
 *                     totalPages: { type: integer }
 *       400:
 *         description: Parâmetros de paginação inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", validatePagination, controller.listProjects);

/**
 * @openapi
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra uma nota (1 a 5) e comentário para um projeto
 *     description: Ao cadastrar o feedback, a nota média (averageRating) do projeto é recalculada automaticamente.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating, comment]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: "Muito bom, recomendo!"
 *     responses:
 *       201:
 *         description: Feedback cadastrado com sucesso
 *       400:
 *         description: Dados inválidos (rating fora do intervalo, comment vazio, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/:id/feedbacks", loadProject, validateFeedbackBody, controller.createFeedback);

/**
 * @openapi
 * /api/projects/{id}/upvote:
 *   put:
 *     summary: Incrementa o upvote (curtida/estrela) de um projeto
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Upvote incrementado com sucesso
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Projeto não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put("/:id/upvote", loadProject, controller.upvoteProject);

module.exports = router;
