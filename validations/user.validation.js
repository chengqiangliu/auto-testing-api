//removed body from the source code and added check and validation instead
const { check, validationResult } = require("express-validator");

exports.userLoginValidator =[
        check("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        check("password")
            .exists()
            .withMessage("Password is required")
            //.isString()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
              )
            .withMessage("Password should be have atleast one upper case letter, one lower case letter, one number and one special character")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
            
        (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => [{msg,errorcode:'401'}]);
            
                const hasError = !error.isEmpty();
            
                if (hasError) {
                  res.status(422).json({ errors: error.array() });
                } else {
                  next();
                }
              }
    ]
;

exports.userAddValidator = 
    [
        check("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        check("password")
            .exists()
            .withMessage("Password is required")
            //.isString()
            .matches(
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/,
              )
            .withMessage("Password should be have atleast one upper case letter, one lower case letter, one number and one special character")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
        check("clientId")
        .exists()
        .withMessage("clientID is required"),
        check("email").optional().isEmail().withMessage("Provide valid email"),
        check("phone")
            .optional()
            .isString()
            .withMessage("phone number should be string"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => [{msg,errorcode:'401'}]);

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ errors: error.array() });
                } else {
                next();
                }
            }
    ];

exports.userUpdateValidator = 
     [
        check("_id")
            .exists({checkFalsy: true})
            .withMessage("User ID is required")
            .isString()
            .withMessage("User ID should be string"),
        check("username")
            .exists({checkFalsy: true})
            .withMessage("User name is required")
            .isString()
            .withMessage("User name should be string"),
        check("password")
            .exists()
            .withMessage("Password is required")
            .isString()
            .withMessage("Password should be string")
            .isLength({min: 5})
            .withMessage("Password should be at least 5 characters"),
        check("email").optional().isEmail().withMessage("Provide valid email"),
        check("phone")
            .optional()
            .isString()
            .withMessage("phone number should be string"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => [{msg,errorcode:'401'}]);

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ errors: error.array() });
                } else {
                next();
                }
            }
    ];


exports.userDeleteValidator = 
     [
        check("userId")
            .exists({checkFalsy: true})
            .withMessage("User ID is required")
            .isString()
            .withMessage("User ID should be string"),
        (req, res, next) => {
            const error = validationResult(req).formatWith(({ msg }) => [{msg,errorcode:'401'}]);

            const hasError = !error.isEmpty();

            if (hasError) {
            res.status(422).json({ errors: error.array() });
            } else {
            next();
            }
        }
    ];

