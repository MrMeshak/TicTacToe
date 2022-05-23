import React, {useState} from 'react';
import { IPlayer } from './Game';

export interface ISettingsProps {
    players:IPlayer[];
    boardSize:number[];
    resetBoardSize:Function;
    updatePlayerNames:Function;
    updateBoardSize:Function;
    toggleSettings:Function;
    
}

export default function Settings (props: ISettingsProps) {

    const [p1Name,setp1Name] = useState(props.players[0].name);
    const [p2Name,setp2Name] = useState(props.players[1].name); 
    const [gameType,setGameType] = useState("HvH");
    const [boardSize,setBoardSize] = useState(props.boardSize);

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updatePlayerNames(p1Name,p2Name);
        props.toggleSettings();
        props.resetBoardSize(boardSize);
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.name === "p1Name"){
            setp1Name(e.currentTarget.value)
        }

        if(e.currentTarget.name === "p2Name"){
            setp2Name(e.currentTarget.value);
        }
    }

    const handleHvHBtnClick = () => {
        setGameType("HvH");
    }

    const handleBoardSizeClick = (e:React.MouseEvent<HTMLButtonElement>) => {
        if(e.currentTarget.name === "3x3"){
            setBoardSize([3,3]);
        }else if(e.currentTarget.name === "4x4"){
            setBoardSize([4,4])
        }else if(e.currentTarget.name === "5x5"){
            setBoardSize([5,5])
        }
    }

    const gameTypeButtons = () =>{
        let HvHbtnClassList:string = "whiteBtn";
        let HvCbtnClassList:string = "whiteBtn";
        if(gameType === "HvH"){
            HvHbtnClassList = "blackBtn"
        }
        if(gameType === "HvC"){
            HvCbtnClassList = "blackBtn"
        }

        return (
            <div>
                <button className={HvHbtnClassList}>Human VS Human</button>
                <button className={HvCbtnClassList}>Human VS Computer</button>
            </div>
        )

    }

    const boardSizeButtons = () => {
        let button3x3ClassList = "whiteBtn";
        let button4x4ClassList = "whiteBtn";
        
        if(boardSize[0] === 3){
            button3x3ClassList = "blackBtn"
        }
        if(boardSize[0] === 4){
            button4x4ClassList = "blackBtn"
        }
        return(
            <div>
                <h4>Board Size</h4>
                <button type='button' className={button3x3ClassList} onClick={handleBoardSizeClick} name="3x3"  >3x3</button>
                <button type='button' className={button4x4ClassList} onClick={handleBoardSizeClick} name="4x4"  >4x4</button>
            </div>
        )
    }

    const settingsForm = () => {
        if(gameType === "HvH"){
            return(
                <div className='settingsHvH'>
                    <form onSubmit={handleSubmit}>
                        <div className='settingsInputGrid'>
                            <div>
                                <h4>Human</h4>
                                <input type="text" name='p1Name' placeholder={props.players[0].name} onChange={handleChange}/>
                            </div>
                            <div>
                                <h4>Human</h4>
                                <input type="text" name='p2Name' placeholder={props.players[1].name} onChange={handleChange}/>
                            </div> 
                            {boardSizeButtons()}
                            <div>
                                  <h4>Win Size</h4>
                            </div>   
                        </div>
                        <button id='saveBtn' typeof='submit'>Save</button>
                    </form>
                </div>
            )
        }
    }



    return (
        <div className='settings'>
                {gameTypeButtons()}
                {settingsForm()}   
        </div>
    );
}
