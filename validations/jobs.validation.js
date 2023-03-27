//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.jobsAddValidator = 
    [
        check("app_id")
        .exists({checkFalsy: true})
        .withMessage("app_id is required")
        .isString()
        .withMessage("app_id should be string"),
        check("device_id")
        .exists({checkFalsy: true})
        .withMessage("device_id is required")
        .isString()
        .withMessage("device_id should be string"),
        check("ci_id")
        .exists({checkFalsy: true})
        .withMessage("ci_id is required")
        .isString()
        .withMessage("ci_id should be string"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,code:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ errors: error.array() });
                } else {
                next();
                }
            }    
    ];

    exports.jobsDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("jobs id is required"),
       (req, res, next) => {
           const error = validationResult(req).formatWith(( {msg} ) => ({msg, code:'400'}));
           const hasError = !error.isEmpty();
 
           if (hasError) {
           res.status(400).json({ error: error.array() });
           } else {
           next();
           }
       }
   ]; 
   
   
   exports.jobsGetValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("jobs id is required")
           .isString()
           .withMessage("jobs id should be string"),
           (req, res, next) => {
               const error = validationResult(req).formatWith(({ msg }) => ({msg,code:'401'}));

               const hasError = !error.isEmpty();

               if (hasError) {
               res.status(422).json({ errors: error.array() });
               } else {
               next();
               }
           }    
   ];

