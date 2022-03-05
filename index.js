"use strict";
const serverless = require("serverless-http");
const express = require("express");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}...`));
//This wrapper makes it so an express server and be used as a lambda
const apiHandler = serverless(app);
module.exports.handler = async (event, context) => {
  return await apiHandler(event, context);
};
