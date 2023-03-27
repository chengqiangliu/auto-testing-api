const router = require('express').Router();

const {
    appsAddValidator,
    appsUpdateValidator,
    appsDeleteValidator,
    appsDeleteByIdValidator,
    appsGetValidator
} = require("../validations/apps.validation");

const {
    appsAdd,
    appsUpdate,
    appsDelete,
    appsDeleteById,
    appsGet
} = require("../controllers/apps.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Apps:
 *          type: Object
 *          required:
 *              -appsname
 *          properties:
 *              title:
 *                 type: string
 *                 description: appsname of the application
 *
 */
/**
  * @swagger
  * tags:
  *   name: Apps
  *   description: Apps managing API
  */

/**
 * @swagger
 * /api/apps/add:
 *   post:
 *     summary: add a new app
 *     tags: [Apps]
 *     parameters:
 *       - in: path
 *         name: appsname
 *         schema:
 *           type: string
 *         required: true
 *         description: The appsname of the application
 *     responses:
 *       200:
 *         description: The apps is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apps'
 */

// apps add 
router.post('/add', appsAddValidator, appsAdd);

/**
 * @swagger
 * /api/apps/update:
 *   post:
 *     summary: update a  app
 *     tags: [Apps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the app
 *       - in: path
 *         name: appsname
 *         schema:
 *           type: string
 *         required: false
 *         description: The appsname of the app
 *     responses:
 *       200:
 *         description: The apps is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apps'
 */

// apps update
router.post('/update', appsUpdateValidator, appsUpdate);

/**
 * @swagger
 * /api/Apps/deleteByName:
 *   post:
 *     summary: delete a app
 *     tags: [Apps]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: appsname
 *         schema:
 *           type: string
 *         required: true
 *         description: The appsname of the app
 *     responses:
 *       200:
 *         description: The app is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apps'
 */

// apps delete by appsname
router.post('/deleteByName', appsDeleteValidator, appsDelete);

/**
 * @swagger
 * /api/apps/deleteById:
 *   post:
 *     summary: delete a app
 *     tags: [Apps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the app
 *     responses:
 *       200:
 *         description: The apps is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apps'
 */

// apps delete by apps id
router.post('/deleteById', appsDeleteByIdValidator, appsDeleteById);

/**
 * @swagger
 * /api/apps/get:
 *   get:
 *     summary: get apps information
 *     tags: [Apps]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the apps
 *     responses:
 *       200:
 *         description: The information of the apps is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Apps'
 */
// apps Information
router.get('/get', appsGetValidator, appsGet);

module.exports = router;
