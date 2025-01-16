const { errorHandler } = require("../helpers/error_handler");
const { Contract, Customer, Order, Plan, Admin } = require("../models");
const contractValidation = require("../validations/contract.validation");
const { nextMonth, endDate } = require("../helpers/dates_helper");

const getAll = async (req, res) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Order,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Plan,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "refresh_token",
              "verification",
            ],
          },
        },
        {
          model: Admin,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "refresh_token"],
          },
        },
      ],
    });
    res.send(contracts);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const contract = await Contract.findByPk(id, {
      include: [
        {
          model: Order,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Plan,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "refresh_token",
              "verification",
            ],
          },
        },
        {
          model: Admin,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "refresh_token"],
          },
        },
      ],
    });
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
    const { order_id, start_date, first_payment } = req.body;

    const isContract = await Contract.findOne({ where: { order_id } });
    if (isContract) {
      return res.status(400).send({ msg: "Bu orderda contract mavjud" });
    }

    const parsedStartDate = new Date(start_date);

    if (parsedStartDate < new Date()) {
      return res.status(400).send({
        msg: "Boshlanish sanasi hozirgi sanadan oldin bo'lmasligi kerak",
      });
    }

    const { error, value } = contractValidation(req.body);
    if (error) {
      return errorHandler(error, res);
    }

    const order = await Order.findByPk(order_id, {
      include: [{ model: Customer }],
    });

    if (!order) {
      return res.status(404).send({ msg: "Order topilmadi" });
    }

    const plan = await Plan.findByPk(order.plan_id);

    if (!plan) {
      return res.status(404).send({ msg: "Plan topilmadi" });
    }

    const total = (order.total * plan.percent) / 100;
    const monthly_payment = (total - first_payment) / plan.month;
    const next_payment_date = nextMonth(parsedStartDate);
    const next_payment = monthly_payment;
    const plan_id = order.plan_id;
    const customer_id = order.customer_id;
    const remaining_amount = total - first_payment;
    const end_date = endDate(parsedStartDate, plan.month);

    const contract = await Contract.create({
      admin_id: req.admin.id,
      customer_id,
      order_id,
      plan_id,
      start_date: parsedStartDate,
      first_payment,
      monthly_payment,
      next_payment_date,
      next_payment,
      total,
      remaining_amount,
      end_date,
    });

    const newContract = await Contract.findByPk(contract.id, {
      include: [
        {
          model: Order,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Plan,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "refresh_token",
              "verification",
            ],
          },
        },
        {
          model: Admin,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "refresh_token"],
          },
        },
      ],
    });

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

    const updatedContract = await Contract.findByPk(id, {
      include: [
        {
          model: Order,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Plan,
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: Customer,
          attributes: {
            exclude: [
              "createdAt",
              "updatedAt",
              "password",
              "refresh_token",
              "verification",
            ],
          },
        },
        {
          model: Admin,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password", "refresh_token"],
          },
        },
      ],
    });
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
