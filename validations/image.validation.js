const Joi = require("joi");

exports.imageValidation = (data) => {
  const imageSchema = Joi.object({
    book_id: Joi.number().required(),
    url: Joi.string().required(),
  });

  return imageSchema.validate(data, { abortEarly: false });
};
