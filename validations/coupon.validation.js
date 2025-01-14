const Joi = require("joi");

exports.couponValidation = (data) => {
  const couponSchema = Joi.object({
    code: Joi.string().required(),
    discount: Joi.number().required(),
    from: Joi.date().required(),
    until: Joi.date().required(),
    times_used: Joi.number().min(0).default(0),
    is_active: Joi.boolean().default(true),
  });

  return couponSchema.validate(data, { abortEarly: false });
};
