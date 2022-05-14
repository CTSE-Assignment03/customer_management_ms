require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const customerRoutes = require('./routes');

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI)
  .then(() => {
    console.log("DB Connection Successful");
  })
  .catch((err) => {
    console.log("DB Connection Failed - " + err);
  });

app.get("/api/test", (req,res) => {res.send("Hello From TEST endpoint!")})  
app.use("/api",customerRoutes);

//event loop for server
app.listen(PORT, () => {
    console.log(`Backend server is running on port ${PORT}`);
  });