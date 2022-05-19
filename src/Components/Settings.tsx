import React, {useState} from 'react';

export interface ISettingsProps {
    resetBoard:Function;
    updatePlayerNames:Function;
    toggleSettings:Function;
    
}

export default function Settings (props: ISettingsProps) {

    const [p1Name,setp1Name] = useState("");
    const [p2Name,setp2Name] = useState(""); 
    const [gameType,setGameType] = useState("HvH");

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.updatePlayerNames(p1Name,p2Name);
        props.toggleSettings();
        props.resetBoard();
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

    const settingsForm = () => {
        if(gameType === "HvH"){
            return(
                <div className='settingsHvH'>
                    <form onSubmit={handleSubmit}>
                        <div className='settingsInputGrid'>
                            <div>
                                <h4>Human</h4>
                                <input type="text" name='p1Name' onChange={handleChange}/>
                            </div>
                            <div>
                                <h4>Human</h4>
                                <input type="text" name='p2Name' onChange={handleChange}/>
                            </div> 
                            <div>
                                <h4>Board Size</h4>
                                <button>3x3</button>
                                <button>4x4</button>
                                <button>5x5</button>
                            </div>

                                <h4>Win Size</h4>
                                
                        </div>
                        <button id='saveBtn'typeof='submit'>Save</button>
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
