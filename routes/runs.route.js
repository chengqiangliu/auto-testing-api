const router = require('express').Router();

const {
    runsAddValidator,
    runsDeleteByIdValidator,
    runsGetValidator
} = require("../validations/runs.validation");

const {
    runsAdd,
    runsDeleteById,
    runsGet
} = require("../controllers/runs.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Runs:
 *          type: Object
 *          required:
 *              -job_id
 *          properties:
 *              title:
 *                 type: string
 *                 description: job_id of the jobs
 *
 */
/**
  * @swagger
  * tags:
  *   name: Runs
  *   description: Runs managing API
  */

/**
 * @swagger
 * /api/runs/add:
 *   post:
 *     summary: add a new run
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: job_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The job_id of the jobs
 *     responses:
 *       200:
 *         description: The runs is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Runs'
 */

// runs add 
router.post('/add', runsAddValidator, runsAdd);

/**
 * @swagger
 * /api/runs/deleteById:
 *   post:
 *     summary: delete a run
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the runs
 *     responses:
 *       200:
 *         description: The runs is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Runs'
 */

// apps delete by runs id
router.post('/deleteById', runsDeleteByIdValidator, runsDeleteById);

/**
 * @swagger
 * /api/runs/get:
 *   get:
 *     summary: get runs information
 *     tags: [Runs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the runs
 *     responses:
 *       200:
 *         description: The information of the runs is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Runs'
 */
// runs Information
router.get('/get', runsGetValidator, runsGet);

module.exports = router;