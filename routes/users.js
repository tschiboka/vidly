const
    express = require("express"),
    router = express.Router(),
    bcrypt = require("bcrypt"),
    _ = require("lodash"),
    { User, validate } = require("../models/user");



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send("User is invalid: " + error.details[0].message);

    // encryption here
    const user = new User(req.body);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res
        .header("x-auth-token", user.generateAuthToken())
        .send(_.pick(user, ["name", "email"])); // never send password back to user
});



module.exports = router;