const userModel = require('../models/user.model')
const logger  = require('../logger');
const moment = require('moment');
const { hash, compare } = require('../utilities/password')
const { generate: generateToken, decode } = require('../utilities/token')

const signup = async (req, res) => {
    const user = req.body;
    try{


        user.password = await hash(user.password)

        await userModel.create(user)
            .then((data)=>{

                const token = generateToken(data._id);
                res.status(201).send({
                    status: "User successfully created",
                    data: {
                        token,
                        data
                    }
                
        })
            }).catch((err)=>{
                if(err.code === 11000){

                    res.status(400).send({
                        message: "User already exists",
                    })
                }else{
                    logger.info(err)
                    res.status(400).send({
                        message: err.message,
                    })
                }
            })
        
    }catch(err){
        logger.info(err)
    }
}

const login = async (req, res) => {
    const body = req.body

    try{
        const user = await userModel.findOne({email: body.email})
        .catch((err) =>{
            logger.error(err)
            return res.status(400).send(err)
        })

        if(!user){
            return res.status(404).send("user not found")
        }

        const isPasswordMatch =  compare(body.password, user.password)
        console.log('reached password')
        if(!isPasswordMatch){
            return res.status(403).send("Incorrect paswword")
        }

        const token = await generateToken(user._id)

          
          user.token = token;
          let authUser = Object.assign({}, user._doc)

          authUser.token = token;

          
        res.status(200).send({message: "successfully signed in", data: authUser})
    }catch(err){
        logger.info(err)
    }
}

module.exports = {
    signup,
    login
}