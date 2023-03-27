//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.ciAddValidator = 
    [
        check("ci_url")
            .exists()
            .withMessage("ci_url is required")
            //.isString()
            .matches(
                /^((http|https):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/,
            )
            .withMessage("The URL is invalid."),
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

exports.ciUpdateValidator = 
     [
        check("id")
            .exists({checkFalsy: true})
            .withMessage("ci ID is required")
            .isString()
            .withMessage("ci ID should be string"),
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


exports.ciDeleteValidator = 
     [
       check("ci_url")
           .exists({checkFalsy: true})
           .withMessage("ci_url is required"),
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

    exports.ciDeleteByIdValidator = 
    [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("ci id is required"),
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
   
   
   exports.ciGetValidator = 
   [
       check("id")
           .exists({checkFalsy: true})
           .withMessage("ci id is required")
           .isString()
           .withMessage("ci id should be string"),
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

