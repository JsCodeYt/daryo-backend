const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    cat: {
        type: String,
        required: false,
    }
}, { timestamps: true })

module.exports = mongoose.model("Posts", Schema)