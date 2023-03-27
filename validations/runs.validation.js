//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.runsAddValidator = 
    [
        check("job_id")
        .exists({checkFalsy: true})
        .withMessage("job_id is required")
        .isString()
        .withMessage("job_id should be string"),
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


exports.runsDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("runs id is required"),
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
   
   
exports.runsGetValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("runs id is required")
           .isString()
           .withMessage("runs id should be string"),
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

