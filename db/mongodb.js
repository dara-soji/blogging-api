const mongoose = require("mongoose")
require("dotenv").config()

const logger = require("../logger")

const MONGODB_URL = process.env.MONGODB_URL

function connectToMongoDb() {
    mongoose.connect(MONGODB_URL)

    mongoose.connection.on("connected", () => {
        logger.info("Your Mongodb has been connected successfully")
    })

    mongoose.connection.on("error", (err) => {
        logger.error(err)
    })
}

module.exports = { connectToMongoDb }