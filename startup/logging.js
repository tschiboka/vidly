const winston = require("winston");
require("express-async-errors");
require("winston-mongodb");



module.exports = function () {
    process.on("uncaughtException", ex => {
        winston.error(ex.message, ex);
        process.exit(1);
    });



    process.on("unhandledRejection", ex => { // eg no catch block on a promise
        winston.error(ex.message, ex);
        process.exit(1);
    });



    winston.add(winston.transports.File, { filename: "logfile.log" });
    winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly", level: "error" });
}