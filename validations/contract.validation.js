const Joi = require("joi");

exports.contractValidation = (data) => {
  const contractSchema = Joi.object({
    order_id: Joi.number().required(),
    plan_id: Joi.number().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    first_payment: Joi.number().precision(2).required(),
    monthly_payment: Joi.number().precision(2).required(),
    next_payment: Joi.date().required(),
    total: Joi.number().precision(2).required(),
  });

  return contractSchema.validate(data, { abortEarly: false });
};
