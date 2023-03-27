const router = require('express').Router();

const {
    jobsAddValidator,
    jobsDeleteByIdValidator,
    jobsGetValidator
} = require("../validations/jobs.validation");

const {
    jobsAdd,
    jobsDeleteById,
    jobsGet
} = require("../controllers/jobs.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Jobs:
 *          type: Object
 *          required:
 *              -app_id
 *              -device_id
 *              -ci_id
 *          properties:
 *              app_id:
 *                 type: string
 *                 description: app_id of the application
 *              device_id:
 *                 type: string
 *                 description: device_id of the device
 *              ci_id:
 *                 type: string
 *                 description: ci_id of the ci
 *
 */
/**
  * @swagger
  * tags:
  *   name: Jobs
  *   description: Jobs managing API
  */

/**
 * @swagger
 * /api/jobs/add:
 *   post:
 *     summary: add a new jobs
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: app_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The app_id of the apps
 *       - in: path
 *         name: device_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The device_id of the devices
 *       - in: path
 *         name: ci_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ci_id of the cis
 *     responses:
 *       200:
 *         description: The jobs is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jobs'
 */

// jobs add 
router.post('/add', jobsAddValidator, jobsAdd);

/**
 * @swagger
 * /api/jobs/deleteById:
 *   post:
 *     summary: delete a job
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the jobs
 *     responses:
 *       200:
 *         description: The jobs is deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jobs'
 */

// jobs delete by jobs id
router.post('/deleteById', jobsDeleteByIdValidator, jobsDeleteById);

/**
 * @swagger
 * /api/jobs/get:
 *   get:
 *     summary: get jobs information
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the jobs
 *     responses:
 *       200:
 *         description: The information of the jobs is fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Jobs'
 */
// jobs Information
router.get('/get', jobsGetValidator, jobsGet);

module.exports = router;