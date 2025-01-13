const Joi = require("joi");

const createCategory = Joi.object({
  parent_category_id: Joi.number().integer().allow(null),
  name: Joi.string().required(),
  description: Joi.string().allow(""),
});

const updateCategory = Joi.object({
  parent_category_id: Joi.number().integer().allow(null),
  name: Joi.string(),
  description: Joi.string().allow(""),
});

module.exports = {
  createCategory,
  updateCategory,
};
