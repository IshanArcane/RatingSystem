const { body } = require("express-validator");

exports.registerValidator = [
  body("name").isLength({ min: 2 }).withMessage("Name too short"),
  body("email").isEmail().withMessage("Invalid email"),
  body("address").notEmpty().withMessage("Address is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be >= 6 chars"),
  body("role").optional().isIn(["ADMIN", "USER", "STORE_OWNER"]),
];

exports.loginValidator = [body("email").isEmail(), body("password").notEmpty()];

exports.storeValidator = [
  body("name").isLength({ min: 2 }),
  body("email").isEmail(),
  body("address").notEmpty(),
];

exports.ratingValidator = [
  body("ratingValue")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be 1-5"),
  body("storeId").isInt(),
];
