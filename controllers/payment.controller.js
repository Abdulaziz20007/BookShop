const { errorHandler } = require("../helpers/error_handler");
const { Payment, Contract } = require("../models");
const { nextMonth } = require("../helpers/dates_helper");

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: {
        model: Contract,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.send(payments);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id, {
      include: {
        model: Contract,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (!payment) {
      return res.status(404).send({ msg: "Payment topilmadi" });
    }
    res.send(payment);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const payment_date = new Date();
    const payment_status = "completed";
    const { contract_id, amount, payment_method } = req.body;
    const payment = await Payment.create(
      {
        contract_id,
        amount,
        payment_date,
        payment_method,
        payment_status,
      },
      {
        include: {
          model: Contract,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
      }
    );

    const contract = await Contract.findByPk(contract_id);
    if (!contract) {
      return res.status(404).send({ msg: "Contract topilmadi" });
    }

    const nextPaymentDate = nextMonth(payment_date);

    const contractAmount = Number(contract.next_payment);
    const paymentAmount = Number(amount);
    const remainingAmount = Number(contract.remaining_amount) - paymentAmount;
    const nextPayment =
      Number(contract.monthly_payment) -
      paymentAmount / contract.monthly_payment;
    console.log(contract.remaining_amount, paymentAmount);

    await Contract.update(
      {
        next_payment_date: nextPaymentDate,
        next_payment: nextPayment,
        remaining_amount: remainingAmount,
      },
      { where: { id: contract.id } }
    );

    res.status(201).send(payment);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).send({ msg: "Payment topilmadi" });
    }

    const { amount, payment_date, payment_method, payment_status } = req.body;
    await Payment.update(
      { amount, payment_date, payment_method, payment_status },
      { where: { payment_id: id } }
    );

    const updatedPayment = await Payment.findByPk(id, {
      include: {
        model: Contract,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    res.send(updatedPayment);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id, {
      include: {
        model: Contract,
        attributes: { exclude: ["createdAt", "updatedAt"] },
      },
    });
    if (!payment) {
      return res.status(404).send({ msg: "Payment topilmadi" });
    }
    await Payment.destroy({ where: { payment_id: id } });
    res.send(payment);
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
