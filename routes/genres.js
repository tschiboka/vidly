const
    express = require("express"),
    Joi = require("joi"),
    mongoose = require("mongoose"),
    router = express.Router(),
    validateGenre = genre => Joi
        .validate(genre, { name: Joi.string().min(3).max(20).required() }),
    Genre = mongoose
        .model("Genre", new mongoose.Schema({
            name: { type: String, required: true, minlength: 3, maxlength: 20, trim: true, lowercase: true }
        }));



router.get("/", async (req, res) => {
    try { res.send(await Genre.find().sort("name")); }
    catch (err) { res.send("Could not get genres!"); }
});



router.get("/:id", async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send("No genre on the given id!");
        res.send(genre);
    } catch (err) { res.send(`Could not get genre on the given id: ${req.params.id}!`); }
});



router.post("/", async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        res.send(await new Genre({ name: req.body.name }).save());
    } catch (err) { res.send(`Could not post new genre ${req.body.name}!`); }
});



router.put("/:id", async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.params.id);

        if (!genre) return res.status(404).send(`Could not find genre with id: ${req.params.id}!`);

        res.send(await genre.set({ name: req.body.name }).save());
    } catch (err) { res.send(`Could not update ${req.params.id}!`) }
});



router.delete("/:id", async (req, res) => {
    try { res.send(await Genre.findByIdAndRemove(req.params.id)); }
    catch (err) { console.log(`Could not delete ${req.params.id}!`); }
});



module.exports = router;