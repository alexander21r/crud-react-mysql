const express = require("express");
const cors = require("cors");
const db = require("./models");
const routes = require("./routes/routes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);


db.sequelize
  .sync()
  .then(() => {
    app.listen(3003, () => {
      console.log("Server running on port 3003");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
