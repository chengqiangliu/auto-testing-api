//removed body from the source code and added check and validation instead

const { check, validationResult } = require("express-validator");

/*exports.userLoginValidator =[
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
                const error = validationResult(req).formatWith(({ msg }) => [{msg,errorcode:'401what'}]);
            
                const hasError = !error.isEmpty();
            
                if (hasError) {
                  res.status(422).json({ errors: error.array() });
                } else {
                  next();
                }
              }
    ]
;
*/

exports.deviceAddValidator = 
    [
        check("deviceName")
            .exists({checkFalsy: true})
            .withMessage("deviceName is required")
            .isString()
            .withMessage("deviceName should be string"),
        check("model")
            .exists({checkFalsy: true})
            .withMessage("Model is required")
            .isString()
            .withMessage("Model should be string"),
        check("create_user")
        .exists()
        .withMessage("user is required"),
        check("type").optional(),
        check("platform").optional(),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,code:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(401).json({ success: false, errors: error.array() });
                } else {
                next();
                }
            }
    ];

exports.deviceUpdateValidator = 
     [
        check("deviceName")
            .exists({checkFalsy: true})
            .withMessage("deviceName is required"),
        check("model")
            .exists()
            .withMessage("model is required"),
        check("update_user").exists().withMessage("update user is required"),
            (req, res, next) => {
                const error = validationResult(req).formatWith(({ msg }) => ({msg,errorcode:'401'}));

                const hasError = !error.isEmpty();

                if (hasError) {
                res.status(422).json({ success: false, errors: error.array() });
                } else {
                next();
                }
            }
    ];


exports.deviceDeleteValidator = 
     [
       check("deviceName")
           .exists({checkFalsy: true})
           .withMessage("deviceName is required"),
       (req, res, next) => {
           const error = validationResult(req).formatWith(( {msg} ) => ({msg, code:'400'}));
           const hasError = !error.isEmpty();

            if (hasError) {
            res.status(400).json({ success: false, errors: error.array() });
            } else {
            next();
            }
        }
    ];

exports.deviceGetValidator = 
   [
      check("deviceName")
          .exists({checkFalsy: true})
          .withMessage("deviceName is required"),
      (req, res, next) => {
          const error = validationResult(req).formatWith(( {msg} ) => ({msg, errorcode:'400'}));
          const hasError = !error.isEmpty();

          if (hasError) {
          res.status(400).json({ success: false, error: error.array() });
          } else {
          next();
          }
      }
  ];
