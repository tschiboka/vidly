const
    mongoose = require("mongoose"),
    Joi = require("joi"),
    userSchema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
            maxlength: 1024
        }
    }),
    User = new mongoose.model("User", userSchema),
    validateUser = user => Joi.validate(user, {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(50)
    });



module.exports.User = User;
module.exports.validate = validateUser;