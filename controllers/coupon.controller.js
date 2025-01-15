const { errorHandler } = require("../helpers/error_handler");
const Coupon = require("../models/Coupon");

const getAll = async (req, res) => {
  try {
    const coupons = await Coupon.findAll();
    res.send(coupons);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).send({ msg: "Coupon topilmadi" });
    }
    res.send(coupon);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { code, discount, from, until, times_used, is_active } = req.body;
    const coupon = await Coupon.create({
      code,
      discount,
      from,
      until,
      times_used,
      is_active,
    });
    res.status(201).send(coupon);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).send({ msg: "Coupon topilmadi" });
    }

    const { discount, until, times_used, is_active } = req.body;
    await Coupon.update(
      { discount, until, times_used, is_active },
      { where: { coupon_id: id } }
    );

    const updatedCoupon = await Coupon.findByPk(id);
    res.send(updatedCoupon);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const coupon = await Coupon.findByPk(id);
    if (!coupon) {
      return res.status(404).send({ msg: "Coupon topilmadi" });
    }
    await Coupon.destroy({ where: { coupon_id: id } });
    res.send(coupon);
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
