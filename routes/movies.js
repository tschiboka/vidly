const
    { Movie, validate } = require("../models/movies"),
    express = require("express"),
    router = express.Router();



router.get("/", async (req, res) => {
    try { res.send(await Movie.find()); }
    catch (err) { console.log(err); }
});



router.get("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);
        res.send(movie);
    } catch (err) { console.log(err); }
});



router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send("Invalid request body!" + error.message);

        res.send(await new Movie(req.body).save());
    } catch (err) { console.log(err); }
});



router.put("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);

        const { error } = validate(req.body);
        if (error) return res.status(400).send("Invalid request body!" + error.message);

        res.send(await movie.set(req.body).save());
    } catch (err) { console.log(err); }
});



router.delete("/:id", async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send("No movie found on the given id " + req.params.id);

        res.send(await movie.delete());
    } catch (err) { console.log(err); }
});



module.exports = router;