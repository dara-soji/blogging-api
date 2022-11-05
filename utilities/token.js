const jwt = require('jsonwebtoken');
const { logger } = require('../logger');
require('dotenv').config()

const JWT_SECRET_KEY  = process.env.JWT_SECRET_KEY;

const generate = (id) => jwt.sign({ id }, JWT_SECRET_KEY, { expiresIn: '1h'});

const decode = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET_KEY)
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    generate,
    decode
}