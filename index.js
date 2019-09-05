const
    port = process.env.PORT || 3000,
    express = require("express"),
    mongoose = require("mongoose"),
    homeRoute = require("./routes/home"),
    genresRoutes = require("./routes/genres"),
    customersRoutes = require("./routes/customers"),
    app = express();



mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Vidly database..."))
    .catch((err) => console.log("Cannot connect to Vidly database\n" + err));



app.listen(port, () => console.log(`Listening on port ${port}...`));



app.use(express.json());
app.use("/", homeRoute);
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customersRoutes);
