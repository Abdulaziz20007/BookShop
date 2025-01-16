const Joi = require("joi");

module.exports = (data) => {
  const contractSchema = Joi.object({
    order_id: Joi.number().required(),
    start_date: Joi.date().default(new Date()),
    first_payment: Joi.number().required(),
  });

  return contractSchema.validate(data, { abortEarly: false });
};
