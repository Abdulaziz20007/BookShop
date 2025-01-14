const Joi = require("joi");

exports.authorValidation = (data) => {
  const authorSchema = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().allow(""),
    biography: Joi.string().allow(""),
    birth_date: Joi.date().allow(null),
    nationality: Joi.string().allow(""),
    wiki_url: Joi.string().uri().allow(""),
  });

  return authorSchema.validate(data, { abortEarly: false });
};
