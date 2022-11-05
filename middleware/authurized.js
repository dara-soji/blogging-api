const blogModel = require('../models/blog.model')
const logger  = require('../logger');


const authorizedUser = async (req, res, next) => {
    const user_id = req.user.id;
    const blog_id = req.params.id;

    try {
            const blog = await blogModel.findById(blog_id)
                .catch(err => {
                    logger.error(err)
                    return res.status(404).send(err)
                })
                if (!blog){
                    logger.error("Blog not found")
                    return res.status(404).json({message: "Blog not found"})
                    }

                const ownerUser_id = blog.user_id
        
        if(ownerUser_id !== user_id){
            return res.status(401).json({message: "You are unauthurised to carry out this action, blog doesn't belong to you"})
        }
        return next()
    } catch (err) {
        logger.error(err);
        res.status(404).json(err)
    }

}

module.exports = authorizedUser