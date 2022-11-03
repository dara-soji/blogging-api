const express = require('express');
const { model } = require('mongoose');

const app = express();

app.use(express.json());

//Connecting to MongoDB
// connectToMongoDb()

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

module.exports = app