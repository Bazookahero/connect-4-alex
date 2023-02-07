import './Game.css'
import React, { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios';


const API_URL = "http://localhost:3001/create"
const GET_ALL_URL = "http://localhost:3001/getAll"
const RESET_URL = "http://localhost:3001/reset"

const Game = () => {
const [player, setPlayer] = useState('red')
const [moves, setMoves] = useState([])
const [winner, setWinner] = useState('')
const [winMoves, setWinMoves] = useState([])
const rows = 6;
const columns = 7;


useEffect(() => {
    setInterval(() => {
        axios.get(GET_ALL_URL)
        .then((response) => {setMoves(response.data || null)})
        }, 5000);
},[])

const getPiece = (x, y) => {
    const list = moves.filter((item) => {
        return (item.x === x && item.y === y);
    });
    return list[0];
}





const resetBoard = () => {
    setMoves([])
    setWinner('')
    setWinMoves([])
    setPlayer('red')
    axios.post(RESET_URL)
}

const getWinningMovesDiagonal = (xPosition, yPosition, xVelocity, yVelocity) => {
    let winningMoves = [{x: xPosition, y: yPosition}]
    for(let delta = 1; delta <= 3; delta++){
        const checkX = xPosition + xVelocity * delta;
        const checkY = yPosition + yVelocity * delta;
        const checkPiece = getPiece(checkX, checkY)
        if(checkPiece && checkPiece.player === player)
        {
            winningMoves.push({x: checkX, y: checkY})
        } else{
            break;
        }
    }
    for(let delta = -1; delta >= -3; delta--){
        const checkX = xPosition + xVelocity * delta;
        const checkY = yPosition + yVelocity * delta;
        const checkPiece = getPiece(checkX, checkY)
        if(checkPiece && checkPiece.player === player)
        {
            winningMoves.push({x: checkX, y: checkY})
        } else{
            break;
        }
    }

    return winningMoves;
}

const checkForWin = (x, y) => {
    const velocities = [{x:1,y:0}, {x:0,y:1}, {x:-1, y:1}, {x:1,y:1}]
    for(let i = 0; i<velocities.length;i++){
        const element = velocities[i]
        const winningMoves = getWinningMovesDiagonal(x,y,element.x,element.y)
        if(winningMoves.length > 3){
            setWinner(player)
            setWinMoves(winningMoves)
        }
    }
}

const AddMove = (x, y) => {
    const nextPlayer = player === 'red' ? 'yellow' : 'red';
    let avaliableYposition = null;
    moves.concat([])
    for(let position = rows -1; position >= 0; position--){
        if(!getPiece(x, position)){
            avaliableYposition = position;
            break;
        }
    }
    if(avaliableYposition !== null){
        const move = moves.concat({x: x,y: avaliableYposition,player: player})
        let newMove = {
            "x": parseInt(x),
            "y": avaliableYposition,
            "player": player
        }
        setMoves(move)
        console.log(move)
        console.log(newMove)
        
        //post request to "/create" -> db
        axios.post(API_URL, newMove)
        .then((response) => console.log(response))
        .catch((e) => {console.log(JSON.stringify(e))})

        checkForWin(x, avaliableYposition, player)
        setPlayer(nextPlayer)
        
    }

      
}

const CreateBoard = () => {


    let rowViews = [];
    for(let row = 0; row < rows; row++){
        const columnViews = [];
        for(let column = 0; column < columns; column++){
            const piece = getPiece(column, row)
            columnViews.push(
            <div onClick={() => {AddMove(column, row)}} style={{cursor: 'pointer', width: '6vw', height: '6vw', backgroundColor: '#00a8ff', display: 'flex', padding: 5}}>
                <div style={{borderRadius: '50%', backgroundColor: 'white', flex: 1, display: 'flex'}}>
                    {piece ? <div style={{backgroundColor: piece.player, flex: 1, borderRadius: '50%', border: '1px solid black'}} /> : undefined}
                </div>
            </div>
            );
        }
        rowViews.push(
            <div style={{display: 'flex', flexDirection: 'row'}}>{columnViews}</div>
        )
    }


    return(
        <div>
        <div style={{backgroundColor: 'blue', display: 'flex', flexDirection: 'column'}}>
            {winner && <div onClick={resetBoard} style={{position: 'absolute',left:0,right:0,bottom:0,top:0, backgroundColor: 'rgba(0,0,0,.5)',
            zIndex: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontSize: '5vw'}}>{winner.toUpperCase()} WINS</div>}
            {rowViews}
        </div>
        <button onClick={resetBoard} className='me-4 btn btn-danger btn-lg btn-block'>RESET</button>
        <h3 style={{color: player, float: 'right'}}>{player}'s turn</h3>
        </div>
    );
}

    return (
        <div style={{height: '100%', padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
                <CreateBoard />
            </div>
        </div>
    );
}

export default Game;