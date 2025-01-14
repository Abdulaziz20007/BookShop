const Joi = require("joi");

exports.orderValidation = (data) => {
  const orderSchema = Joi.object({
    customer_id: Joi.number().required(),
    total: Joi.number().precision(2).required(),
    order_date: Joi.date().default(Date.now),
    delivery_date: Joi.date().allow(null),
    status: Joi.string()
      .valid("pending", "processing", "shipped", "delivered", "cancelled")
      .default("pending"),
  });

  return orderSchema.validate(data, { abortEarly: false });
};
