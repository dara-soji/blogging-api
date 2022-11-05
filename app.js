const express = require('express');
const { model } = require('mongoose');
const bodyParser = require("body-parser");
const blogRouter = require("./routes/blogs.route")
const authRouter = require("./routes/auth.route")

const app = express();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/api/v1/blogs', blogRouter)
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "Welcome to my blog"
        }
    });
});

app.use("*", (req, res)=>{
    res.status(404).send("route not found")
  })

module.exports = app