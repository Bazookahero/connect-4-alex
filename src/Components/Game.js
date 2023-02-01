import './Game.css'
import React from 'react';
import { useState } from 'react';

const Game = () => {
const [player, setPlayer] = useState('red')
const [moves, setMoves] = useState([])

const getPiece = (x, y) => {
    const list = moves.filter((item) => {
        return (item.x === x && item.y === y);
    });
    return list[0];
}

const resetBoard = () => {
    setMoves([])
}

const addMove = (x, y) => {
    const nextPlayer = player === 'red' ? 'yellow' : 'red';
    const move = moves.concat({x, y, player})
    setMoves(move)
    setPlayer(nextPlayer)
}

const CreateBoard = () => {
    const rows = 6;
    const columns = 7;

    let rowViews = [];
    for(let row = 0; row < rows; row++){
        const columnViews = [];
        for(let column = 0; column < columns; column++){
            const piece = getPiece(column, row)
            columnViews.push(
            <div onClick={() => {addMove(column, row)}} style={{cursor: 'pointer', width: '8vw', height: '8vw', backgroundColor: '#00a8ff', display: 'flex', padding: 5}}>
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
            {rowViews}
        </div>
        <button onClick={resetBoard}>reset Game</button>
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