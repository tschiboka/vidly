const
    express = require("express"),
    { Rental, validate } = require("../models/rental"),
    { Customer } = require("../models/customer"),
    { Movie } = require("../models/movie"),
    router = express.Router(),
    mongoose = require("mongoose"),
    Fawn = require("fawn");



Fawn.init(mongoose);



router.get("/", (req, res) => {
    res.send("GET");
});



router.get("/:id", (req, res) => {
    res.send("GET");
});



router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send("Could not find customer on id: " + req.body.customer);

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send("Could not find movie on id: " + req.body.movieId);

        if (!movie.numberInStock) res.status(400).send(`Movie ${movie.title} is out of stock! Id: ${movie._id}`)

        const rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
            movie: {
                _id: movie.id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });

        try {
            // FAWN transaction here (an easier implementation of 2 phase commit)
            new Fawn.Task()
                .save("rentals", rental) // we need to use the actual name of the collection
                .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
                .run();

            res.send(rental);
        } catch (err) { res.status(500).send("Internal Server Error:\n" + err) }
    } catch (err) { console.log(err); }
});



module.exports = router;