const router = require('express').Router();

const {
    casetagsAddValidator,
    casetagsUpdateValidator,
    casetagsDeleteByIdValidator,
    casetagsInfoValidator
} = require("../validations/casetags.validation");

const {
    casetagsAdd,
    casetagsUpdate,
    casetagsDeleteById,
    casetagsGetInfo
} = require("../controllers/casetags.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     CaseTags:
 *          type: Object
 *          required:
 *              -case_id
 *              -tag_id
 *          properties:
 *              case_id:
 *                 type: string
 *                 description: case_id of the casetag
 *              tag_id:
 *                 type: string
 *                 description: tag_id of the casetag
 *   securitySchemes:
 *      bearerAuth:            
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT 
 *
 */
/**
  * @swagger
  * tags:
  *   name: CaseTags
  *   description: CaseTags managing API
  */

/**
 * @swagger
 * /api/casetags/add:
 *   post:
 *     summary: add a new casetag
 *     tags: [CaseTags]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: case_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The case_id of the casetag
 *       - in: formData
 *         name: tag_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The tag_id of the casetag
 *     responses:
 *       200:
 *         description: The casetag is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaseTags'
 *     security:
 *        - bearerAuth: [] 
 */

// casetags add 
router.post('/add', casetagsAddValidator, casetagsAdd);

/**
 * @swagger
 * /api/casetags/update:
 *   post:
 *     summary: update a casetag
 *     tags: [CaseTags]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The _id of the casetag
 *     responses:
 *       200:
 *         description: The casetag is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaseTags'
 *     security:
 *        - bearerAuth: [] 
 */

// casetags update
router.post('/update', casetagsUpdateValidator, casetagsUpdate);

/**
 * @swagger
 * /api/casetags/deleteById:
 *   post:
 *     summary: delete a casetag
 *     tags: [CaseTags]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The _id of the casetag
 *     responses:
 *       200:
 *         description: The casetag is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaseTags'
 *     security:
 *        - bearerAuth: [] 
 */

// casetags delete by case id
router.post('/deleteById', casetagsDeleteByIdValidator, casetagsDeleteById);

/**
 * @swagger
 * /api/casetags/get:
 *   get:
 *     summary: get information of a casetag
 *     tags: [CaseTags]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formDat
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The _id of the casetag
 *     responses:
 *       200:
 *         description: Got the casetag succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CaseTags'
 *     security:
 *        - bearerAuth: [] 
 */

// case tags Information
router.get('/get', casetagsInfoValidator, casetagsGetInfo);

module.exports = router;