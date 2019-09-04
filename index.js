const
    port = process.env.PORT || 3000,
    express = require("express"),
    app = express(),
    genresRoutes = require("./routes/genres"),
    homeRoute = require("./routes/home");



app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.json());
app.use("/api/genres", genresRoutes);
app.use("/", homeRoute)



