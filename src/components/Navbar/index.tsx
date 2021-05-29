import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import styled from 'styled-components';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/login', label: 'Login' }
    ];

    const handleToggleMenu = () => {

        setToggleMenu(!toggleMenu)
    }

    return (
        <div className="container-fluid shadow-sm">
            <Nav className="row">
                <div className='col-9 d-flex flex-wrap align-items-center justify-content-center'>
                    {toggleMenu && <>
                        {navItems.map((item, idx) => (
                            <NavLink key={`navlink-item-${item.label}-#${idx}`}
                                onClick={handleToggleMenu}
                                style={{ "backgroundColor": "#4f6a6a", "color": "#dadfdf" }}
                                className="btn col-xs-12 col-sm-9 col-md-6 col-lg-3 btn-outline-success m-2 shadow-sm"
                                activeStyle={{ "backgroundColor": "#708685", "color": "#dadfdf" }}
                                activeClassName='btn-success text-white font-weight-bold shadow'
                                exact to={`${item.path}`}>
                                {item.label}
                            </NavLink>
                        ))}
                    </>}
                </div>
                <button
                    style={{ "fontWeight": "bold", "fontSize": `${toggleMenu ? '2rem' : '1rem'}` }}
                    onClick={() => setToggleMenu(!toggleMenu)} className="col-2 d-flex justify-content-center align-center btn btn-outline-success shadow-lg m-2">
                    <GiHamburgerMenu className='col-lg-6' />
                </button>
            </Nav>
        </div>
    );
}


const Nav = styled.nav`
    background-color: #2f4f4f;
`;


export default Navbar;