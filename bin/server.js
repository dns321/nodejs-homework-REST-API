const app = require("../app");
const mongoose = require("mongoose");
require("dotenv").config();

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const port = PORT || 3000;
    app.listen(port, () => {
      console.log("Database connection successful");
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
