import React, {useState} from 'react';
import Board from './Board';
import Controlbar from './Controlbar';
import InfoBar from './Infobar';
import Settings from './Settings';

export interface IPlayer{
    id:number;
    name:string;
    symbol: string;
}

export interface IGameProps {

    

}

export default function Game (props: IGameProps) {

    const player1:IPlayer = { id: 1, name: "Player 1", symbol: "X"};
    const player2:IPlayer = { id: 2, name: "Player 2", symbol: "O"};
    const computer:IPlayer = {id:3, name: "computer", symbol: "O"};

    const initalBoardState:number[][] = [[0,0,0],
                                         [0,0,0],
                                         [0,0,0]];
                                                                                     
                                      
    const [playerTurnIndex,setPlayerTurnIndex] = useState(0);
    const [winFlag,setWinFlag] = useState(false);
    const [boardSize,setBoardSize] = useState([3,3]);    //-- [rows,cols]
    const [winSize,setWinSize] = useState(3);
    const [players,setPlayers] = useState([player1,player2]);      
    const [boardState,setBoardState] = useState(initalBoardState); 
    

    const generateBlankBoard = (boardSize:number[]) => {
        const blankBoard:number[][] = [];
        for(let i=0; i<boardSize[0];i++){
            blankBoard[i] = [];
            for(let j=0; j<boardSize[1];j++){
                blankBoard[i][j] = 0;
            }
        }
        return blankBoard;
    }

    const checkWinMoveRow = (row:number,col:number,playerId:number) => {
        let right:number = 0;
        let left:number = 0;

        //Check Row 
        // Count howmany in a row to the right 
        for(let i = 1; i<winSize && col+i < boardSize[1]; i++){
            if(boardState[row][col+i] === playerId){
                right++;
            }else{
                break;
            }
        }
        //Check how many in a row to the left
        for(let i = 1; i<winSize && col-i >= 0 ;i++){
            if(boardState[row][col-i] === playerId){
                left++;
            }else{
                break;
            }
        }
        if(left+right + 1 >= winSize){
            return true
        }

        return false;
    }

    const checkWinMoveCol = (row:number,col:number,playerId:number) =>{
        let up:number = 0;
        let down:number = 0;

        for(let i = 1; i<winSize && row+i < boardSize[0]; i++){
            if(boardState[row+i][col] === playerId){
                up++;
            }else{
                break;
            }
        }

        for(let i = 1; i<winSize && row-i >= 0; i++){
            if(boardState[row-i][col] === playerId){
                down++;
            }else{
                break;
            }
        }

        if(up+down+1 >= winSize){
            return true
        }

        return false

    }

    const checkWinMoveDiagDown = (row:number, col:number, playerId:number) => {
        let up:number = 0;
        let down:number = 0;

        for (let i = 1; i<winSize && row+i<boardSize[0] && col+i<boardSize[1]; i++) {
            if(boardState[row+i][col+i] === playerId){
                down++;
            }else{
                break
            }
        }
        for (let i =1; i<winSize && row-i >= 0 && col-i>= 0; i++){
            if(boardState[row-i][col-i] === playerId){
                up++;
            }else{
                break;
            }
        }

        if(up+down+1 >= winSize){
            return true
        }

        return false
    }

    const checkWinMoveDiagUp = (row:number, col:number, playerId:number) => {
        let up:number = 0;
        let down:number = 0;

        for(let i=1; i<winSize && row+i < boardSize[0] && col-i >= 0; i++){
            if(boardState[row+i][col-i] === playerId){
                down ++;
            }else{
                break;
            }
        }
        for(let i=1; i<winSize && row-i >= 0 && col+i < boardSize[1]; i++){
            if(boardState[row-i][col+i] === playerId){
                up++;
            }else{
                break;
            }
        }

        if(up+down+1 >= winSize){
            return true;
        }

        return false;
    }

    const checkWinMove = (row:number,col:number,playerId:number) => {

        if(checkWinMoveRow(row,col,playerId)){
            return true;
        }
        
        if(checkWinMoveCol(row,col,playerId)){
            return true;
        }

        if(checkWinMoveDiagDown(row,col,playerId)){
            return true;
        }

        if(checkWinMoveDiagUp(row,col,playerId)){
            return true;
        }

        return false
    }
    
    const togglePlayerTurn = () => {
        if(playerTurnIndex === 0){
            setPlayerTurnIndex(1)
        }else{
            setPlayerTurnIndex(0)
        }
    }

    const updatePlayerNames = (p1Name:string,p2Name:string) => {
        const updatedPlayers:IPlayer[] = [...players];
        updatedPlayers[0].name = p1Name;
        updatedPlayers[1].name = p2Name;
        setPlayers(updatedPlayers);
    }

    const resetBoard = () => {
        setWinFlag(false);
        setBoardState(generateBlankBoard(boardSize));
    }

    const makeMove = (row:number,col:number) => {

        if(boardState[row][col] !== 0 || winFlag === true){
            return
        }

        const updatedBoardState:number[][] = [...boardState].map(r => [...r]) //clone Board State

        updatedBoardState[row][col] = players[playerTurnIndex].id;
        if(checkWinMove(row,col,players[playerTurnIndex].id) === true){
            setWinFlag(true);
            setBoardState(updatedBoardState);
            return;
        }

        togglePlayerTurn();
        setBoardState(updatedBoardState);
        return;
    }

    

    
    return (
        <div className='Game'>
            <div className='center'>
                <div className='contain'></div>
                    <Board players={players} boardSize={boardSize} boardState={boardState} makeMove={makeMove}/>
                <div/>
            </div>
            <InfoBar currentPlayer={players[playerTurnIndex]} winFlag={winFlag}/>
            <Controlbar resetBoard={resetBoard} updatePlayerNames={updatePlayerNames}/>
        </div>
    );
}

