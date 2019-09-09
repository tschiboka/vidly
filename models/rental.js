const
    mongoose = require("mongoose"),
    Joi = require("Joi"),
    { customerSchema } = require("./customer"),
    { movieSchema } = require("./movie"),
    rentalSchema = mongoose.Schema({
        customer: { type: customerSchema, required: true },
        movies: { type: [movieSchema], required: true },
        date: { type: Date, default: Date.now }
    }),
    Rental = new mongoose.model("Rental", rentalSchema);



module.exports.Rental = Rental;
