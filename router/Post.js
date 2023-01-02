const router = require("express").Router()
const postModel = require("../models/Post")

router.post("/", async (req, res) => {
    try {
        const newPost = await postModel.create({ ...req.body })
        return res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json(error + "error post")
    }
})

router.get("/:id", async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        if (post) {
            return res.status(200).json(post)
        } return res.status(404).json("Not Found Post...")
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/", async (req, res) => {
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
})

// like
router.put("/", async (req, res) => {
    try {
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router
