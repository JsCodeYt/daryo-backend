const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const postRouter = require("./router/Post")
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name + path.extname(file.originalname))
    }
})

const upload = multer({ storage })


const app = express()
dotenv.config()


// middlewares
app.use(cors({ origin: "*" }))
app.use(express.json())


// routes
app.use("/api/post", postRouter)
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.send("file uploaded")
})


app.listen(process.env.PORT, async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("mongo active")
        }).catch(() => {
            console.log("mongo error !")
        })
        console.log("server is running")
    } catch (err) {
        console.log(err)
    }
})