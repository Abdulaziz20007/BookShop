const Joi = require("joi");

const createOrderItem = Joi.object({
  order_id: Joi.number().integer().required(),
  book_id: Joi.number().integer().required(),
  quantity: Joi.number().integer().min(1).required(),
});

const updateOrderItem = Joi.object({
  quantity: Joi.number().integer().min(1),
});

module.exports = {
  createOrderItem,
  updateOrderItem,
};
