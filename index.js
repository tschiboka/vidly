require("express-async-errors");

const
    Joi = require("joi"),
    port = process.env.PORT || 3000,
    config = require("config"),
    express = require("express"),
    mongoose = require("mongoose"),
    homeRoute = require("./routes/home"),
    genresRoutes = require("./routes/genres"),
    moviesRoutes = require("./routes/movies"),
    customersRoutes = require("./routes/customers"),
    rentalsRoutes = require("./routes/rentals"),
    usersRoutes = require("./routes/users"),
    authsRoutes = require("./routes/auths"),
    winston = require("winston"),
    error = require("./middleware/error"),
    app = express();



process.on("uncaughtException", ex => {
    console.log("WE'VE GOT AN UNCAUGHT EXCEPTION!");
    winston.error(ex.message, ex);
});
require("winston-mongodb");
winston.add(winston.transports.File, { filename: "logfile.log" });
winston.add(winston.transports.MongoDB, { db: "mongodb://localhost/vidly", level: "error" })

throw new Error("Error during startup");


if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined!");
    process.exit(1);
}



mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Vidly database..."))
    .catch((err) => console.log("Cannot connect to Vidly database\n" + err));



app.listen(port, () => console.log(`Listening on port ${port}...`));



Joi.objectId = require("joi-objectid")(Joi);



app.use(express.json());
app.use("/", homeRoute);
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/movies", moviesRoutes);
app.use("/api/rentals", rentalsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auths", authsRoutes);

app.use(error);