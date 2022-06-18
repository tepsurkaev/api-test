require("dotenv").config();
const express = require("express");
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const routes = require("./routes/users.route");

const { PORT, MONGO_DB } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(upload());
app.use(express.static(path.resolve(__dirname, "public/images")));
app.use(routes);

const connect = async () => {
  try {
    await mongoose.connect(MONGO_DB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    app.listen(PORT, () => {
      console.log("Server started...");
    });
  } catch (e) {
    console.log(e);
  }
};

connect();
