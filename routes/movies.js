const
    { Movie, validate } = require("../models/movies"),
    express = require("express"),
    router = express.Router();



router.get("/", async (req, res) => {
    try { res.send(await Movie.find()); }
    catch (err) { console.log(err); }
});



router.get("/:id", (req, res) => res.send("GetId"));



router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(404).send("Invalid request body!" + error.message);

        res.send(await new Movie(req.body).save());
    } catch (err) { console.log(err); }
});



router.put("/:id", (req, res) => res.send("Put"));



router.delete("/:id", (req, res) => res.send("Delete"));



module.exports = router;