const Joi = require("joi");

const createOrder = Joi.object({
  customer_id: Joi.number().integer().required(),
  total: Joi.number().precision(2).required(),
  order_date: Joi.date().default(Date.now),
  delivery_date: Joi.date().allow(null),
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered", "cancelled")
    .default("pending"),
});

const updateOrder = Joi.object({
  total: Joi.number().precision(2),
  delivery_date: Joi.date().allow(null),
  status: Joi.string().valid(
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ),
});

module.exports = {
  createOrder,
  updateOrder,
};
