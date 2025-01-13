const Joi = require("joi");

const createCustomer = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(""),
  birth_date: Joi.date().allow(null),
  password: Joi.string().required().min(6),
  passport_seria: Joi.string().allow(""),
  passport_number: Joi.number().integer().allow(null),
  address: Joi.string().allow(""),
  verification: Joi.string().allow(""),
  refresh_token: Joi.string().allow(""),
});

const updateCustomer = Joi.object({
  name: Joi.string(),
  surname: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string().allow(""),
  birth_date: Joi.date().allow(null),
  password: Joi.string().min(6),
  passport_seria: Joi.string().allow(""),
  passport_number: Joi.number().integer().allow(null),
  address: Joi.string().allow(""),
  verification: Joi.string().allow(""),
  refresh_token: Joi.string().allow(""),
});

module.exports = {
  createCustomer,
  updateCustomer,
};
