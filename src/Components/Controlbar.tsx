import React, {useState} from 'react';
import { IPlayer } from './Game';
import Settings from './Settings';

export interface IControlbarProps {
    players:IPlayer[];
    boardSize:number[];
    resetBoard:Function;
    resetBoardSize:Function;
    updatePlayerNames:Function;
    updateBoardSize:Function;
}

export default function Controlbar (props: IControlbarProps) {
    
    const [showSettings, setShowSettings] = useState(false);

    const toggleShowSettings = ()=>{
        if(showSettings === true){
            setShowSettings(false)
        }else{
            setShowSettings(true)
        }
    }

    const handleResetBtnClick = () => {
        props.resetBoard();
    }

    const handleSettingsBtnClick = () => {
        toggleShowSettings();
    }

    const settingsMenu = () => {
        if(showSettings === true){
            return <Settings players = {props.players} boardSize={props.boardSize} resetBoardSize={props.resetBoardSize} updatePlayerNames={props.updatePlayerNames} updateBoardSize={props.updateBoardSize} toggleSettings={toggleShowSettings}/>
        }
    } 
    
    return (
        <div>
            <div className='container'>
                <div className='controlbar'>
                    <button className='resetBtn' onClick={handleResetBtnClick}>Reset</button>
                    <button className='settingsBtn' onClick={handleSettingsBtnClick}>▼</button>
                </div>
            </div> 
            <div className='container'>
                {settingsMenu()}
            </div>
        </div>    
    );
}
