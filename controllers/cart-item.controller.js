const { errorHandler } = require("../helpers/error_handler");
const { CartItem, Book, Author, Category } = require("../models");

const getAll = async (req, res) => {
  try {
    const cartItems = await CartItem.findAll({
      include: [
        {
          model: Book,
          // attributes: {
          //   exclude: ["createdAt", "updatedAt"],
          //   include: [
          //     {
          //       model: Author,
          //       attributes: { exclude: ["createdAt", "updatedAt"] },
          //     },
          //     {
          //       model: Category,
          //       attributes: { exclude: ["createdAt", "updatedAt"] },
          //     },
          //   ],
          // },
        },
      ],
    });
    res.send(cartItems);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id, {
      include: [
        {
          model: Book,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
            include: [
              {
                model: Author,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
              {
                model: Category,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        },
      ],
    });
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
    const customer_id = req.customer.id;
    const { item_id, quantity } = req.body;

    const book = await Book.findByPk(item_id);
    if (!book) {
      return res.status(404).send({
        msg: "Kitob topilmadi",
      });
    }

    const cartItem = await CartItem.create({
      item_id,
      quantity,
      customer_id,
    });
    
    const newCartItem = await CartItem.findByPk(cartItem.id, {
      include: [
        {
          model: Book,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
            {
              model: Author,
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
            {
              model: Category, 
              attributes: { exclude: ["createdAt", "updatedAt"] },
            },
          ],
        },
      ],
    });
    res.status(201).send(newCartItem);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const customer_id = req.customer.id;
    const id = req.params.id;
    const cartItem = await CartItem.findByPk(id);
    if (!cartItem) {
      return res.status(404).send({ msg: "Cart item topilmadi" });
    }
    if (cartItem.customer_id !== customer_id) {
      return res.status(403).send({ msg: "Ruxsat yo'q" });
    }

    const { item_id, quantity } = req.body;
    await CartItem.update({ item_id, quantity }, { where: { id } });

    const updatedCartItem = await CartItem.findByPk(id, {
      include: [
        {
          model: Book,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
            include: [
              {
                model: Author,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
              {
                model: Category,
                attributes: { exclude: ["createdAt", "updatedAt"] },
              },
            ],
          },
        },
      ],
    });
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
