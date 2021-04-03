const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());

//app.use(bodyParser.json());
app.use(require('connect').bodyParser());


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Speech2Text"
  });
});

module.exports = app;