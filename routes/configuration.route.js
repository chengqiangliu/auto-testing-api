const router = require('express').Router();

const {
    configurationAddValidator,
    configurationUpdateValidator,
    configurationDeleteValidator,
    configurationDeleteByIdValidator,
    configurationGetValidator
} = require("../validations/configuration.validation");

const {
    configurationAdd,
    configurationUpdate,
    configurationDelete,
    configurationDeleteById,
    configurationGet
} = require("../controllers/configuration.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Configuration:
 *          type: Object
 *          required:
 *              -key
 *          properties:
 *              title:
 *                 type: string
 *                 description: key of the Configuration
 *
 */
/**
  * @swagger
  * tags:
  *   name: Configuration
  *   description: Configurations managing API
  */

/**
 * @swagger
 * /api/configuration/add:
 *   post:
 *     summary: add a new configuration
 *     tags: [Configuration]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: The key of the configuration
 *     responses:
 *       200:
 *         description: The Configuration is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 */

// configuration add 
router.post('/add', configurationAddValidator, configurationAdd);


/**
 * @swagger
 * /api/configuration/update:
 *   post:
 *     summary: update a configuration
 *     tags: [Configuration]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the Configuration
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: false
 *         description: The key of the Configuration
 *     responses:
 *       200:
 *         description: The Configuration is updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 */

// configuration update
router.post('/update', configurationUpdateValidator, configurationUpdate);

/**
 * @swagger
 * /api/configuration/deleteByKey:
 *   post:
 *     summary: delete a Configuration
 *     tags: [Configuration]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: The key of the configuration
 *     responses:
 *       200:
 *         description: The configuration is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 */

// configuration delete by key
router.post('/deleteByKey', configurationDeleteValidator, configurationDelete);

/**
 * @swagger
 * /api/configuration/deleteById:
 *   post:
 *     summary: delete a configuration
 *     tags: [Configuration]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the configuration
 *     responses:
 *       200:
 *         description: The Configuration is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 */

// configuration delete by id
router.post('/deleteById', configurationDeleteByIdValidator, configurationDeleteById);


/**
 * @swagger
 * /api/configuration/get:
 *   get:
 *     summary: get Configuration information
 *     tags: [Configuration]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the configuration
 *     responses:
 *       200:
 *         description: The information of the configuration is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Configuration'
 */
// configuration Information
router.get('/get', configurationGetValidator, configurationGet);

module.exports = router;
