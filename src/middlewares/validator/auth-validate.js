const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  emailOrMobile: Joi.alternatives([
    Joi.string().email({ tlds: false }),
    Joi.string().pattern(/^[0][0-9]{9}$/),
  ])
    .required()
    .messages({
      "alternatives.match": "invalid email or moblie",
      "any.required": "email or moblie is required",
    })
    .strip(),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "password is required",
      "string.pattern.base":
        "password must be at least 6 characters and contain only alphabet and number",
      "any.required": "password is required",
    }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "string.empty": "confirm password is required",
      "any.only": "password and confirm password did not match",
      "any.required": "confirm password is required",
    })
    .strip(),
  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[a-zA-Z0-9]{6,}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required().messages({
    "string.empty": "email or mobile is required",
    "any.required": "email or mobile is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "password or mobile is required",
    "any.required": "password or mobile is required",
  }),
});

exports.register = validate(registerSchema);
exports.login = validate(loginSchema);
