const router = require("express").Router()
const { admin } = require("../middleware/Admin")
const { register, login, jwt_get } = require("../controllers/User")


// register user
router.post("/register", register)

// login user
router.post("/login", admin, login)

//get user data with jsonwebtoken 
router.get("/", jwt_get)

module.exports = router