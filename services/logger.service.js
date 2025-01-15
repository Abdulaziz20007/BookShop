const winston = require("winston");

const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, json, prettyPrint, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  // format: combine(timestamp(), myFormat),
  transports: [
    new transports.Console({ prettyPrint }),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({ filename: "./logs/combine.log", level: "info" }),
  ],
});

logger.exitOnError = false;

logger.exceptions.handle(
  new transports.File({ filename: "./logs/exceptions.log" })
);
logger.rejections.handle(
  new transports.File({ filename: "./logs/rejections.log" })
);

module.exports = logger;
