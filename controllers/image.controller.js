const { errorHandler } = require("../helpers/error_handler");
const { Image } = require("../models");

const getAll = async (req, res) => {
  try {
    const images = await Image.findAll();
    res.send(images);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ msg: "Image topilmadi" });
    }
    res.send(image);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { book_id, url } = req.body;
    const image = await Image.create({
      book_id,
      url,
    });

    const newImage = await Image.findByPk(image.id);
    res.status(201).send(newImage);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ msg: "Image topilmadi" });
    }

    const { url } = req.body;
    await Image.update({ url }, { where: { id } });

    const updatedImage = await Image.findByPk(id);
    res.send(updatedImage);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).send({ msg: "Image topilmadi" });
    }
    await Image.destroy({ where: { id } });
    res.send(image);
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
