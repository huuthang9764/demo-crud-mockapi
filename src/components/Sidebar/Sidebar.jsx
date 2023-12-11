import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'
import Logo from '../../logo.svg'

const Sidebar = () => {
    return (
        <nav className='sidebar-wrapper'>
            <div className='logo d-flex '>
                    <img src={Logo} alt='logo'/>
                    <p className='simple-text'>ITF Panda</p>
            </div>
            <ul>
                <li>
                    <NavLink to="/" className='nav-link'>Home</NavLink>
                </li>
                <li>
                    <NavLink to="/user" className='nav-link' >User</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;