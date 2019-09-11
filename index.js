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
    app = express();



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