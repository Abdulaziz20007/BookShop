const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const { Admin } = require("../models");
const { adminValidation } = require("../validations/admin.validation");
const jwtService = require("../services/jwt_service");

const getAll = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.send(admins);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await Admin.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { error, value } = adminValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }

    const { name, surname, email, phone, password } = value;
    console.log(name, surname, email, phone, password);
    const admin = await Admin.create({
      name,
      surname,
      email,
      phone,
      password: hashPassword(password),
    });

    const newAdmin = await Admin.findByPk(admin.id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.status(201).send({ admin: newAdmin });
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldAdmin = await Admin.findByPk(id);
    console.log(oldAdmin);

    if (!oldAdmin) {
      return res.status(404).send({ msg: "Admin topilmadi" });
    }
    const { error, value } = adminValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const { name, surname, email, phone, password } = value;
    if (!comparePassword(password, oldAdmin.password)) {
      return res.status(400).send({ msg: "Parol noto'g'ri" });
    }
    await Admin.update(
      {
        name,
        surname,
        email,
        phone,
      },
      {
        where: { id },
        returning: true,
      }
    );

    const updatedAdmin = await Admin.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });

    res.send({ admin: updatedAdmin });
  } catch (err) {
    errorHandler(err, res);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findByPk(id, {
      attributes: { exclude: ["refreshToken", "createdAt", "updatedAt"] },
    });
    if (!admin) {
      return res.status(404).send({ msg: "Admin topilmadi" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!comparePassword(oldPassword, admin.password)) {
      return res.status(400).send({ msg: "Parol noto'g'ri" });
    }
    await Admin.update(
      { password: hashPassword(newPassword) },
      { where: { id } }
    );
    res.send({ msg: "Parol o'zgartirildi" });
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldAdmin = await Admin.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    if (!oldAdmin) {
      return res.status(404).send({ msg: "Admin topilmadi" });
    }
    const admin = await Admin.destroy({ where: { id } });
    res.send({ admin: oldAdmin });
  } catch (err) {
    errorHandler(err, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).send({ msg: "Email yoki parol noto'g'ri" });
    }
    if (!comparePassword(password, admin.password)) {
      return res.status(400).send({ msg: "Email yoki parol noto'g'ri" });
    }

    const payload = {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      surname: admin.surname,
    };

    const tokens = jwtService.generateTokens(payload);
    await Admin.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: admin.id } }
    );

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.cookie_time,
    });
    res.send({ accessToken: tokens.accessToken });
  } catch (err) {
    errorHandler(err, res);
  }
};

const logout = async (req, res) => {
  try {
    const refresh_token = req.admin.refreshToken;
    if (!refresh_token) {
      return res.status(401).send({ msg: "Token topilmadi" });
    }
    const admin = await Admin.findOne({ where: { refresh_token } });
    if (!admin) {
      return res.status(401).send({ msg: "Noto'g'ri token" });
    }
    await Admin.update({ refreshToken: "" }, { where: { refresh_token } });
    res.clearCookie("refreshToken");
    res.send({ msg: "Tizimdan chiqildi" });
  } catch (err) {
    errorHandler(err, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.admin.refreshToken;
    if (!refresh_token) {
      return res.status(401).send({ msg: "Token topilmadi" });
    }

    const admin = await Admin.findOne({ where: { refreshToken } });
    if (!admin) {
      return res.status(404).send({ msg: "Admin topilmadi" });
    }

    const tokens = jwtService.generateTokens({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      surname: admin.surname,
    });

    await Admin.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: admin.id } }
    );

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: config.cookie_time,
    });

    res.send({ accessToken: tokens.accessToken });
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
  login,
  logout,
  refreshToken,
  changePassword,
};
