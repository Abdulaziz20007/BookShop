const Admin = require("../models/Admin");
const jwtService = require("../services/jwt_service");

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

    const decoded = await jwtService.verifyAccessToken(token);
    const admin = await Admin.findByPk(decoded.id);

    if (!admin) {
      return res.status(401).send({ msg: "Token noto'gri" });
    }

    req.admin = admin;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).send({ msg: "Token muddati tugagan" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).send({ msg: "Yaroqsiz token" });
    }
    return res.status(500).send({ msg: "Ichki server xatosi" });
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
