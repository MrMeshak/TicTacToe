import * as React from 'react';
import { IPlayer } from './Game';

export interface IInfoBarProps {
    currentPlayer:IPlayer;
    winFlag:boolean;
}

export default function InfoBar (props: IInfoBarProps) {

    const generateMessage = () => {
        if(props.winFlag === true){
            return props.currentPlayer.name + " won!"
        }

        return props.currentPlayer.name + "'s turn";
    }

    return (
        <div className='container'>
            <div className='infobar'>
                <h3>{generateMessage()}</h3>
            </div>
        </div>
        
    );
}
