const Joi = require("joi");

const createContract = Joi.object({
  order_id: Joi.number().integer().required(),
  plan_id: Joi.number().integer().required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().required(),
  first_payment: Joi.number().precision(2).required(),
  monthly_payment: Joi.number().precision(2).required(),
  next_payment: Joi.date().required(),
  total: Joi.number().precision(2).required(),
});

const updateContract = Joi.object({
  plan_id: Joi.number().integer(),
  end_date: Joi.date(),
  monthly_payment: Joi.number().precision(2),
  next_payment: Joi.date(),
  total: Joi.number().precision(2),
});

module.exports = {
  createContract,
  updateContract,
};
