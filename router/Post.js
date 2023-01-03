const router = require("express").Router()
const { create_post, get_post, like_post, view_post, sort_post, add_comment } = require("../controllers/Post")


// create one post
router.post("/", create_post)


// get one post 
router.get("/:id", get_post)

// get all post or cat post
router.get("/", sort_post)

// like
router.put("/:id", like_post)

// viewers
router.put("/view/:id", view_post)

// comment 
router.put("/comment/:id", add_comment)

module.exports = router
