const router = require('express').Router();

const {
    deviceAddValidator,
    deviceUpdateValidator,
    deviceDeleteValidator,
    deviceGetValidator
} = require("../validations/device.validation");

const {
    deviceAdd,
    deviceUpdate,
    deviceDelete,
    deviceGet
} = require("../controllers/device.controller");
const logger = require('../lib/logger').API;

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *          type: Object
 *          required:
 *              -device_name
 *          properties:
 *              title:
 *                 type: string
 *                 description: device_name of the device
 *
 */
/**
  * @swagger
  * tags:
  *   name: Device
  *   description: Devices managing API
  */

/**
 * @swagger
 * /api/device/add:
 *   post:
 *     summary: add a new device
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: device_name
 *         schema:
 *           type: string
 *         required: true
 *         description: The device_name of the device
 *     responses:
 *       200:
 *         description: The device is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

//device add
router.post('/add', deviceAddValidator, deviceAdd);

/**
 * @swagger
 * /api/device/update:
 *   post:
 *     summary: update a device
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the device
 *       - in: path
 *         name: device_name
 *         schema:
 *           type: string
 *         required: false
 *         description: The device_name of the device
 *     responses:
 *       200:
 *         description: The device is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

//device update
router.post('/update', deviceUpdateValidator, deviceUpdate);

/**
 * @swagger
 * /api/device/deleteById:
 *   post:
 *     summary: delete a device
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the device
 *     responses:
 *       200:
 *         description: The devices is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */

//device delete
router.post('/deleteById', deviceDeleteValidator, deviceDelete);

/**
 * @swagger
 * /api/device/get:
 *   get:
 *     summary: get device information
 *     tags: [Device]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the device
 *     responses:
 *       200:
 *         description: The information of the device is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Device'
 */
//get device information
router.get('/get', deviceGetValidator,deviceGet);

module.exports = router;
