const
    express = require("express"),
    router = express.Router(),
    { User, validate } = require("../models/user");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send("User is invalid: " + error.details[0].message);

        res.send(await new User(req.body).save());
    } catch (err) { res.status(400).send("Could not post new user!" + err) }
});

module.exports = router;