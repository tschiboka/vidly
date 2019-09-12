
const
    Joi = require("joi"),
    port = process.env.PORT || 3000,
    express = require("express"),
    app = express();



require("./startup/logging")(); // load first in case of error we can already log them
require("./startup/routes")(app);
require("./startup/database")();
require("./startup/config")();











app.listen(port, () => console.log(`Listening on port ${port}...`));



Joi.objectId = require("joi-objectid")(Joi);



