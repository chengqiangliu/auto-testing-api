const router = require('express').Router();

const {
    casesAddValidator,
    casesUpdateValidator,
    casesDeleteValidator,
    casesDeleteByIdValidator,
    casesInfoValidator
} = require("../validations/cases.validation");

const {
    casesAdd,
    casesUpdate,
    casesDelete,
    casesDeleteById,
    casesGet
} = require("../controllers/cases.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *          type: Object
 *          required:
 *              -title
 *              -external_id
 *          properties:
 *              title:
 *                 type: string
 *                 description: title of the case
 *              external_id:
 *                 type: string
 *                 description: the external_id of the case
 *              feature:
 *                 type: string
 *                 description: the features of the case
 *              location:
 *                 type: string
 *                 description: locations of the case
 *              reference:
 *                 type: string
 *                 description: reference of the case
 *
 */
/**
  * @swagger
  * tags:
  *   name: Case
  *   description: Cases managing API
  */

/**
 * @swagger
 * /api/cases/add:
 *   post:
 *     summary: add a new case
 *     tags: [Case]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the case
 *       - in: formData
 *         name: external_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The external_id of the case
 *       - in: formData
 *         name: feature
 *         schema:
 *           type: string
 *         required: false
 *         description: The feature of the case
 *       - in: formData
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: The location of the case
 *       - in: formData
 *         name: reference
 *         schema:
 *           type: string
 *         required: false
 *         description: The reference of the case
 *     responses:
 *       200:
 *         description: The case is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */

// cases add 
router.post('/add', casesAddValidator, casesAdd);

/**
 * @swagger
 * /api/cases/update:
 *   post:
 *     summary: update a given case
 *     tags: [Case]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: title
 *         schema:
 *           type: string
 *         required: false
 *         description: The title of the case
 *       - in: formData
 *         name: external_id
 *         schema:
 *           type: string
 *         required: false
 *         description: The external_id of the case
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the case
 *       - in: formData
 *         name: feature
 *         schema:
 *           type: string
 *         required: false
 *         description: The feature of the case
 *       - in: formData
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: The location of the case
 *       - in: formData
 *         name: reference
 *         schema:
 *           type: string
 *         required: false
 *         description: The reference of the case
 *     responses:
 *       200:
 *         description: The case is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */

// cases update
router.post('/update', casesUpdateValidator, casesUpdate);

/**
 * @swagger
 * /api/cases/deleteByName:
 *   post:
 *     summary: delete a given case
 *     tags: [Case]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: title
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the case
 *     responses:
 *       200:
 *         description: The case is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */
// cases delete by casesname
router.post('/deleteByName', casesDeleteValidator, casesDelete);

/**
 * @swagger
 * /api/cases/deleteById:
 *   post:
 *     summary: deleted a given case
 *     tags: [Case]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the case
 *     responses:
 *       200:
 *         description: The case is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */
// cases delete by cases id
router.post('/deleteById', casesDeleteByIdValidator, casesDeleteById);

/**
 * @swagger
 * /api/cases/get:
 *   get:
 *     summary: get the information of a given case
 *     tags: [Case]
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The title of the case
 *     responses:
 *       200:
 *         description: The case is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 */
// cases Information
router.get('/get', casesInfoValidator, casesGet);



module.exports = router;
