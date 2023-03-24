const router = require('express').Router();

const {
    resultsAddValidator,
    resultsUpdateValidator,
    resultsDeleteByIdValidator,
    resultsInfoValidator
} = require("../validations/results.validation");

const {
    resultsAdd,
    resultsUpdate,
    resultsDeleteById,
    resultsGetInfo
} = require("../controllers/results.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Result:
 *          type: Object
 *          required:
 *              -status
 *              -error
 *              -run
 *              -case
 *          properties:
 *              status:
 *                 type: string
 *                 description: status of the results
 *              error:
 *                 type: string
 *                 description: error of the results
 *              run:
 *                 type: string
 *                 description: run of the results
 *              case:
 *                 type: string
 *                 description: case of the results
 *
 */
/**
  * @swagger
  * tags:
  *   name: Result
  *   description: Results managing API
  */

/**
 * @swagger
 * /api/results/add:
 *   post:
 *     summary: add a new result
 *     tags: [Result]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: status
 *         schema:
 *           type: string
 *         required: true
 *         description: The status of the result
 *       - in: formData
 *         name: error
 *         schema:
 *           type: string
 *         required: true
 *         description: The error of the result
 *       - in: formData
 *         name: run
 *         schema:
 *           type: string
 *         required: true
 *         description: The run of the result
 *       - in: formData
 *         name: case
 *         schema:
 *           type: string
 *         required: true
 *         description: The case of the result
 *       - in: formData
 *         name: created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: The time of creation of the result  
 *       - in: formData
 *         name: finished_at
 *         schema:
 *           type: string
 *         required: false
 *         description: The time of finishing of the result
 *     responses:
 *       200:
 *         description: The result is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */

// results add 
router.post('/add', resultsAddValidator, resultsAdd);

/**
 * @swagger
 * /api/results/update:
 *   post:
 *     summary: update a result
 *     tags: [Result]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the result
 *       - in: formData
 *         name: status
 *         schema:
 *           type: string
 *         required: false
 *         description: The status of the result
 *       - in: formData
 *         name: error
 *         schema:
 *           type: string
 *         required: false
 *         description: The error of the result
 *       - in: formData
 *         name: run
 *         schema:
 *           type: string
 *         required: false
 *         description: The run of the result
 *       - in: formData
 *         name: case
 *         schema:
 *           type: string
 *         required: false
 *         description: The case of the result
 *       - in: formData
 *         name: created_at
 *         schema:
 *           type: string
 *         required: false
 *         description: The time of creation of the result  
 *       - in: formData
 *         name: finished_at
 *         schema:
 *           type: string
 *         required: false
 *         description: The time of finishing of the result
 *     responses:
 *       200:
 *         description: The result is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */

//results update
router.post('/update', resultsUpdateValidator, resultsUpdate);

/**
 * @swagger
 * /api/results/deleteById:
 *   post:
 *     summary: delete a result
 *     tags: [Result]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the result
 *       
 *     responses:
 *       200:
 *         description: The result is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */

// results delete by result id
router.post('/deleteById', resultsDeleteByIdValidator, resultsDeleteById);

/**
 * @swagger
 * /api/results/get:
 *   get:
 *     summary: get the information of  a result
 *     tags: [Result]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the result
 *       
 *     responses:
 *       200:
 *         description: The information of the result is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Result'
 */

// results get Information
router.get('/get', resultsInfoValidator, resultsGetInfo);

module.exports = router;
