const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const message = err.message || "server error";
  const code = err.code || 500;

  res.status(500).json({
    status: "fail",
    code,
    message,
  });
});

module.exports = app;
