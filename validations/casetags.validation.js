//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.casetagsAddValidator = 
    [
        check("tag_id")
        .exists({checkFalsy: true})
        .withMessage("tag_id is required")
        .isString()
        .withMessage("tag_id should be string"),
        check("case_id")
        .exists({checkFalsy: true})
        .withMessage("case_id is required")
        .isString()
        .withMessage("case_id should be string"),
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

exports.casetagsUpdateValidator = 
     [
        check("id")
            .exists({checkFalsy: true})
            .withMessage("casetags ID is required")
            .isString()
            .withMessage("casetags ID should be string"),
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


exports.casetagsDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("casetags id is required"),
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
   
   
exports.casetagsInfoValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("casetags id is required")
           .isString()
           .withMessage("casetags id should be string"),
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

