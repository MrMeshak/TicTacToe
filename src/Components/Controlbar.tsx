import React, {useState} from 'react';
import Settings from './Settings';
export interface IControlbarProps {
    resetBoard:Function;
    updatePlayerNames:Function;
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
            return <Settings resetBoard={props.resetBoard} updatePlayerNames={props.updatePlayerNames} toggleSettings={toggleShowSettings}/>
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
