const logger = require("../services/logger.service");

const errorHandler = (err, res) => {
  logger.log("error", err);
  // console.log(err.parent)
  return res.status(400).send({ error: err.message });
};

module.exports = { errorHandler };
