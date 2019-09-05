const
    express = require("express"),
    mongoose = require("mongoose"),
    Joi = require("joi"),
    router = express.Router(),
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



router.get("/", async (req, res) => {
    try { res.send(await Customer.find()); }
    catch (err) { console.log("Could not get Customers from database!"); }
});



router.get("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);
        res.send(customer);
    } catch (err) { console.log(err) }
});



router.post("/", async (req, res) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) return res.status(404).send(error.message);
        res.send(await new Customer(req.body).save());
    } catch (err) { console.log(`Could not post new Customer\n${req.body}`); }
});



router.put("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);

        const { error } = validateCustomer(req.body);
        if (error) return res.status(404).send(error.message);
        res.send(await customer.set(req.body).save());
    } catch (err) { console.log("Error while updating database\n" + err); }
});



router.delete("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);
        res.send(await customer.remove());
    } catch (err) { console.log("Error while deleting Customers from db!\n" + err); }
})



module.exports = router;