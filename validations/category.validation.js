const Joi = require("joi");

exports.categoryValidation = (data) => {
  const categorySchema = Joi.object({
    parent_category_id: Joi.number().allow(null),
    name: Joi.string().required(),
    description: Joi.string().allow(""),
  });

  return categorySchema.validate(data, { abortEarly: false });
};
