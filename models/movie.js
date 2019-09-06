const
    mongoose = require("mongoose"),
    Joi = require("joi"),
    //genreSchema = mongoose.model("Genre").schema;
    { genreSchema } = require("./genre");



const movieShema = new mongoose.Schema({
    title: { type: String, minlength: 5, maxlength: 50, required: true, trim: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true },
    dailyRentalRate: { type: Number, required: true },
});



const Movie = mongoose.model("Movie", movieShema);



const validateSchema = movie => Joi.validate(movie, {
    title: Joi.string().min(5).max(50).required(),
    genre: Joi.object(),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number()
});



exports.Movie = Movie;
exports.validate = validateSchema;