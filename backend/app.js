const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); // node js package that alllow us to constract paths in way to save run on any os
const interviewRoute = require("./routes/interview");
const imagesRoute = require("./routes/images");

//returing us an express app
const app = express();






app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

/* multer config */
app.use("/images", express.static(path.join("backend/images")));
/* multer config */

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});


app.use("/api/interviews", interviewRoute);
app.use("/api/images", imagesRoute);

module.exports = app;
