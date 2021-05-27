import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = () => {
    return (
        <Nav>
                <NavLink 
                    className="btn btn-outline-success m-2" 
                    activeClassName='btn-success text-white' 
                    exact to='/'>
                        Home
                </NavLink>
                <NavLink 
                    className="btn btn-outline-success m-2"
                    activeClassName='btn-success text-white'
                    exact to='/about'>
                        About
                </NavLink>
                <NavLink 
                    className="btn btn-outline-success m-2"
                    activeClassName='btn-success text-white'
                    exact to='/login'>
                        Login
                </NavLink>
        </Nav>
    );
}


const Nav = styled.nav`
    background-color: #2f4f4f;
    display: flex;
    justify-content: right;
`;


export default Navbar;