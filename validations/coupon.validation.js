const Joi = require("joi");

const createCoupon = Joi.object({
  code: Joi.string().required(),
  discount: Joi.number().integer().required(),
  from: Joi.date().required(),
  until: Joi.date().required(),
  times_used: Joi.number().integer().min(0).default(0),
  is_active: Joi.boolean().default(true),
});

const updateCoupon = Joi.object({
  code: Joi.string(),
  discount: Joi.number().integer(),
  from: Joi.date(),
  until: Joi.date(),
  times_used: Joi.number().integer().min(0),
  is_active: Joi.boolean(),
});

module.exports = {
  createCoupon,
  updateCoupon,
};
