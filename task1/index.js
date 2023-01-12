const express = require("express");
const { query } = require("express-validator");
const Cache = require("./cache");
const validate = require("./validate.middleware");
const FizzBuzz = require("./fizzBuzz");
require("dotenv").config();
const app = express();

app.get("/task-1", query("number").isInt({ min: 0 }), validate, (req, res) => {
  const number = req.query.number;
  const cachedNumber = Cache.get(number);
  if (cachedNumber) {
    return res.json(cachedNumber.value.join(" "));
  }
  const result = FizzBuzz(number);
  Cache.set(number, result);
  res.json(result.join(" "));
});

app.listen(3000);
