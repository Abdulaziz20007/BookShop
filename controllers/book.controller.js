const { errorHandler } = require("../helpers/error_handler");
const { Book } = require("../models");

const getAll = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.send(books);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({ msg: "Book topilmadi" });
    }
    res.send(book);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const {
      title,
      description,
      category_id,
      author_id,
      price,
      quantity,
      publisher,
      publication_date,
    } = req.body;
    const book = await Book.create({
      title,
      description,
      category_id,
      author_id,
      price,
      quantity,
      publisher,
      publication_date,
    });
    res.status(201).send(book);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({ msg: "Book topilmadi" });
    }

    const {
      title,
      description,
      category_id,
      author_id,
      price,
      quantity,
      publisher,
      publication_date,
    } = req.body;
    await Book.update(
      {
        title,
        description,
        category_id,
        author_id,
        price,
        quantity,
        publisher,
        publication_date,
      },
      { where: { id } }
    );

    const updatedBook = await Book.findByPk(id);
    res.send(updatedBook);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).send({ msg: "Book topilmadi" });
    }
    await Book.destroy({ where: { id } });
    res.send(book);
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
