import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { logout } from '../../hooks/useCheckAuth';
import styled from 'styled-components';
import { useAuthState } from '../../hooks/useAuthState';

const Navbar = () => {
    const [navItems, setNavItems] = useState([{ path: '/login', label: 'Login' }])

    const { isLoggedIn, setIsLoggedIn } = useAuthState();

    useEffect(() => {
        if (isLoggedIn || true) {
            const id = localStorage.getItem('user_id');
            setNavItems([
                { path: '/create', label: 'Add Note' },
                { path: `/profile`, label: 'My Notes' },
                { path: `/`, label: 'Logout' },
                { path: '/login', label: 'Login' }]);
        }
    }, [isLoggedIn])


    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
    }

    return (

        <div style={{ backgroundColor: "#2f4f4f" }} className='d-flex flex-wrap align-items-center w-100 justify-content-center'>
            {/* {toggleMenu && <> */}
            {navItems.map((item, idx) => (
                <NavLink key={`navlink-item-${item.label}-#${idx}`}
                    // onClick={handleToggleMenu}
                    onClick={item.label === 'Logout' ? () => { handleLogout() } : () => { }}
                    style={{ "backgroundColor": "#4f6a6a", "color": "#dadfdf", "padding": "0.375rem 0.5rem" }}
                    className="btn btn-outline-success m-1 shadow-sm"
                    activeStyle={{ "backgroundColor": "#708685", "color": "#dadfdf" }}
                    activeClassName='btn-success text-white font-weight-bold shadow'
                    exact to={item.path}>
                    {item.label}
                </NavLink>
            ))}
            {/* </>} */}
            {/* <button
                        style={{ "fontWeight": "bold", "fontSize": `${toggleMenu ? '2rem' : '1rem'}` }}
                        onClick={() => setToggleMenu(!toggleMenu)} className="col-2 d-flex justify-content-center align-center btn btn-outline-success shadow-lg m-2">
                        <GiHamburgerMenu className='col-lg-6' />
                    </button> */}
        </div>

    );
}


const Nav = styled.nav`
    background-color: #2f4f4f;
`;


export default Navbar;