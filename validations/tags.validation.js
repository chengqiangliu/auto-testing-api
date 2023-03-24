//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.tagsAddValidator = 
    [
        check("tagsname")
            .exists({checkFalsy: true})
            .withMessage(" Tagname is required")
            .isString()
            .withMessage("Tagname should be string"),
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

exports.tagsUpdateValidator = 
     [
        check("id")
            .exists({checkFalsy: true})
            .withMessage("tag ID is required")
            .isString()
            .withMessage("tag ID should be string"),
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


exports.tagsDeleteValidator = 
     [
       check("tagsname")
           .exists({checkFalsy: true})
           .withMessage("tag name is required"),
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

    exports.tagsDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("tag id is required"),
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
   
   
   exports.tagsInfoValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("tag id is required")
           .isString()
           .withMessage("tag id should be string"),
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

