import React, { useState, useContext } from 'react';
import styles from './Navbar.module.css';
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from '../context/auth-context';

const Navbar = (props) => {

    const [initModal, setInitModal] = useState(false);
    const ctx = useContext(AuthContext);
    const history = useHistory();

    const getInitials = () => {
        let name = localStorage.getItem('name');
        name = name.split(' ');
        return `${name[0].charAt(0)}${name[1].charAt(0)}`;
    };

    const logout = () => {
        ctx.logout();
        history.push('/login');
    };

    return (
        <header className={styles.headerContainer}>
            <div className={styles.container}>

                {/* Hide logo if modal is open */}
                {!props.hidden &&
                    <NavLink to='/feed'>
                        {/* Tree logo */}
                        <img className={styles.logo} src={require('./tree4.png')} alt='Family Tree Logo'
                            draggable='false' />
                    </NavLink>}
            </div>

            {/* Hide initials if modal is open */}
            {!props.hidden &&
                <div className={styles.initialsContainer} onClick={() => setInitModal(true ? !initModal : false)}>
                    <h1 className={styles.initials}>{getInitials()}</h1>
                </div>}
                {initModal && <div onMouseLeave={() => setInitModal(false)} className={styles.listContainer}><ul className={styles.list}>
                <li onClick={logout}>Logout</li>
            </ul>
            </div>}
        </header>
    )
};

export default Navbar;