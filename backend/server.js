const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const MoveModel = require("../src/Models/moveModel")
// const PORT = 3001;
// const userRoutes = require("../src/Routes/moveRoute")

var bodyParser = require('body-parser')

const uri = "mongodb+srv://bombsoldier:<password>@cluster0.ld5n3bl.mongodb.net/connect?retryWrites=true&w=majority";
const mongo_uri = "mongodb+srv://bombsoldier:<password>@cluster0.ld5n3bl.mongodb.net/connect?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, monitorCommands: true });
// client.connect(err => {
//   const collection = client.db("connect").collection("moves");


//     if(err) console.log(err.reason)
//     else console.log("mongodb connected successfully")

 
  
// });
async function start(){
try{await mongoose.connect(mongo_uri, {}, 6000000)
.then(() => console.log("database connected"))
.catch(err => console.log(err))
}catch(err){
    console.log(err)
}
}
start()
app.get("/getMoves", (req, res) => {
    MoveModel.find({}, (err, result) => {
        if(err){
            res.json(err)
        } else{
            res.json(result)
        }
    })
})
app.post("/create", async (req, res) => {
    const move = req.body;
    const newMove = new MoveModel(move);
    console.log(newMove)
    await newMove.save();

    res.json(move)
})
// mongoose.set('strictQuery', true);
// mongoose.connect(uri,
// {
//     wtimeoutMS: 0,
//     ssl: true,
//     sslValidate: true,
//     dbName: 'connect',
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     family: 4,
//     keepAlive: true,
//     keepAliveInitialDelay: 300000,
// },
// (err) => {
//     if(err) console.log(err.reason)
//     else console.log("mongodb is connected")
//     }
// );




// app.use("/", userRoutes)

app.listen(3001, function(){
    console.log(`express server is running on port 3001`)
})
