const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { errorHandler } = require("../helpers/error_handler");
const { Customer } = require("../models");
const { customerValidation } = require("../validations/customer.validation");
const jwtService = require("../services/jwt_service");
const uuid = require("uuid");
const mailService = require("../services/mail.service");
const config = require("config");

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
    if(!customer) {
      return res.status(404).send({msg: "Customer topilmadi"})
    }
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

    const verification = uuid.v4();

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
      verification,
    });

    const newCustomer = await Customer.findByPk(customer.id, {
      attributes: {
        exclude: [
          "verification",
          "password",
          "refresh_token",
          "createdAt",
          "updatedAt",
          "verification",
        ],
      },
    });

    await mailService.sendMailActivationCode(customer.email, verification);

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
    if (oldCustomer.email !== email) {
      const verification = uuid.v4();
      await Customer.update({ verification }, { where: { id } });
      await mailService.sendMailActivationCode(email, verification);
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
    const { id } = req.customer;

    const customer = await Customer.findByPk(id, {
      attributes: { exclude: ["refreshToken", "createdAt", "updatedAt"] },
    });
    if (!customer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }
    const { oldPassword, newPassword } = req.body;
    if (!comparePassword(oldPassword, customer.password)) {
      return res.status(400).send({ msg: "Parol noto'g'ri" });
    }
    await Customer.update(
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
      return res.status(404).send({ msg: "Cart bo'sh" });
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
      return res.status(404).send({ msg: "Email yoki parol noto'g'ri" });
    }
    if (!comparePassword(password, customer.password)) {
      return res.status(400).send({ msg: "Email yoki parol noto'g'ri" });
    }
    if (customer.is_active == false) {
      return res.status(404).send({ msg: "Customer aktiv emas" });
    }

    const payload = {
      id: customer.id,
      email: customer.email,
      name: customer.name,
      surname: customer.surname,
    };

    const tokens = jwtService.generateTokens(payload);
    await Customer.update(
      { refresh_token: tokens.refreshToken },
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
      return res.status(401).send({ msg: "Noto'g'ri token" });
    }
    await Customer.update({ refresh_token: "" }, { where: { refresh_token } });
    res.clearCookie("refreshToken");
    res.send({ msg: "Tizimdan chiqildi" });
  } catch (err) {
    errorHandler(err, res);
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies.refreshToken;
    if (!refresh_token) {
      return res.status(401).send({ msg: "Token topilmadi" });
    }

    const customer = await Customer.findOne({ where: { refresh_token } });
    if (!customer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }
    if (customer.is_active == false) {
      return res.status(404).send({ msg: "Customer aktiv emas" });
    }

    const tokens = jwtService.generateTokens({
      id: customer.id,
      email: customer.email,
      name: customer.name,
      surname: customer.surname,
    });

    await Customer.update(
      { refresh_token: tokens.refreshToken },
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

const verify = async (req, res) => {
  try {
    const verification = req.params.id;
    const customer = await Customer.findOne({ where: { verification } });

    if (!customer) {
      return res.status(404).send({ msg: "Customer topilmadi" });
    }

    if (customer.is_active == true) {
      return res.status(400).send({ msg: "Customer aktiv" });
    }
    await Customer.update({ is_active: true }, { where: { id: customer.id } });
    res.send({ msg: "Customer aktivlandi" });
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
  verify,
};
