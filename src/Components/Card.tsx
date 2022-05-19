import * as React from 'react';
import { IPlayer } from './Game';

export interface ICardProps {
    row:number;
    col:number;
    symbol:string;

    makeMove:Function;
}

export default function Card (props: ICardProps) {
    const handleClick = () => {
        props.makeMove(props.row,props.col)
    }

    return (
        <div className='card' onClick={handleClick}>
            <span className='symbol'>
                {props.symbol}
            </span>
        </div>
    );
}
