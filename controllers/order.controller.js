const { errorHandler } = require("../helpers/error_handler");
const {
  Order,
  CartItem,
  OrderItem,
  Customer,
  Book,
  Author,
} = require("../models");

const getAll = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Book,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                {
                  model: Author,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "verification",
              "refresh_token",
            ],
          },
        },
      ],
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
      include: [
        {
          model: OrderItem,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Book,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                {
                  model: Author,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "verification",
              "refresh_token",
            ],
          },
        },
      ],
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
    const { plan_id } = req.body;
    let total = 0;

    const cartItems = await CartItem.findAll({
      where: { customer_id },
      include: [
        {
          model: Book,
          attributes: ["price", "id"],
        },
      ],
    });

    if (!cartItems || cartItems.length === 0) {
      return res.status(404).send({ msg: "Cart bo'sh" });
    }

    for (const item of cartItems) {
      total += parseFloat(item.book.price) * parseInt(item.quantity);
    }

    const order = await Order.create({
      customer_id,
      plan_id,
      total,
    });

    const orderItemsData = cartItems.map((item) => ({
      order_id: order.order_id,
      book_id: item.book.id,
      quantity: item.quantity,
    }));

    await OrderItem.bulkCreate(orderItemsData);

    await CartItem.destroy({ where: { customer_id } });

    const newOrder = await Order.findByPk(order.order_id, {
      include: [
        {
          model: OrderItem,
          attributes: { exclude: ["createdAt", "updatedAt"] },
          include: [
            {
              model: Book,
              attributes: { exclude: ["createdAt", "updatedAt"] },
              include: [
                {
                  model: Author,
                  attributes: { exclude: ["createdAt", "updatedAt"] },
                },
              ],
            },
          ],
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "verification",
              "refresh_token",
            ],
          },
        },
      ],
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
      return res.status(404).send({ msg: "Order topilmadi" });
    }

    const { status } = req.body;
    await Order.update({ status }, { where: { id } });

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
    await Order.destroy({ where: { id } });
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
