const
    port = process.env.PORT || 3000,
    express = require("express"),
    app = express(),
    genresRoutes = require("./routes/genres"),
    homeRoute = require("./routes/home"),
    mongoose = require("mongoose");



mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("Connected to Vidly database..."))
    .catch((err) => console.log("Cannot connect to Vidly database\n" + err));

const genresSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, trim: true, lowercase: true }
});

const Genre = mongoose.model("Genre", genresSchema);

async function createGenre(genreName) {
    try {
        const genre = new Genre({
            name: genreName
        });

        const result = await genre.save();
        return result;
    } catch (err) { console.log(err) }
}

createGenre("mystery")
    .then((result) => console.log(`Created a new genre: ${result}`))
    .catch((err) => console.log(`Could not create genre ${genre}!\n${err.message}`));


app.listen(port, () => console.log(`Listening on port ${port}...`));
app.use(express.json());
app.use("/api/genres", genresRoutes);
app.use("/", homeRoute)



