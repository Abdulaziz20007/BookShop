const { errorHandler } = require("../helpers/error_handler");
const {
  Order,
  Customer,
  Book,
  Contract,
  Payment,
  Plan,
  OrderItem,
} = require("../models");

const getSalesReport = async (req, res) => {
  try {
    const { start_date, end_date } = req.body;

    if (!start_date || !end_date) {
      return res.status(400).send({
        msg: "Boshlang'ich va tugash sanasi ko'rsatilishi shart",
      });
    }

    const orders = await Order.findAll({
      where: {
        createdAt: {
          [Symbol.for("between")]: [new Date(start_date), new Date(end_date)],
        },
      },
      include: [
        {
          model: Customer,
          attributes: ["name", "surname", "phone"],
        },
        {
          model: OrderItem,
          attributes: ["quantity"],
          include: [
            {
              model: Book,
              attributes: ["title", "price"]
            }
          ]
        }
      ],
    });

    const result = orders.map((order) => ({
      mijoz: `${order.customer.surname} ${order.customer.name}`,
      telefon: order.customer.phone,
      kitoblar: order.orderItems.map((item) => ({
        nomi: item.book.title,
        narxi: item.book.price,
        soni: item.quantity,
      })),
      jami: order.total,
      sana: order.createdAt,
    }));

    res.send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getOverduePayments = async (req, res) => {
  try {
    const today = new Date();

    const overdueContracts = await Contract.findAll({
      where: {
        next_payment_date: {
          [Symbol.for("lt")]: today,
        },
        remaining_amount: {
          [Symbol.for("gt")]: 0,
        },
      },
      include: [
        {
          model: Customer,
          attributes: ["name", "surname"],
        },
        {
          model: Order,
          include: [
            {
              model: OrderItem,
              include: [
                {
                  model: Book,
                  attributes: ["title"]
                }
              ]
            }
          ],
        },
      ],
    });

    const result = overdueContracts.map((contract) => {
      const kunlarSoni = Math.floor(
        (today - new Date(contract.next_payment_date)) / (1000 * 60 * 60 * 24)
      );

      return {
        mijoz: `${contract.customer.surname} ${contract.customer.name}`,
        kitoblar: contract.order.orderItems.map((item) => item.book.title).join(", "),
        shartnoma_raqami: contract.id,
        tolov_summasi: contract.next_payment,
        kechikkan_kunlar: kunlarSoni,
      };
    });

    res.send(result);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getSalesReport,
  getOverduePayments,
};
