const { errorHandler } = require("../helpers/error_handler");
const { CartItem } = require("../models");

const getAll = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll();
    res.send(cartItems);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).send({ msg: "Cart item topilmadi" });
    }
    res.send(cartItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { item_id, quantity, customer_id } = req.body;
    const cartItem = await CartItem.create({
      item_id,
      quantity,
      customer_id,
    });

    const newCartItem = await CartItem.findByPk(cartItem.id);
    res.status(201).send(newCartItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).send({ msg: "Cart item topilmadi" });
    }

    const { quantity } = req.body;
    await CartItem.update({ quantity }, { where: { id } });

    const updatedCartItem = await CartItem.findByPk(id);
    res.send(updatedCartItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).send({ msg: "Cart item topilmadi" });
    }
    await CartItem.destroy({ where: { id } });
    res.send(cartItem);
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
