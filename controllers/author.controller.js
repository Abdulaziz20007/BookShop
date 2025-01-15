const { errorHandler } = require("../helpers/error_handler");
const { Author } = require("../models");

const getAll = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.send(authors);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).send({ msg: "Author topilmadi" });
    }
    res.send(author);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { name, surname, biography, birth_date, nationality, wiki_url } =
      req.body;
    const author = await Author.create({
      name,
      surname,
      biography,
      birth_date,
      nationality,
      wiki_url,
    });
    res.status(201).send(author);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).send({ msg: "Author topilmadi" });
    }

    const { name, surname, biography, birth_date, nationality, wiki_url } =
      req.body;
    await Author.update(
      { name, surname, biography, birth_date, nationality, wiki_url },
      { where: { id } }
    );

    const updatedAuthor = await Author.findByPk(id);
    res.send(updatedAuthor);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const author = await Author.findByPk(id);
    if (!author) {
      return res.status(404).send({ msg: "Author topilmadi" });
    }
    await Author.destroy({ where: { id } });
    res.send(author);
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
