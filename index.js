const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const server = express();
require("dotenv").config();
const error = (message = "Bad request") => {
  const err = new Error(message);
  err.status = 400;
  return err;
};
const { PORT = 3001 } = process.env;

server.use(logger("short"));
server.use(cors());
server.use(express.json());

server.get("/", async (req, res, next) => {
  try {
    res.json({
      message: "ВСЕ ДОБРЕ, GET-ЗАПИТ ВИКОНАНО УСПІШНО!",
    });
  } catch (e) {
    next(e);
  }
});

server.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    if (Object.keys(body).length === 0) {
      throw error("ТІЛО ЗАПИТУ НЕ ПЕРЕДАНЕ, АБО НЕ ВІДПОВІДАЄ ФОРМАТУ JSON!!");
    }
    res.json({
      message: "ВСЕ ДОБРЕ, POST-ЗАПИТ ВИКОНАНО УСПІШНО! ",
      content: body,
    });
  } catch (e) {
    next(e);
  }
});

server.use((req, res) => {
  const message = "Not found";
  res.status(404).json({ message });
});
server.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
server.listen(PORT, console.log("Server running"));
