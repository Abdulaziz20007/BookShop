const Joi = require("joi");

const createPlan = Joi.object({
  month: Joi.number().integer().required(),
  percent: Joi.number().precision(2).required(),
});

const updatePlan = Joi.object({
  month: Joi.number().integer(),
  percent: Joi.number().precision(2),
});

module.exports = {
  createPlan,
  updatePlan,
};
