const { errorHandler } = require("../helpers/error_handler");
const { Category } = require("../models");

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.send(categories);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ msg: "Category topilmadi" });
    }
    res.send(category);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { parent_category_id, name, description } = req.body;
    const category = await Category.create({
      parent_category_id,
      name,
      description,
    });
    res.status(201).send(category);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ msg: "Category topilmadi" });
    }

    const { parent_category_id, name, description } = req.body;
    await Category.update(
      { parent_category_id, name, description },
      { where: { id } }
    );

    const updatedCategory = await Category.findByPk(id);
    res.send(updatedCategory);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).send({ msg: "Category topilmadi" });
    }
    await Category.destroy({ where: { id } });
    res.send(category);
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
