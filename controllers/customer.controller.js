const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const { Customer } = require("../models");
const { customerValidation } = require("../validations/customer.validation");
const jwtService = require("../services/jwt_service");

const getAll = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.send(customers);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.send(customer);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = async (req, res) => {
  try {
    const { error, value } = customerValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }

    const {
      name,
      surname,
      email,
      phone,
      password,
      birth_date,
      passport_seria,
      passport_number,
      address,
    } = value;
    const customer = await Customer.create({
      name,
      surname,
      email,
      phone,
      password: hashPassword(password),
      birth_date,
      passport_seria,
      passport_number,
      address,
    });

    const newCustomer = await Customer.findByPk(customer.id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    res.status(201).send({ customer: newCustomer });
  } catch (err) {
    errorHandler(err, res);
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldCustomer = await Customer.findByPk(id);

    if (!oldCustomer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }
    const { error, value } = customerValidation(req.body);
    if (error) {
      errorHandler(error, res);
    }
    const {
      name,
      surname,
      email,
      phone,
      password,
      birth_date,
      passport_seria,
      passport_number,
      address,
    } = value;
    if (!comparePassword(password, oldCustomer.password)) {
      return res.status(400).send({ msg: "Invalid password" });
    }
    await Customer.update(
      {
        name,
        surname,
        email,
        phone,
        birth_date,
        passport_seria,
        passport_number,
        address,
      },
      {
        where: { id },
        returning: true,
      }
    );

    const updatedCustomer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });

    res.send({ customer: updatedCustomer });
  } catch (err) {
    errorHandler(err, res);
  }
};

const changePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id, {
      attributes: { exclude: ["refreshToken", "createdAt", "updatedAt"] },
    });
    if (!customer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!comparePassword(oldPassword, customer.password)) {
      return res.status(400).send({ msg: "Invalid password" });
    }
    await Customer.update(
      { password: hashPassword(newPassword) },
      { where: { id } }
    );
    res.send({ msg: "Password changed successfully" });
  } catch (err) {
    errorHandler(err, res);
  }
};

const deleteById = async (req, res) => {
  try {
    const id = req.params.id;
    const oldCustomer = await Customer.findByPk(id, {
      attributes: {
        exclude: ["password", "refresh_token", "createdAt", "updatedAt"],
      },
    });
    if (!oldCustomer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }
    const customer = await Customer.destroy({ where: { id } });
    res.send({ customer: oldCustomer });
  } catch (err) {
    errorHandler(err, res);
  }
};

const getMyCartItems = async (req, res) => {
  try {
    const customer_id = req.customer.id;
    const items = await CartItem.findAll({ where: { customer_id } });
    if (!items) {
      return res.status(404).send({ msg: "Cart items topilmadi" });
    }
    res.send({ items });
  } catch (err) {
    errorHandler(err, res);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ where: { email } });
    if (!customer) {
      return res.status(404).send({ msg: "Invalid email or password" });
    }
    if (!comparePassword(password, customer.password)) {
      return res.status(400).send({ msg: "Invalid email or password" });
    }

    const payload = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      surname: customer.surname,
    };

    const tokens = jwtService.generateTokens(payload);
    await Customer.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: customer.id } }
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
    const refresh_token = req.customer.refreshToken;
    if (!refresh_token) {
      return res.status(401).send({ msg: "Token topilmadi" });
    }
    const customer = await Customer.findOne({ where: { refresh_token } });
    if (!customer) {
      return res.status(401).send({ msg: "Invalid token" });
    }
    await Customer.update({ refreshToken: "" }, { where: { refresh_token } });
    res.clearCookie("refreshToken");
    res.send({ msg: "Successfully logged out" });
  } catch (err) {
    errorHandler(err, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.customer.refreshToken;
    if (!refresh_token) {
      return res.status(401).send({ msg: "Token topilmadi" });
    }

    const customer = await Customer.findOne({ where: { refreshToken } });
    if (!customer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }

    const tokens = jwtService.generateTokens({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      surname: customer.surname,
    });

    await Customer.update(
      { refreshToken: tokens.refreshToken },
      { where: { id: customer.id } }
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
  getMyCartItems,
};
