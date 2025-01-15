const { errorHandler } = require("../helpers/error_handler");
const { Plan } = require("../models");

const getAll = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.send(plans);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).send({ msg: "Plan topilmadi" });
    }
    res.send(plan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { month, percent } = req.body;
    const plan = await Plan.create({
      month,
      percent,
    });
    res.status(201).send(plan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).send({ msg: "Plan topilmadi" });
    }

    const { month, percent } = req.body;
    await Plan.update({ month, percent }, { where: { plan_id: id } });

    const updatedPlan = await Plan.findByPk(id);
    res.send(updatedPlan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const plan = await Plan.findByPk(id);
    if (!plan) {
      return res.status(404).send({ msg: "Plan topilmadi" });
    }
    await Plan.destroy({ where: { plan_id: id } });
    res.send(plan);
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
