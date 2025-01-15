const { errorHandler } = require("../helpers/error_handler");
const Order = require("../models/Order");

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: ["customer", "order_items", "contract"],
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
      include: ["customer", "order_items", "contract"],
    });
    if (!order) {
      return res.status(404).send({ msg: "Order not found" });
    }
    res.send(order);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { customer_id, total, order_date, delivery_date, status } = req.body;

    const order = await Order.create({
      customer_id,
      total,
      order_date,
      delivery_date,
      status,
    });

    const newOrder = await Order.findByPk(order.order_id, {
      include: ["customer", "order_items", "contract"],
    });
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
      return res.status(404).send({ msg: "Order not found" });
    }

    const { total, delivery_date, status } = req.body;
    await Order.update(
      { total, delivery_date, status },
      { where: { order_id: id } }
    );

    const updatedOrder = await Order.findByPk(id, {
      include: ["customer", "order_items", "contract"],
    });
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
      return res.status(404).send({ msg: "Order not found" });
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
