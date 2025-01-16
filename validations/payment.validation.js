const Joi = require("joi");

exports.paymentValidation = (data) => {
  const paymentSchema = Joi.object({
    contract_id: Joi.number().required(),
    amount: Joi.number().precision(2).required(),
    payment_date: Joi.date().default(Date.now),
    payment_status: Joi.string()
      .valid("pending", "completed", "failed")
      .default("pending"),
  });

  return paymentSchema.validate(data, { abortEarly: false });
};
