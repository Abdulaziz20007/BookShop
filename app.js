const express = require("express");
const config = require("config");
const cookieParser = require("cookie-parser");
const logger = require("./services/logger.service");
const sequelize = require("./config/db");
const { requestLogging, errorLogging } = require("./helpers/express_winston");

const PORT = config.get("port");
const notFound = (req, res) => res.status(404).send("Not Found");

const app = express();
app.use(express.json());
app.use(cookieParser());
const mainRouter = require("./routes/index.routes");

app.use(requestLogging);
app.use("/api", mainRouter);
app.use("*", notFound);
app.use(errorLogging);

async function start() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(PORT, () => {
      console.log(`server started at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Malumotlar bazasiga ulanishda xatolik");
  }
}

start();
