const { errorHandler } = require("../helpers/error_handler");
const { OrderItem } = require("../models");

const getAll = async (req, res) => {
  try {
    const orderItems = await OrderItem.findAll();
    res.send(orderItems);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).send({ msg: "Order item topilmadi" });
    }
    res.send(orderItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { order_id, book_id, quantity } = req.body;
    const orderItem = await OrderItem.create({
      order_id,
      book_id,
      quantity,
    });

    const newOrderItem = await OrderItem.findByPk(orderItem.id);
    res.status(201).send(newOrderItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).send({ msg: "Order item topilmadi" });
    }

    const { quantity } = req.body;
    await OrderItem.update({ quantity }, { where: { id } });

    const updatedOrderItem = await OrderItem.findByPk(id);
    res.send(updatedOrderItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const orderItem = await OrderItem.findByPk(id);
    if (!orderItem) {
      return res.status(404).send({ msg: "Order item topilmadi" });
    }
    await OrderItem.destroy({ where: { id } });
    res.send(orderItem);
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
