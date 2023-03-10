//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.errorsAddValidator = 
    [
        check("type")
            .exists({checkFalsy: true})
            .withMessage(" error type is required")
            .isString()
            .withMessage("error type should be string"),
        check("message")
            .exists({checkFalsy: true})
            .withMessage(" error message is required")
            .isString()
            .withMessage("error message should be string"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,errorcode:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ errors: error.array() });
                } else {
                next();
                }
            }    
    ];

exports.errorsUpdateValidator = 
     [
        check("_id")
            .exists({checkFalsy: true})
            .withMessage("error id is required")
            .isString()
            .withMessage("error id should be string"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,errorcode:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ errors: error.array() });
                } else {
                next();
                }
            }    
            
    ];




exports.errorsDeleteByIdValidator = 
    [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("error id is required"),
       (req, res, next) => {
           const error = validationResult(req).formatWith(( {msg} ) => ({msg, errorcode:'400'}));
           const hasError = !error.isEmpty();
 
           if (hasError) {
           res.status(400).json({ error: error.array() });
           } else {
           next();
           }
       }
   ]; 
   

