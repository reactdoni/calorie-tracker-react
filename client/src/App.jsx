import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Logs from './pages/Logs';
import Logout from './components/Logout';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("token"));

    return (
        <div>
            <Router>
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home isAuthenticated={isAuthenticated} />} />
                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/" />
                            ) : (
                                <Login setIsAuthenticated={setIsAuthenticated} />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? (
                                <Navigate to="/" />
                            ) : (
                                <Register />
                            )
                        }
                    />
                    <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/logs" element={
                            !isAuthenticated ? (
                                <Navigate to="/login" />
                            ) : (
                                <Logs isAuthenticated={isAuthenticated} />
                            )
                        } />
                </Routes>
            </Router>
        </div>
    );
};

export default App;
