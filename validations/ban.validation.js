const Joi = require("joi");

const createBan = Joi.object({
  admin_id: Joi.number().integer().required(),
  user_id: Joi.number().integer().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow(""),
});

const updateBan = Joi.object({
  phone: Joi.string().allow(""),
});

module.exports = {
  createBan,
  updateBan,
};
