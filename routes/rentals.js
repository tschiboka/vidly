const
    express = require("express"),
    Rental = require("../models/rental").Rental,
    { Customer } = require("../models/customer"),
    { Movie } = require("../models/movie"),
    router = express.Router();



router.get("/", (req, res) => {
    res.send("GET");
});



router.get("/:id", (req, res) => {
    res.send("GET");
});



router.post("/", async (req, res) => {
    try {
        const customer = await Customer.findById(req.body.customer);
        if (!customer) return res.status(400).send("Could not find customer on id: " + req.body.customer);

        const movies = [];

        for (let i = 0; i <= req.body.movies.length - 1; i++) {
            const movie = await Movie.findById(req.body.movies[i]);
            if (!movie) return res.status(400).send("Could not find movie on id: " + req.body.movies[i]);
            movies.push(movie);
        }

        console.log(customer);
        const rental = new Rental({
            customer: customer,
            movies: movies
        });

        res.send(rental);
    } catch (err) { console.log(err); }
});



module.exports = router;