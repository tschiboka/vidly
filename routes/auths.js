const
    express = require("express"),
    router = express.Router(),
    { User } = require("../models/user"),
    Joi = require("joi"),
    bcrypt = require("bcrypt");



router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send("Invalid post request body: " + error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid e-mail or password!");

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send("Invalid e-mail or password!1");

        res.send(user.generateAuthToken());
    } catch (err) { res.send("Authentication failed with Error.\n" + err) }
});



validate = user => Joi.validate(user, {
    email: Joi.string().required().email(),
    password: Joi.string().min(8).max(50).required()
});



module.exports = router;