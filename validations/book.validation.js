const Joi = require("joi");

const createBook = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  category_id: Joi.number().integer().required(),
  author_id: Joi.string().allow(""),
  price: Joi.number().precision(2).required(),
  stock_quantity: Joi.number().integer().min(0),
  publisher: Joi.string().allow(""),
  publication_date: Joi.date().allow(null),
});

const updateBook = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  category_id: Joi.number().integer(),
  author_id: Joi.string().allow(""),
  price: Joi.number().precision(2),
  stock_quantity: Joi.number().integer().min(0),
  publisher: Joi.string().allow(""),
  publication_date: Joi.date().allow(null),
});

module.exports = {
  createBook,
  updateBook,
};
