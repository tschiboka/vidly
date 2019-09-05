const
    express = require("express"),
    Joi = require("joi"),
    router = express.Router(),
    mongoose = require("mongoose");



const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20, trim: true, lowercase: true }
}));



function validateGenre(genre) {
    const schema = { name: Joi.string().min(3).required() }
    return Joi.validate(genre, schema);
}



router.get("/", async (req, res) => {
    try {
        const genres = await Genre.find().sort("name");
        res.send(genres);
    } catch (err) { res.send("Could not get genres!") }
});



router.get("/:id", async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send("No genre on the given id");
        res.send(genre);
    } catch (err) { res.send(`Could not get genre on the given id:${req.params.id}`); }
});



router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = { id: genres.length + 1, name: req.body.name };
    genres.push(genre);
    res.send(genre);
});



router.put("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("No genre on the given id");

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});



router.delete("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("No genre on the given id");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});



async function createGenre(genreName) {
    try {
        const genre = new Genre({
            name: genreName
        });

        const result = await genre.save();
        return result;
    } catch (err) { console.log(err) }
}



//createGenre("mystery")
//    .then((result) => console.log(`Created a new genre: ${result}`))
//    .catch((err) => console.log(`Could not create genre ${genre}!\n${err.message}`));



async function getAllGenres() {
    try {
        return await Genre.find();
    } catch (err) { console.log(err) }
}

module.exports = router;