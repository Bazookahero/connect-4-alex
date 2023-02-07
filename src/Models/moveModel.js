const mongoose = require("mongoose")

var moveSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    player: String
});

const MoveModel = mongoose.model("moves", moveSchema)

module.exports = MoveModel;