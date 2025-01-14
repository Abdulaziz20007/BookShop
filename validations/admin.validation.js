const Joi = require("joi");

exports.adminValidation = (data) => {
  const adminSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).optional(),
    email: Joi.string().email().required(),
    phone: Joi.string().max(15),
    password: Joi.string().min(6).required(),
  });

  return adminSchema.validate(data, { abortEarly: false });
};
