const
    { Movie, validate } = require("../models/movie"),
    { Genre } = require("../models/genre"),
    express = require("express"),
    router = express.Router();



router.get("/", async (req, res) => { res.send(await Movie.find()); });



router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);
    res.send(movie);
});



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("Invalid request body!" + error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre " + req.body.genreId);

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    res.send(await movie.save());
});



router.put("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);

    const { error } = validate(req.body);
    if (error) return res.status(400).send("Invalid request body!" + error.message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send("Invalid genre " + req.body.genreId);

    movie.set({
        title: req.body.title,
        genre: {
            _id: genre.id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    res.send(await movie.set(req.body).save());
});



router.delete("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);

    res.send(await movie.delete());
});



module.exports = router;