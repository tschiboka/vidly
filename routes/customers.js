const
    express = require("express"),
    mongoose = require("mongoose"),
    router = express.Router(),
    customersSchema = new mongoose.Schema({
        isGold: { type: Boolean, default: false },
        name: { type: String, required: true, minlength: 3, maxlength: 50, trim: true, uppercase: true },
        phone: { type: String, minlength: 8, maxlength: 12, trim: true }
    }),
    Customer = mongoose.model("Customer", customersSchema);



async function createCustomer() {
    try {
        const customer = new Customer({
            name: "Leila",
            isGold: "true",
            phone: 09833344555
        });

        customer.save();
    } catch (err) { console.log(err) }
}
createCustomer();



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

module.exports = router;