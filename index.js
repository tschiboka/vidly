const winston = require("winston");
const express = require("express");
const app = express();



// index was polluted and had poor separation of concern so it is delegated now from ./startup/*
require("./startup/logging")(); // load first in case of error we can already log them
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();
require("./startup/validation")();



port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));