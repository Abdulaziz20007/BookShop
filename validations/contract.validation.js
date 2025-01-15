const Joi = require("joi");

exports.contractValidation = (data) => {
  const contractSchema = Joi.object({
    order_id: Joi.number().required(),
    plan_id: Joi.number().required(),
    start_date: Joi.date().default(new Date()),
    first_payment: Joi.number().required(),
    monthly_payment: Joi.number().required(),
    next_payment: Joi.date().required(),
    total: Joi.number().required(),
  });

  return contractSchema.validate(data, { abortEarly: false });
};
