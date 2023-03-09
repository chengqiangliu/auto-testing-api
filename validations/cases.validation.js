//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.casesAddValidator = 
    [
        check("title")
            .exists({checkFalsy: true})
            .withMessage(" casename is required")
            .isString()
            .withMessage("casename should be string"),
        check("external_id")
            .exists({checkFalsy: true})
            .withMessage(" external id is required")
            .isString()
            .withMessage("external id should be string"),
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

exports.casesUpdateValidator = 
     [
        check("_id")
            .exists({checkFalsy: true})
            .withMessage("case ID is required")
            .isString()
            .withMessage("case ID should be string"),
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


exports.casesDeleteValidator = 
     [
       check("title")
           .exists({checkFalsy: true})
           .withMessage("case name is required"),
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

exports.casesDeleteByIdValidator = 
    [
       check("_id")
           .exists({checkFalsy: true})
           .withMessage("case id is required"),
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
   
   
