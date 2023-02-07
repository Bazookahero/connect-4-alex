const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")

// const PORT = 3001;
const userRoutes = require("../src/Routes/MoveRoute")

var bodyParser = require('body-parser')

const uri = "mongodb+srv://bombsoldier:password321@alex-connect-db.iuafl4l.mongodb.net/connect4?retryWrites=true&w=majority";


app.use(cors())
app.use(bodyParser.json())

const moveSchema = new mongoose.Schema({
    x: Number,
    y: Number,
    player: String
})

const Move = mongoose.model('Move', moveSchema)

//connect to db
async function StartUp(){
    try{
mongoose.set('strictQuery', true);
await mongoose.connect(uri,{
    family: 4
},
(err) => {
    if(err) console.log(err.reason)
    else console.log("mongodb is connected")
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
})
}catch (err) 
{console.log(err)}}
StartUp()



//tried routing here instead of a separate file, ignore moverouter file if this route is not commented out
app.post("/create", async function(req, res){
    var {x, y, player} = req.body;
    console.log(x, y, player)
    var newMove = new Move({
        x: x,
        y: y,
        player: player
    });
    console.log(newMove)
    await newMove.save((err) => {
        if (err) {
          console.error(err);
        }
    })
    res.json(x, y, player)
})

app.get("/getAll", async function(req, res){
    try{
    const filter = {}
    const data = await Move.find()
    res.send(data)
    }
    catch (err) {console.log(err)}
})

app.post("/reset", async function(req, res){
    try{
    await Move.deleteMany()
    }catch(err){console.log(err)}
})




// app.use("/", userRoutes)

app.listen(3001, function(){
    console.log(`express server is running on port 3001`)
})
