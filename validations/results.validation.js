//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.resultsAddValidator = 
    [
        check("status")
        .exists({checkFalsy: true})
        .withMessage("status is required")
        .isString()
        .withMessage("status should be string"),
        check("error")
        .exists({checkFalsy: true})
        .withMessage("error is required")
        .isString()
        .withMessage("error should be string"),
        check("run")
        .exists({checkFalsy: true})
        .withMessage("runs is required")
        .isString()
        .withMessage("runs should be string"),
        check("case")
        .exists({checkFalsy: true})
        .withMessage("case is required")
        .isString()
        .withMessage("case should be string"),
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

exports.resultsUpdateValidator = 
     [
        check("_id")
            .exists({checkFalsy: true})
            .withMessage("results ID is required")
            .isString()
            .withMessage("results ID should be string"),
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




exports.resultsDeleteByIdValidator = 
    [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("results id is required"),
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
   
   
exports.resultsInfoValidator = 
   [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("results id is required")
           .isString()
           .withMessage("results id should be string"),
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

