const
    { Genre, validate } = require("../models/genre"),
    express = require("express"),
    router = express.Router();


router.get("/", async (req, res) => {
    throw Error("upsie");
    res.send(await Genre.find().sort("name"));
});



router.get("/:id", async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send("No genre on the given id!");
    res.send(genre);
});



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(await new Genre({ name: req.body.name }).save());
});



router.put("/:id", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.params.id);

    if (!genre) return res.status(404).send(`Could not find genre with id: ${req.params.id}!`);

    res.send(await genre.set({ name: req.body.name }).save());
});



router.delete("/:id", async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(404).send("No genre on the given id!");
    res.send(genre);
});



module.exports = router;