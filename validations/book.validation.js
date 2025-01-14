const Joi = require("joi");

exports.bookValidation = (data) => {
  const bookSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().allow(""),
    category_id: Joi.number().required(),
    author_id: Joi.number(),
    price: Joi.number().required(),
    quantity: Joi.number().min(0),
    publisher: Joi.string().allow(""),
    publication_date: Joi.date().allow(null),
  });

  return bookSchema.validate(data, { abortEarly: false });
};
