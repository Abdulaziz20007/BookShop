const { errorHandler } = require("../helpers/error_handler");
const Ban = require("../models/Ban");

const getAll = async (req, res) => {
  try {
    const bans = await Ban.findAll();
    res.send(bans);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const ban = await Ban.findByPk(id);
    if (!ban) {
      return res.status(404).send({ msg: "Ban topilmadi" });
    }
    res.send(ban);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { admin_id, user_id, email, phone, reason } = req.body;
    const ban = await Ban.create({
      admin_id,
      user_id,
      email,
      phone,
      reason,
    });

    const newBan = await Ban.findByPk(ban.id);
    res.status(201).send(newBan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const ban = await Ban.findByPk(id);
    if (!ban) {
      return res.status(404).send({ msg: "Ban topilmadi" });
    }

    const { reason } = req.body;
    await Ban.update({ reason }, { where: { id } });

    const updatedBan = await Ban.findByPk(id);
    res.send(updatedBan);
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const ban = await Ban.findByPk(id);
    if (!ban) {
      return res.status(404).send({ msg: "Ban topilmadi" });
    }
    await Ban.destroy({ where: { id } });
    res.send(ban);
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
