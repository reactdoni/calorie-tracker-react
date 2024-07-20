import React, { useState } from 'react';
import '../styles/Navbar.css';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Link } from "react-router-dom";

function Navbar({isAuthenticated}) {
  return (
    <div className="navbar">
        <RestaurantIcon style={{ fontSize: 50, marginLeft: "25px" }}/>
        <Link style={{color: 'white', textDecoration: 'none'}} to="/logs">My Logs</Link>
        {isAuthenticated ? <Link style={{color: 'white', textDecoration: 'none', marginRight: "25px"}} to="/logout">Log out</Link> : <Link style={{color: 'white', textDecoration: 'none', marginRight: "25px"}} to="/login">Log In</Link>}
        {isAuthenticated ? '' : <Link style={{color: 'white', textDecoration: 'none', marginRight: "25px"}} to="/register">Register</Link>}
    </div>
  )
}

export default Navbar;
