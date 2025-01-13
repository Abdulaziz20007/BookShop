const Joi = require("joi");

const createAuthor = Joi.object({
  name: Joi.string().required(),
  surname: Joi.string().allow(""),
  biography: Joi.string().allow(""),
  birth_date: Joi.date().allow(null),
  nationality: Joi.string().allow(""),
  wiki_url: Joi.string().uri().allow(""),
});

const updateAuthor = Joi.object({
  name: Joi.string(),
  surname: Joi.string().allow(""),
  biography: Joi.string().allow(""),
  birth_date: Joi.date().allow(null),
  nationality: Joi.string().allow(""),
  wiki_url: Joi.string().uri().allow(""),
});

module.exports = {
  createAuthor,
  updateAuthor,
};
