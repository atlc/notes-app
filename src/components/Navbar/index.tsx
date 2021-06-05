import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { logout, useCheckAuth } from '../../hooks/useCheckAuth';
import { GiHamburgerMenu } from 'react-icons/gi'

const Navbar = () => {
    const checkAuth = useCheckAuth();
    const [navItems, setNavItems] = useState([{ path: '/login', label: 'Login' }])
    const [toggleMenu, setToggleMenu] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());


    useEffect(() => {
        if (isLoggedIn) {
            setNavItems([
                { path: '/create', label: 'Add Note' },
                { path: `/profile`, label: 'My Notes' },
                { path: `/`, label: 'Logout' },
            ]);
        } else {
            setNavItems([{ path: '/login', label: 'Login' }]);
        }
    }, [isLoggedIn])


    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    }

    const handleNavLinkClick = (label: string) => {
        setIsLoggedIn(checkAuth());
        setToggleMenu(false);

        if (label === 'Logout') handleLogout();
    }

    const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setToggleMenu(!toggleMenu);
        setIsLoggedIn(checkAuth());
    }

    return (

        <div style={{ backgroundColor: "#2f4f4f" }} className='d-flex flex-wrap align-items-center w-100 justify-content-center'>
            {toggleMenu && <>
                {navItems.map((item, idx) => (
                    <NavLink key={`navlink-item-${item.label}-#${idx}`}
                        onClick={() => handleNavLinkClick(item.label)}
                        style={{ "backgroundColor": "#4f6a6a", "color": "#dadfdf", "padding": "0.375rem 0.5rem" }}
                        className="btn btn-outline-success m-1 shadow-sm"
                        activeStyle={{ "backgroundColor": "#708685", "color": "#dadfdf" }}
                        activeClassName='btn-success text-white font-weight-bold shadow'
                        exact to={item.path}>
                        {item.label}
                    </NavLink>
                ))}
            </>}
            <button
                style={{ "fontWeight": "bold", "fontSize": `${toggleMenu ? '2rem' : '1rem'}` }}
                onClick={toggle} className="col-2 d-flex justify-content-center align-center btn btn-outline-success shadow-lg m-2">
                <GiHamburgerMenu className='col-lg-6' />
            </button>
        </div>

    );
}

export default Navbar;