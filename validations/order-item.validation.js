const Joi = require("joi");

exports.orderItemValidation = (data) => {
  const orderItemSchema = Joi.object({
    order_id: Joi.number().required(),
    book_id: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
  });

  return orderItemSchema.validate(data, { abortEarly: false });
};
