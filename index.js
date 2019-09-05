const
    port = process.env.PORT || 3000,
    express = require("express"),
    app = express(),
    genresRoutes = require("./routes/genres"),
    mongoose = require("mongoose"),
    homeRoute = require("./routes/home");



mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Vidly database..."))
    .catch((err) => console.log("Cannot connect to Vidly database\n" + err));



app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.json());
app.use("/api/genres", genresRoutes);
app.use("/", homeRoute)
