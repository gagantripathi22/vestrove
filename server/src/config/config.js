const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRoute = require("../routes/user.js");
const itemRoute = require("../routes/item");
const adminRoute = require("../routes/admin");
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.on("connected", () => {
  console.log("Database Connected");
});

const app = express();

app.use(express.json());

app.use(cors());

const port = 8080;

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

app.use("/api/user", userRoute);
app.use("/api/item", itemRoute);
app.use("/api/admin/", adminRoute);
