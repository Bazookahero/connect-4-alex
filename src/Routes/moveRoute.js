const express = require("express")
const router = express.Router()
const Move = require("../Models/moveModel")
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
    console.log(newMove)
    newMove.save();
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

// router.route("/moves").get((req, res) => {
//     Move.find()
//         .then(foundMoves => res.json(foundMoves))
// })

module.exports = router;