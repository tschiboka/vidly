const
    express = require("express"),
    Joi = require("joi"),
    router = express.Router(),
    genres = [
        { id: 1, name: "Horror" },
        { id: 2, name: "Action" }
    ];


function validateGenre(genre) {
    const schema = { name: Joi.string().min(3).required() }
    return Joi.validate(genre, schema);
}



router.get("/", (req, res) => res.send(genres));



router.get("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("No genre on the given id");
    res.send(genre);
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



module.exports = router;