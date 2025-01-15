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

    const customer = await jwtService.verifyAccessToken(token);

    if (!customer) {
      return res.status(401).send({ msg: "Token noto'g'ri" });
    }

    const ban = await Ban.findOne({
      where: {
        user_id: customer.id,
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
  } catch (err) {
    return res.status(500).send({ msg: "Ichki server xatosi" });
  }
};

const customerSelfMiddleware = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id !== req.customer.id) {
      return res.status(403).send({ msg: "Ruxsat yo'q" });
    }
  } catch (err) {
    return res.status(500).send({ msg: "Ichki server xatosi" });
  }
};

module.exports = { customerMiddleware, customerSelfMiddleware };
