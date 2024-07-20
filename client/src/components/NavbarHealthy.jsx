import React from 'react'
import '../styles/NavbarHealthy.css';
import SpaIcon from '@mui/icons-material/Spa';
import { Link } from "react-router-dom";

function NavbarHealthy() {
  return (
    <div className="navbarHealthy">
        <div className="navbarWithin">
            <Link to="/"><SpaIcon /> HealthyLife</Link>
            <Link to="/">Home</Link>
            <Link to="/logout">Log Out</Link>
        </div>
    </div>
  )
}

export default NavbarHealthy