const express = require("express")
const router = express.Router()
const Move = require("../Models/MoveModel")
var bodyParser = require('body-parser')

router.route("/create").post((req, res) => {
    try{
    const x = req.body.x;
    const y = req.body.y;
    const player = req.body.player;
    const newMove = new Move({
        x,
        y,
        player
    });
    console.log("ROUTER ROUTE")
    console.log(newMove)
    newMove.save();
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});


module.exports = router;