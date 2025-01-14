const { errorHandler } = require("../helpers/error_handler");
const Admin = require("../models/Admin");

const getAll = (req, res) => {
  try {
    const admins = Admin.findAll();
    res.send(admins);
  } catch (err) {
    errorHandler(err, res);
  }
};

const getById = (req, res) => {
  try {
    const id = req.params.id;
    const admin = Admin.findByPk(id);
    res.send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};

const create = (req, res) => {
  try {
    const 
    const admin = Admin.create({name, surname, email, phone, password})
    res.send(admin);
  } catch (err) {
    errorHandler(err, res);
  }
};
