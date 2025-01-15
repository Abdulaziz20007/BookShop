const { errorHandler } = require("../helpers/error_handler");
const Contract = require("../models/Contract");

const getAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    res.send(contracts);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ msg: "Contract topilmadi" });
    }
    res.send(contract);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const {
      order_id,
      plan_id,
      start_date,
      end_date,
      first_payment,
      monthly_payment,
      next_payment,
      total,
    } = req.body;

    const contract = await Contract.create({
      order_id,
      plan_id,
      start_date,
      end_date,
      first_payment,
      monthly_payment,
      next_payment,
      total,
    });

    const newContract = await Contract.findByPk(contract.id);
    res.status(201).send(newContract);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ msg: "Contract topilmadi" });
    }

    const { end_date, monthly_payment, next_payment, total } = req.body;

    await Contract.update(
      { end_date, monthly_payment, next_payment, total },
      { where: { id } }
    );

    const updatedContract = await Contract.findByPk(id);
    res.send(updatedContract);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findByPk(id);
    if (!contract) {
      return res.status(404).send({ msg: "Contract topilmadi" });
    }
    await Contract.destroy({ where: { id } });
    res.send(contract);
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
