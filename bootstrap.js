"use strict";
require("./src/global-package");
dotENV.config({
  path: path.join(__dirname, `.env.${process.env.NODE_ENV}`),
});
global.dataConstraint = require("./config/data.constraints");
global.messages = require("./config/messages");
require("./config/db/db-connection");
require("./src/schema/index");
require("./src/server");