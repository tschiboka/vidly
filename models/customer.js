const
    mongoose = require("mongoose"),
    Joi = require("joi"),
    customersSchema = new mongoose.Schema({
        name: { type: String, required: true, minlength: 3, maxlength: 50, trim: true, uppercase: true },
        phone: { type: String, minlength: 8, maxlength: 12, trim: true },
        isGold: { type: Boolean, default: false }
    }),
    Customer = mongoose.model("Customer", customersSchema),
    validateCustomer = customer => Joi.validate(customer, {
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(8).max(12).required().regex(/^\d+$/),
        isGold: Joi.boolean()
    });



exports.Customer = Customer;
exports.validate = validateCustomer;
