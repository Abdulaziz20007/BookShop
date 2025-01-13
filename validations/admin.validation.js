const Joi = require("joi");

const createAdmin = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  password: Joi.string().required().min(6),
  refresh_token: Joi.string().allow(""),
});

const updateAdmin = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  password: Joi.string().min(6),
  refresh_token: Joi.string().allow(""),
});

module.exports = {
  createAdmin,
  updateAdmin,
};
