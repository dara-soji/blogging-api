const blogModel = require('../models/blog.model')
const userModel = require('../models/user.model')
const logger  = require('../logger');
const moment = require('moment');


const createBlog = (req, res) => {
    const blog = req.body;
    blog.user_id = req.user.id

    try {
        
        blogModel.create(blog)
        .then(blog => {
            res.status(201).json({message: "Blog successfully crested", blog})
        }).catch(err => {
            logger.error(err)
            res.status(500).json(err)
        })
    } catch (err) {
        logger.error(err)
        res.status(404).json(err)
    }

}

const getAllBlogs = (req, res) =>{

    const { query } = req;

    const { 
        created_at, 
        state, 
        order = 'asc', 
        order_by = 'created_at', 
        page = 1, 
        per_page = 20
    } = query;

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }
    blogModel.find()
    .find(findQuery)
    .sort(sortQuery)
    .skip(page)
    .limit(per_page)
    .then(blogs => {
        if (blogs.length === 0 ){
            logger.error("Blogs not available")
        return res.status(404).json({message: "No blogs at the moment"})
        }
        const publishedBlogs = blogs.filter(blog => blog.state === "published")
        if (publishedBlogs.length === 0 ){
            return res.status(404).json({message: "No Published blogs at the moment"})
            }
            logger.info("Blogs successfully found")
        res.status(200).json({message: "Here are the Published blogs", data: publishedBlogs})
    })
    .catch(err => {
        logger.error(err)
        res.status(404).json(err)
    })
}

const getABlog = async (req, res) =>{
    const blog_id = req.params.id
    try {
        const blog = await blogModel.findById(blog_id)
        .catch(err => {
            logger.error(err)
            res.status(404).send(err)
        })

        if(!blog){
            return res.status(404).json({message: "No blog found"})
        }
        
        const user = await userModel.findById(blog.user_id) 
        .catch(err => {
        logger.error(err)
        res.status(404).send(err)
    })  
        let newUser = Object.assign({}, user._doc)

        const { _id, password, created_at, lastUpdateAt, __v, ...safeUser } = newUser;


        let lastRead = blog.timestamp;
        let now = moment();
        let timeRead = now.diff(lastRead, 'minutes');
        blog.reading_time+=timeRead
        blog.read_count++
        blog.timestamp = moment()
        blog.save()
        logger.info("Blog found")
        res.status(200).json({message: "Here is your blog", data: blog, authorInfo: safeUser})

    } catch (err) {
        logger.error(err)
        res.status(404).json(err)
    }
}


const updateBlog = async (req, res) =>{
    const blog = req.body
    const id = req.params.id

    try {
        blog.timestamp = moment() 
        await blogModel.findByIdAndUpdate(id, blog, { new: true })
            .then(newBlog => {
                res.status(200).send(newBlog)
            }).catch(err => {
                logger.error(err)
                res.status(500).send(err)
            })
    } catch (err) {
        logger.error(err)
        res.status(404).json(err)
    }
   
}


const deleteBlog = (req, res) =>{
    const id = req.params.id

    try {
        
        blogModel.findByIdAndRemove(id)
            .then(blog => {
                res.status(200).send({message: `Blog with id: ${id} has been deleted`})
            }).catch(err => {
                logger.error(err)
                res.status(500).send(err)
            })
    } catch (err) {
        logger.error(err)
        res.status(404).json(err)
    }
};

const publishBlog = async (req, res) => {
    const user_id = req.user.id
    const blog_id = req.params.id

    try {
        const blog = await blogModel.findById(blog_id)
        .catch(err => {
            logger.error(err)
            return res.status(404).send(err)
        })
        
        if(!blog){
            return res.status(404).json({message: "Blog does not exist"})
        }


        blog.state = "published"
        blog.save()
        res.status(200).json({message: "Your Blog has been succesfully Published", data: blog})

    } catch (err) {
        logger.error(err)
        res.status(404).json(err)
    }
}


const getMyBlogs = (req, res) => {
    const user_id = req.user.id
    const { query } = req;

    const { 
        created_at, 
        state, 
        order = 'asc', 
        order_by = 'created_at', 
        page = 1, 
        per_page = 20
    } = query;

    const findQuery = {};

    if (created_at) {
        findQuery.created_at = {
            $gt: moment(created_at).startOf('day').toDate(), 
            $lt: moment(created_at).endOf('day').toDate(),
        }
    } 

    if (state) {
        findQuery.state = state;
    }

    const sortQuery = {};

    const sortAttributes = order_by.split(',')

    for (const attribute of sortAttributes) {
        if (order === 'asc' && order_by) {
            sortQuery[attribute] = 1
        }
    
        if (order === 'desc' && order_by) {
            sortQuery[attribute] = -1
        }
    }

    blogModel.find({user_id: user_id})
    .find(findQuery)
    .skip(page)
    .limit(per_page)
    .then(blogs => {
        if (blogs.length === 0 ){
            logger.error("There is no blog ")
            return res.status(404).json({message: "There is no blog "})
        }

        logger.info("Blogs successfully found")
        res.status(200).json({message: "Here are your blogs", data: blogs})
    })
    .catch(err => {
        logger.error(err)
        res.status(404).json(err)
    })
}



module.exports = {
    getAllBlogs,
    createBlog,
    getABlog,
    updateBlog,
    deleteBlog,
    publishBlog,
    getMyBlogs,
}