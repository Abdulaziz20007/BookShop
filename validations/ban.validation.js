const Joi = require("joi");

exports.banValidation = (data) => {
  const banSchema = Joi.object({
    admin_id: Joi.number().required(),
    user_id: Joi.number().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(""),
    reason: Joi.string().required(),
  });

  return banSchema.validate(data, { abortEarly: false });
};
