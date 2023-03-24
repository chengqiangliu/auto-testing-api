const router = require('express').Router();

const {
    tagsAddValidator,
    tagsUpdateValidator,
    tagsDeleteValidator,
    tagsDeleteByIdValidator,
    tagsInfoValidator
} = require("../validations/tags.validation");

const {
    tagsAdd,
    tagsUpdate,
    tagsDelete,
    tagsDeleteById,
    tagsGet
} = require("../controllers/tags.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Tag:
 *          type: Object
 *          required:
 *              -tagsname
 *          properties:
 *              tagsname:
 *                 type: string
 *                 description: tagname of the tag
 *
 */
/**
  * @swagger
  * tags:
  *   name: Tag
  *   description: Tags managing API
  */

/**
 * @swagger
 * /api/tag/add:
 *   post:
 *     summary: add a new tag
 *     tags: [Tag]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: tagsname
 *         schema:
 *           type: string
 *         required: true
 *         description: The tagsname of the tag
 *     responses:
 *       200:
 *         description: The tags is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */

// tags add 
router.post('/add', tagsAddValidator, tagsAdd);

/**
 * @swagger
 * /api/tag/update:
 *   post:
 *     summary: update a  tag
 *     tags: [Tag]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: fromData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tag
 *       - in: formData
 *         name: tagsname
 *         schema:
 *           type: string
 *         required: false
 *         description: The tagsname of the tag
 *     responses:
 *       200:
 *         description: The tags is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */

// tags update
router.post('/update', tagsUpdateValidator, tagsUpdate);

/**
 * @swagger
 * /api/tag/deleteByName:
 *   post:
 *     summary: delete a tag
 *     tags: [Tag]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: tagsname
 *         schema:
 *           type: string
 *         required: true
 *         description: The tagsname of the tag
 *     responses:
 *       200:
 *         description: The tag is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */

// tags delete by tagsname
router.post('/deleteByName', tagsDeleteValidator, tagsDelete);

/**
 * @swagger
 * /api/tag/deleteById:
 *   post:
 *     summary: delete a tag
 *     tags: [Tag]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tag
 *     responses:
 *       200:
 *         description: The tags is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */

// tags delete by tags id
router.post('/deleteById', tagsDeleteByIdValidator, tagsDeleteById);

/**
 * @swagger
 * /api/tag/get:
 *   get:
 *     summary: get tag information
 *     tags: [Tag]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the tag
 *     responses:
 *       200:
 *         description: The information of the tag is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Tag'
 */
// tags Information
router.get('/get', tagsInfoValidator, tagsGet);

module.exports = router;