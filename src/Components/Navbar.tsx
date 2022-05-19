import * as React from 'react';

export interface INavbarProps {

}

export default function Navbar (props: INavbarProps) {
    return (
        <div className='navbar'>
           <h1>
                <a href="">Noughts {"&"} Crosses</a>
            </h1>
        </div>
    );
}
