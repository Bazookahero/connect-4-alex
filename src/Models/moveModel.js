const mongoose = require("mongoose")

const moveSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true
    },
    y: {
        type: Number,
        required: true
    },
    player: {
        type: String,
        required: true
    }
})

const MoveModel = mongoose.model("Move", moveSchema)

module.exports = MoveModel;