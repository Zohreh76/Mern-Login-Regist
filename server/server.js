const express = require ('express');
const session = require ('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.use(session({
    secret: "Super duper secret",
    resave: false,
    saveUninitialized: false,
}))

require('./config/mongoose');
require('./config/routes.js')(app);

app.listen(8000, () => console.log ('Server up and running on port 8000'));
