//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.appsAddValidator = 
    [
        check("appsname")
            .exists({checkFalsy: true})
            .withMessage("Application name is required")
            .isString()
            .withMessage("Application name should be string"),
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

exports.appsUpdateValidator = 
     [
        check("id")
            .exists({checkFalsy: true})
            .withMessage("Application ID is required")
            .isString()
            .withMessage("Application ID should be string"),
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


exports.appsDeleteValidator = 
     [
       check("appsname")
           .exists({checkFalsy: true})
           .withMessage("Application name is required"),
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

    exports.appsDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("Application id is required"),
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
   
   
   exports.appsGetValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("Application id is required")
           .isString()
           .withMessage("Application id should be string"),
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

