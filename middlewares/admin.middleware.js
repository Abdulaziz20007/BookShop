const Admin = require("../models/Admin");
const jwtService = require("../services/jwt_service");
const { errorHandler } = require("../helpers/error_handler");

const adminMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    const admin = await jwtService.verifyAccessToken(token);

    if (!admin) {
      return res.status(401).send({ msg: "Token noto'g'ri" });
    }

    admin.refreshToken = req.cookies.refreshToken;

    req.admin = admin;
    next();
  } catch (err) {
    errorHandler(err, res);
  }
};

const adminSelfMiddleware = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id !== req.admin.id) {
      return res.status(403).send({ msg: "Ruxsat yo'q" });
    }
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = { adminMiddleware, adminSelfMiddleware };
