const jwt = require("jsonwebtoken")

const admin = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username && !password) {
            return res.status(400).json({
                status: "bad",
                message: "Iltimos hamma qatorlarni to'ldiring !"
            })
        }
        if (username === process.env.ADMIN_USERNAME && password == process.env.ADMIN_PASSWORD) {
            const authorObject = {
                username: "Author",
                password: "author",
                isAdmin: true,
            }
            const authorToken = await jwt.sign({ ...authorObject }, "secret")
            res.status(200).json({
                user: {
                isAdmin: true
                },
                token:authorToken,
            })
        } {
        }
        next()
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    admin
}
