const Joi = require("joi");

const createPayment = Joi.object({
  contract_id: Joi.number().integer().required(),
  amount: Joi.number().precision(2).required(),
  payment_date: Joi.date().default(Date.now),
  payment_method: Joi.string().valid("cash", "card", "transfer").required(),
  payment_status: Joi.string()
    .valid("pending", "completed", "failed")
    .default("pending"),
});

const updatePayment = Joi.object({
  amount: Joi.number().precision(2),
  payment_date: Joi.date(),
  payment_method: Joi.string().valid("cash", "card", "transfer"),
  payment_status: Joi.string().valid("pending", "completed", "failed"),
});

module.exports = {
  createPayment,
  updatePayment,
};
