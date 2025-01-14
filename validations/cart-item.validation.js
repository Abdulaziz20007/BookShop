const Joi = require("joi");

exports.cartItemValidation = (data) => {
  const cartItemSchema = Joi.object({
    item_id: Joi.number().required(),
    quantity: Joi.number().min(1).required(),
    customer_id: Joi.number().required(),
  });

  return cartItemSchema.validate(data, { abortEarly: false });
};
