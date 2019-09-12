const
    express = require("express"),
    homeRoute = require("../routes/home"),
    genresRoutes = require("../routes/genres"),
    moviesRoutes = require("../routes/movies"),
    customersRoutes = require("../routes/customers"),
    rentalsRoutes = require("../routes/rentals"),
    usersRoutes = require("../routes/users"),
    authsRoutes = require("../routes/auths"),
    error = require("../middleware/error");


module.exports = function (app) {
    app.use(express.json());
    app.use("/", homeRoute);
    app.use("/api/genres", genresRoutes);
    app.use("/api/customers", customersRoutes);
    app.use("/api/movies", moviesRoutes);
    app.use("/api/rentals", rentalsRoutes);
    app.use("/api/users", usersRoutes);
    app.use("/api/auths", authsRoutes);
    app.use(error);
}