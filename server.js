const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// TODO find a better way of defining the routes of the application
routes.set(app);

// This has to be below all routes definition
app.use(function (req, res, next) {
    res.status(404).send({
        error: true,
        status: 404,
        message: 'URL not found'
    });
});

app.listen(port, () => {
    console.log("El servidor está inicializado en el puerto " + port);
});