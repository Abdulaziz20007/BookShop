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

    const orders = await Contract.findAll({
      where: {
        createdAt: {
          [Symbol.for("between")]: [new Date(start_date), new Date(end_date)],
        },
      },
      include: [
        {
          model: Order,
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
                  attributes: ["title", "price"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!orders) {
      return res.status(404).send({ msg: "Contractlar topilmadi" });
    }

    res.send(orders);
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
                  attributes: ["title"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!overdueContracts) {
      return res.status(404).send({ msg: "Kechikkan to'lovlar topilmadi" });
    }

    // const result = overdueContracts
    //   .map((contract) => {
    //     if (
    //       !contract.customer ||
    //       !contract.order ||
    //       !contract.order.orderItems
    //     ) {
    //       return null;
    //     }

    //     const kunlarSoni = Math.floor(
    //       (today - new Date(contract.next_payment_date)) / (1000 * 60 * 60 * 24)
    //     );

    //     return {
    //       mijoz: `${contract.customer.surname} ${contract.customer.name}`,
    //       kitoblar: contract.order.orderItems
    //         .filter((item) => item && item.book)
    //         .map((item) => item.book.title)
    //         .join(", "),
    //       shartnoma_raqami: contract.id,
    //       tolov_summasi: contract.next_payment,
    //       kechikkan_kunlar: kunlarSoni,
    //     };
    //   })
    //   .filter(Boolean);

    res.send(overdueContracts);
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = {
  getSalesReport,
  getOverduePayments,
};
