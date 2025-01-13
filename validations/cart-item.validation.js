const Joi = require("joi");

const createCartItem = Joi.object({
  item_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
  customer_id: Joi.number().integer().required(),
});

const updateCartItem = Joi.object({
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  createCartItem,
  updateCartItem,
};
