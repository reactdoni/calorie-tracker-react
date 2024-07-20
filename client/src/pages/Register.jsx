import React, {useState} from 'react'
import '../styles/Register.css';
import '@coreui/coreui/dist/css/coreui.min.css'
import {CForm,CFormCheck,CFormInput, CButton} from '@coreui/react';
import SocialsIcon from '../static/socials.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const opts = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }
        fetch('/register', opts)
            .then(resp => {
                if (resp.status === 201) {
                    return resp.json();
                } else {
                    let errorMsg = "There was an error";
                    if (resp.status === 400) {
                        errorMsg = "Invalid input data";
                    } else if (resp.status === 409) {
                        errorMsg = "Username already exists";
                    }
                    alert(errorMsg)
                    return Promise.reject(new Error(errorMsg));
                }
            })
            .then(data => {
                navigate('/');

                toast.success('Successfully registered!', {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
            })
            .catch(error => {
                console.error("There was an error", error);
            })
    }

    return (
        <div className="register">
            <div className="panels">
                <div className="leftPanel">
                    <div className="logo">
                        <Link to="/">
                            <img alt="image" src="https://i.ibb.co/n0gMVZt/7a3ec529632909-55fc107b84b8c-removebg-preview.png" className="img" />
                            <span className="mycompany-text">Calorie Tracker</span>
                        </Link>
                    </div>
                    
                    <h2>Register today!</h2>
                    <span>Welcome, register to get access to the full experience</span>

                    <CForm onSubmit={handleRegister}>
                        <CFormInput
                            type="text"
                            value={username}
                            id="usernameInput"
                            placeholder="Username"
                            size="sm"
                            autoComplete='username'
                            onChange={handleUsernameChange}
                            style={{ width: '75%', margin: '0 auto', marginTop: '20px' }}
                            required={true}
                        />
                        <CFormInput
                            type="password"
                            id="passwordInput"
                            value={password}
                            placeholder="Password"
                            size="sm"
                            autoComplete='current-password'
                            onChange={handlePasswordChange}
                            style={{ width: '75%', margin: '0 auto', marginTop: '20px', marginBottom: '15px' }}
                            required={true}
                        />
                        <CFormCheck id="flexCheckChecked" label="Remember me?" defaultChecked />
                        <CButton type="submit" color="primary" style={{ width: '80%', marginTop: '10px' }}>Register</CButton>

                        <p>Or <Link style={{color: 'rgba(37, 43, 54, 0.95)', fontSize:'16px', textDecoration:'underline'}} to="/login">Login</Link></p>
                    </CForm>
                </div>

                <div className="rightPanel">
                    <img src={SocialsIcon} className="socialsIcon" alt="socials" />
                </div>
            </div>
        </div>
    )
}

export default Register;