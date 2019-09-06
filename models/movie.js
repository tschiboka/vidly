const
    mongoose = require("mongoose"),
    Joi = require("joi"),
    //genreSchema = mongoose.model("Genre").schema;
    { genreSchema } = require("./genre");



const movieShema = new mongoose.Schema({
    title: { type: String, minlength: 5, maxlength: 50, required: true, trim: true },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, required: true, min: 0, max: 250 },
    dailyRentalRate: { type: Number, required: true, min: 0, max: 250 },
});



const Movie = mongoose.model("Movie", movieShema);



const validateSchema = movie => Joi.validate(movie, {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(250),
    dailyRentalRate: Joi.number().min(0).max(250)
});



exports.Movie = Movie;
exports.validate = validateSchema;