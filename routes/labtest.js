var express = require("express");
var app = express();
const {enquiry} = require("../controllers/labtest")

app.post("/enquiry",enquiry)









module.exports = app;