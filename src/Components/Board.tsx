import * as React from 'react';
import Card from './Card';
import { IPlayer } from './Game';

export interface IBoardProps {
    players:IPlayer[];
    boardSize:number [];
    boardState: number[][];

    makeMove:Function;


}



export default function Board (props: IBoardProps) {
    
    const generateBoardArray = (boardSize:number[],boardState:number[][]) => {
        let boardArray:number[] = []; 
        for(let i=0; i<boardSize[0];i++){
            boardArray = boardArray.concat(boardState[i])
        }
        return boardArray;
    }

    const getSymbol = (playerId:number, players:IPlayer[]) => {
        for(let i=0 ; i<players.length;i++){
            if(players[i].id === playerId){
                return players[i].symbol
            }
        }
        return "";
    }

    const boardStyle = {
        gridTemplateColumns: `repeat(${props.boardSize[0]},1fr)`,
        gridTemplateRows: `repeat(${props.boardSize[1]},1fr)`
    }

    
    const boardArray:number[] = generateBoardArray(props.boardSize,props.boardState)

    return (
        <div className='board' style={boardStyle}>
            {boardArray.map((id,index)=>{
                const row = Math.floor(index/props.boardSize[1])
                const col = index%props.boardSize[1]
                const symbol = getSymbol(id,props.players)
                return <Card row={row} col={col} symbol={symbol} makeMove={props.makeMove} key={index} />
            })}
        </div>     
        );
    }
