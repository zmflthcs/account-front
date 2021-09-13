import React from 'react'
import {NavLink} from 'react-router-dom';
import { RiMoneyDollarCircleFill } from "react-icons/ri";
const NavBar = () => {
    
    const nav = []


    return(
        <div className="sidebar">
            <div className="homepage-logo">
                <RiMoneyDollarCircleFill/>
                <span>Homepage</span>
            </div>
            <ul className="nav">
                <li><NavLink to='/'>가계부</NavLink></li>
                <li><NavLink to='/categories'>카테고리</NavLink></li>
                <li>stats</li>
                <li>news</li>
            </ul>
        </div>
    )
}

export default NavBar;