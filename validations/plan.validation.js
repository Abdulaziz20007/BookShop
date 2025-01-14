const Joi = require("joi");

exports.planValidation = (data) => {
  const planSchema = Joi.object({
    month: Joi.number().required(),
    percent: Joi.number().precision(2).required(),
  });

  return planSchema.validate(data, { abortEarly: false });
};
