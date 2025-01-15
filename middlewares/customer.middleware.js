const Customer = require("../models/Customer");
const Ban = require("../models/Ban");
const jwtService = require("../services/jwt_service");

const customerMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    const decoded = await jwtService.verifyAccessToken(token);
    const customer = await Customer.findByPk(decoded.id);

    if (!customer) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    const ban = await Ban.findOne({
      where: {
        user_id: customer.id,
        is_active: true,
      },
    });

    if (ban) {
      return res.status(403).send({
        msg: "Akkount bloklangan",
        reason: ban.reason,
      });
    }

    if (!customer.is_active) {
      return res.status(403).send({ msg: "Customer faol emas" });
    }

    req.customer = customer;
    next();
  } catch (error) {
    return res.status(500).send({ msg: "Ichki server xatosi" });
  }
};

module.exports = customerMiddleware;
