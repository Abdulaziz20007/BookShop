const Joi = require("joi");

exports.reviewValidation = (data) => {
  const reviewSchema = Joi.object({
    customer_id: Joi.number().required(),
    book_id: Joi.number().required(),
    rating: Joi.number().min(1).max(5).required(),
    review_date: Joi.date().default(Date.now),
  });

  return reviewSchema.validate(data, { abortEarly: false });
};
