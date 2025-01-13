const Joi = require("joi");

const createReview = Joi.object({
  customer_id: Joi.number().integer().required(),
  book_id: Joi.number().integer().required(),
  rating: Joi.number().integer().min(1).max(5).required(),
  review_date: Joi.date().default(Date.now),
});

const updateReview = Joi.object({
  rating: Joi.number().integer().min(1).max(5),
  review_date: Joi.date(),
});

module.exports = {
  createReview,
  updateReview,
};
