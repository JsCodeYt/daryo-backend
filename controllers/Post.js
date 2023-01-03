const postModel = require("../models/Post")

const create_post = async (req, res) => {
    try {
        const newPost = await postModel.create({ ...req.body })
        return res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error + "error post")
    }
}

const get_post = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (post) {
            return res.status(200).json(post)
        } return res.status(404).json("Not Found Post...")
    } catch (error) {
        res.status(500).json(error)
    }
}

const sort_post = async (req, res) => {
    try {
        const catorie = req.query.cat
        if (catorie) {
            const posts = await postModel.find({ cat: catorie })
            return res.status(200).json(posts)
        } else {
            const posts = await postModel.find().limit(req.query.page || 10)
            return res.status(200).json(posts)
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

const like_post = async (req, res) => {
    try {
        const updatePost = await postModel.findById(req.params.id)
        const updateLike = await postModel.findByIdAndUpdate(req.params.id, {
            like: updatePost.like + 1
        }, { new: true })
        res.status(200).json(updateLike)
    } catch (error) {
        res.status(500).json(error)
    }
}

const view_post = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        const updateViewers = await postModel.findByIdAndUpdate(req.params.id, {
            views: post.views + 1
        }, { new: true })
        res.status(200).json(updateViewers)
    } catch (error) {
        res.status(500).json(error)
    }
}

const add_comment = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        const updateComment = await postModel.findByIdAndUpdate(post._id, {
            comments: [
                { author: req.body.author, comment: req.body.comment },
                ...post.comments
            ]
        }, { new: true })

        res.status(200).json(updateComment)
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    create_post,
    get_post,
    sort_post,
    like_post,
    view_post,
    add_comment
}