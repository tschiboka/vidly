const
    Joi = require("joi"),
    mongoose = require("mongoose"),
    validateGenre = genre => Joi
        .validate(genre, { name: Joi.string().min(3).max(20).required() }),
    genreSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 3, maxlength: 20, trim: true, lowercase: true }
    }),
    Genre = mongoose.model("Genre", genreSchema);



exports.validate = validateGenre;
exports.Genre = Genre;
exports.genreSchema = genreSchema;
