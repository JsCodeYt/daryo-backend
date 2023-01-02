const router = require("express").Router()
const bcrypt = require("bcrypt")
const user = require("../models/User")
const jwt = require("jsonwebtoken")
const { admin } = require("../middleware/Admin")

router.post("/register", async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10)
        const token = await jwt.sign({ ...req.body }, "secret")
        const newUser = new user({
            ...req.body,
            password,
        })
        const saveUser = await newUser.save()
        res.status(201).json({
            user: {
                ...saveUser._doc,
            },
            token: token
        })
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login", admin, async (req, res) => {
    try {
        const { username, password } = req.body
        const find_user = await user.findOne({ username })
        if (find_user) {
            const validate = await bcrypt.compare(password, find_user.password)
            if (validate) {
                const token = await jwt.sign({ ...find_user }, "secret")
                return res.status(200).json({
                    user: {
                        ...find_user._doc,
                        token: token
                    }
                })
            } return
        } else return
    } catch (error) {
        res.status(500).json(error)
        // 1672676409
    }
})

router.get("/", async (req, res) => {
    try {
        const auth_token = req.headers.authorization
        if (auth_token) {
            const jwt_user = await jwt.verify(auth_token, "secret")
            console.log(jwt_user)
            return res.status(200).json(jwt_user._doc || jwt_user)
        } else return res.status(404).json({ message: "Not Found !" })
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router