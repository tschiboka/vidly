const
    mongoose = require("mongoose"),
    Joi = require("joi"),
    config = require("config"),
    jwt = require("jsonwebtoken"),
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
    });



userSchema.methods.generateAuthToken = function () {
    return jwt.sign({ id: this.id }, config.get("jwtPrivateKey"));
}



const
    User = new mongoose.model("User", userSchema),
    validateUser = user => Joi.validate(user, {
        name: Joi.string().required().min(5).max(50),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(50)
    });



mongoose.set('useCreateIndex', true); // current version needs this setting otherwise coughing up warnings



module.exports.User = User;
module.exports.validate = validateUser;