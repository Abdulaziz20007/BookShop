const Joi = require("joi");

const createImage = Joi.object({
  book_id: Joi.number().integer().required(),
  url: Joi.string().required(),
});

const updateImage = Joi.object({
  url: Joi.string(),
});

module.exports = {
  createImage,
  updateImage,
};
