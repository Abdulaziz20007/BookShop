const { errorHandler } = require("../helpers/error_handler");
const { Order, CartItem, OrderItem, Customer } = require("../models");

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: OrderItem }, { model: Customer }],
    });
    res.send(orders);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id, {
      include: [{ model: OrderItem }, { model: Customer }],
    });
    if (!order) {
      return res.status(404).send({ msg: "Order topilmadi" });
    }
    res.send(order);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const customer_id = req.customer.id;
    let total = 0;

    const cartItems = await CartItem.findAll({
      where: { customer_id },
    });

    if (!cartItems) {
      return res.status(404).send({ msg: "Cart bo'sh" });
    }

    for (const item of cartItems) {
      total += item.price * item.quantity;
    }

    const order = await Order.create({
      customer_id,
      total,
    });

    const orderItems = await OrderItem.create({
      order_id: order.order_id,
      book_id: cartItems.book_id,
      quantity: cartItems.quantity,
    });

    await CartItem.destroy({ where: { customer_id } });

    const newOrder = await Order.findByPk(order.order_id);
    res.status(201).send(newOrder);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).send({ msg: "Order topilmadi" });
    }

    const { status } = req.body;
    await Order.update({ status }, { where: { order_id: id } });

    const updatedOrder = await Order.findByPk(id);
    res.send(updatedOrder);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).send({ msg: "Order topilmadi" });
    }
    await Order.destroy({ where: { order_id: id } });
    res.send(order);
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
