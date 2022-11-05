require("dotenv").config()
const { decode: decodeToken } = require('../utilities/token')


// const tokenKey = process.env.TOKEN_KEY

const authenticateUser = (req, res, next) =>{
    const authHeader = req.headers["authorization"]
  const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(403).send("Token not found, Athentication failled")
    }

    try{
        const decoded = decodeToken(token)
        req.user = decoded
        console.log(decoded)
    }catch(err){
        return res.status(403).send("Invalid token")
    }
    return next()
}

module.exports = authenticateUser;