const
    { Customer, validate } = require("../models/customer"),
    express = require("express"),
    router = express.Router();


router.get("/", async (req, res) => { res.send(await Customer.find()); });



router.get("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);
    res.send(customer);
});



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.message);
    res.send(await new Customer(req.body).save());
});



router.put("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);

    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.message);
    res.send(await customer.set(req.body).save());
});



router.delete("/:id", async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send(`Could not get the Customer on id: ${req.params.id}!`);
    res.send(await customer.remove());
})



module.exports = router;