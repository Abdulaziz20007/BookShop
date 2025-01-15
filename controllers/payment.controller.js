const { errorHandler } = require("../helpers/error_handler");
const Payment = require("../models/Payment");

const getAll = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.send(payments);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
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
    const {
      contract_id,
      amount,
      payment_date,
      payment_method,
      payment_status,
    } = req.body;
    const payment = await Payment.create({
      contract_id,
      amount,
      payment_date,
      payment_method,
      payment_status,
    });
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

    const updatedPayment = await Payment.findByPk(id);
    res.send(updatedPayment);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Payment.findByPk(id);
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
