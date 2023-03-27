const router = require('express').Router();

const {
    ciAddValidator,
    ciUpdateValidator,
    ciDeleteValidator,
    ciDeleteByIdValidator,
    ciGetValidator
} = require("../validations/ci.validation");

const {
    ciAdd,
    ciUpdate,
    ciDelete,
    ciDeleteById,
    ciGet
} = require("../controllers/ci.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Ci:
 *          type: Object
 *          required:
 *              -ci_url
 *          properties:
 *              title:
 *                 type: string
 *                 description: ci url of the ci
 *
 */
/**
  * @swagger
  * tags:
  *   name: Ci
  *   description: Cis managing API
  */

/**
 * @swagger
 * /api/ci/add:
 *   post:
 *     summary: add a new ci
 *     tags: [Ci]
 *     parameters:
 *       - in: path
 *         name: ci_url
 *         schema:
 *           type: string
 *         required: true
 *         description: The ci url of the ci
 *     responses:
 *       200:
 *         description: The ci is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ci'
 */

// ci add 
router.post('/add', ciAddValidator, ciAdd);

/**
 * @swagger
 * /api/ci/update:
 *   post:
 *     summary: update a ci
 *     tags: [Ci]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the ci
 *       - in: path
 *         name: ci_url
 *         schema:
 *           type: string
 *         required: false
 *         description: The ci_url of the ci
 *     responses:
 *       200:
 *         description: The ci is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ci'
 */

// ci update
router.post('/update', ciUpdateValidator, ciUpdate);

/**
 * @swagger
 * /api/ci/deleteByUrl:
 *   post:
 *     summary: delete a ci
 *     tags: [Ci]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: ci_url
 *         schema:
 *           type: string
 *         required: true
 *         description: The ci url of the ci
 *     responses:
 *       200:
 *         description: The ci is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ci'
 */

// ci delete by ci_url
router.post('/deleteByUrl', ciDeleteValidator, ciDelete);

/**
 * @swagger
 * /api/ci/deleteById:
 *   post:
 *     summary: delete a ci
 *     tags: [Ci]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the ci
 *     responses:
 *       200:
 *         description: The cis is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ci'
 */

// apps delete by apps id
router.post('/deleteById', ciDeleteByIdValidator, ciDeleteById);

/**
 * @swagger
 * /api/ci/get:
 *   get:
 *     summary: get ci information
 *     tags: [Ci]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the ci
 *     responses:
 *       200:
 *         description: The information of the ci is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ci'
 */
// apps Information
router.get('/get', ciGetValidator, ciGet);

module.exports = router;
