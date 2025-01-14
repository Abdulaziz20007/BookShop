const Joi = require("joi");

exports.customerValidation = (data) => {
  const customerSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().allow(""),
    birth_date: Joi.date().allow(null),
    password: Joi.string().min(6).required(),
    passport_seria: Joi.string().allow(""),
    passport_number: Joi.number().allow(null),
    address: Joi.string().allow(""),
    verification: Joi.string().allow(""),
  });

  return customerSchema.validate(data, { abortEarly: false });
};
