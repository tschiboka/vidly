const
    mongoose = require("mongoose"),
    Joi = require("Joi"),
    { customerSchema } = require("./customer"),
    { movieSchema } = require("./movie"),
    rentalSchema = mongoose.Schema({
        customer: {
            type: new mongoose.Schema({
                name: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 50
                },
                idGold: {
                    type: Boolean,
                    required: true
                },
                phone: {
                    type: String,
                    required: true,
                    minlenght: 8,
                    maxlength: 14
                }
            }),
            required: true
        },
        movie: {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    required: true,
                    minlength: 5,
                    maxlength: 255
                },
                dailyRentalRate: {
                    type: Number,
                    required: true,
                    min: 0,
                    max: 250
                }
            }),
            required: true
        },
        dateOut: {
            type: Date,
            required: true,
            default: Date.now
        },
        dateReturned: Date,
        rentalFee: {
            type: Number,
            min: 0
        }
    }),
    Rental = new mongoose.model("Rental", rentalSchema),
    validateRental = (rental) => {
        const schema = {
            customerId: Joi.string().required(),
            movieId: Joi.string().required()
        }

        return Joi.validate(rental, schema);
    };



module.exports.Rental = Rental;
