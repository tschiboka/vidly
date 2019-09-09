const
    express = require("express"),
    Rental = require("../models/rental").Rental;
router = express.Router();



router.get("/", (req, res) => {
    res.send("GET");
});



router.get("/:id", (req, res) => {
    res.send("GET");
});



router.post("/:id", (req, res) => {
    res.send(req.body);
});



module.exports = router;