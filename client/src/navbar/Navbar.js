import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { NavLink } from "react-router-dom";

const Navbar = (props) => {
    const getInitials = () => {
        let name = localStorage.getItem('name');
        name = name.split(' ');
        return `${name[0].charAt(0)}${name[1].charAt(0)}`;
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.container}>
                {!props.hidden &&
                    <NavLink to='/feed'>
                        {/* Tree logo */}
                        <img className={styles.logo} src={require('./tree4.png')} alt='Family Tree Logo'
                             draggable='false'/>
                    </NavLink>
                }
            </div>
            {!props.hidden &&
                <div className={styles.initialsContainer}>
                    <h1 className={styles.initials}>{getInitials()}</h1>
                </div>
            }
        </header>
    )
};

export default Navbar;