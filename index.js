const app = require('./app');
require('dotenv').config()
const { connectToMongoDb } = require('./db/mongodb')

const logger  = require('./logger');

const PORT = process.env.PORT || 3030;

//Connecting to MongoDB
// connectToMongoDb()

// logger.error(new Error('e don break'))

app.listen(PORT, () => {
    logger.info(`Running on PORT ${PORT}`);
    // console.log(`Running on PORT ${PORT}`);
});
