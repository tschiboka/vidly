const
    { Customer, validate } = require("../models/customer"),
    express = require("express"),
    router = express.Router();


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
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.message);
        res.send(await new Customer(req.body).save());
    } catch (err) { console.log(`Could not post new Customer\n${req.body}`); }
});



router.put("/:id", async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);

        const { error } = validate(req.body);
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