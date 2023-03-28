const router = require('express').Router();

const {
    errorsAddValidator,
    errorsUpdateValidator,
    errorsDeleteByIdValidator,
    errorsInfoValidator
} = require("../validations/errors.validation");

const {
    errorsAdd,
    errorsUpdate,
    errorsDeleteById,
    errorsGet
} = require("../controllers/errors.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *          type: Object
 *          required:
 *              -type
 *              -message
 *          properties:
 *              type:
 *                 type: string
 *                 description: type of the error
 *              message:
 *                 type: string
 *                 description: message of the error
 *              backtrace:
 *                 type: string
 *                 description: the backtrace of the error
 *              screenshot:
 *                 type: buffer
 *                 description: screenshot of the error
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
  *   name: Error
  *   description: Errors managing API
  */

/**
 * @swagger
 * /api/errors/add:
 *   post:
 *     summary: add a new error
 *     tags: [Error]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: type
 *         schema:
 *           type: string
 *         required: true
 *         description: The type of the error
 *       - in: formData
 *         name: message
 *         schema:
 *           type: string
 *         required: true
 *         description: The message of the error
 *       - in: formData
 *         name: backtrace
 *         schema:
 *           type: string
 *         required: false
 *         description: The backtrace of the error
 *     responses:
 *       200:
 *         description: The error is added succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *        - bearerAuth: [] 
 */

// errors add 
router.post('/add', errorsAddValidator, errorsAdd);

/**
 * @swagger
 * /api/errors/update:
 *   post:
 *     summary: update error
 *     tags: [Error]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the error  
 *       - in: formData
 *         name: type
 *         schema:
 *           type: string
 *         required: false
 *         description: The type of the error
 *       - in: formData
 *         name: message
 *         schema:
 *           type: string
 *         required: false
 *         description: The message of the error
 *       - in: formData
 *         name: backtrace
 *         schema:
 *           type: string
 *         required: false
 *         description: The backtrace of the error
 *     responses:
 *       200:
 *         description: The error is updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *        - bearerAuth: [] 
 */

// errors update
router.post('/update', errorsUpdateValidator, errorsUpdate);

/**
 * @swagger
 * /api/errors/deleteById:
 *   post:
 *     summary: delete an error
 *     tags: [Error]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the error
 *     responses:
 *       200:
 *         description: The error is deleted succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *        - bearerAuth: [] 
 */

// errors delete by errors id
router.post('/deleteById', errorsDeleteByIdValidator, errorsDeleteById);

/**
 * @swagger
 * /api/errors/get:
 *   get:
 *     summary: get information of an error
 *     tags: [Error]
 *     consumes:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - in: formData
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the error
 *     responses:
 *       200:
 *         description: The information of the error is fetched succesfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Error'
 *     security:
 *        - bearerAuth: [] 
 */

//errors get by errors id 
router.get('/get',errorsInfoValidator,errorsGet);

module.exports = router;