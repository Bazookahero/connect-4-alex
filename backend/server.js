const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const MoveModel = require("../src/Models/moveModel")
// const PORT = 3001;
const userRoutes = require("../src/Routes/moveRoute")

var bodyParser = require('body-parser')

const uri = "mongodb+srv://bombsoldier:password321@alex-connect-db.iuafl4l.mongodb.net/connect4?retryWrites=true&w=majority";


app.use(cors())
app.use(bodyParser.json())



//connect to db
mongoose.set('strictQuery', true);
mongoose.connect(uri,{
    family: 4
},
(err) => {
    if(err) console.log(err.reason)
    else console.log("mongodb is connected")
    }
);

//tried routing here instead of a separate file, ignore moverouter file if this route is not commented out
app.post("/create", function(req, res){
    var move = req.body;
    console.log(move)
    var newMove = new MoveModel({
        "x": move.x,
        "y": move.y,
        "player": move.player
    });
    console.log(newMove)
    newMove.save((err) => {
        if (err) {
          console.error(err);
        }
    })
    res.json(move)
})





// app.use("/", userRoutes)

app.listen(3001, function(){
    console.log(`express server is running on port 3001`)
})
