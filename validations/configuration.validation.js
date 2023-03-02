//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.configurationAddValidator = 
    [
        check("key")
            .exists({checkFalsy: true})
            .withMessage("Configuration key is required")
            .isString()
            .withMessage("Configuration key should be string"),
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

exports.configurationUpdateValidator = 
     [
        check("_id")
            .exists({checkFalsy: true})
            .withMessage("configuration ID is required")
            .isString()
            .withMessage("configuration ID should be string"),
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


exports.configurationDeleteValidator = 
     [
       check("key")
           .exists({checkFalsy: true})
           .withMessage("key is required"),
       (req, res, next) => {
           const error = validationResult(req).formatWith(( {msg} ) => ({msg, errorcode:'400'}));
           const hasError = !error.isEmpty();

            if (hasError) {
            res.status(400).json({ errors: error.array() });
            } else {
            next();
            }
        }
    ];

    exports.configurationDeleteByIdValidator = 
    [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("configuration id is required"),
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
   
   
   exports.configurationInfoValidator = 
   [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("configuration id is required")
           .isString()
           .withMessage("configuration id should be string"),
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

