const Customer = require("../models/Customer");
const Ban = require("../models/Ban");
const jwtService = require("../services/jwt_service");
const { errorHandler } = require("../helpers/error_handler");

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

    if (customer.expired_at < new Date()) {
      return res.status(401).send({ msg: "Token eskirgan" });
    }

    customer.refreshToken = req.cookies.refreshToken;

    req.customer = customer;
    next();
  } catch (err) {
    errorHandler(err, res);
  }
};

const customerSelfMiddleware = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id != req.customer.id) {
      return res.status(403).send({ msg: "Ruxsat yo'q" });
    }
    // console.log("A");
    next();
  } catch (err) {
    errorHandler(err, res);
  }
};

module.exports = { customerMiddleware, customerSelfMiddleware };
