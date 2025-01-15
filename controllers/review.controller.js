const { errorHandler } = require("../helpers/error_handler");
const Review = require("../models/Review");

const getAll = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: ["customer", "book"],
    });
    res.send(reviews);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id, {
      include: ["customer", "book"],
    });
    if (!review) {
      return res.status(404).send({ msg: "Review not found" });
    }
    res.send(review);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { customer_id, book_id, rating, review_date } = req.body;
    const review = await Review.create({
      customer_id,
      book_id,
      rating,
      review_date,
    });

    const newReview = await Review.findByPk(review.review_id, {
      include: ["customer", "book"],
    });
    res.status(201).send(newReview);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ msg: "Review not found" });
    }

    const { rating, review_date } = req.body;
    await Review.update({ rating, review_date }, { where: { review_id: id } });

    const updatedReview = await Review.findByPk(id, {
      include: ["customer", "book"],
    });
    res.send(updatedReview);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const review = await Review.findByPk(id);
    if (!review) {
      return res.status(404).send({ msg: "Review not found" });
    }
    await Review.destroy({ where: { review_id: id } });
    res.send(review);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
