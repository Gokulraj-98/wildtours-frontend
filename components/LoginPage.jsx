import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAppDispatch } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { message } from "antd";
import '../css/Login.css'

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('https://wildtours-backend.onrender.com/auth/login', { email, password })
            .then(result => {
                if (result.status === 200) {
                    console.log(result.status);
                    message.success("Login Successful")
                    localStorage.setItem("user_data", JSON.stringify(result.data))
                    navigate('/tour');
                }
            })
            .catch(err => {
                if (err.response && err.response.status === 401) {
                    setError('Incorrect email or password');
                } else {
                    setError('Incorrect email or password');
                }
            });
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    {/* Left Blank Side */}
                    <div className="col-lg-3"></div>

                    {/* Right Side Form */}
                    <div className="col-lg-6 d-flex align-items-center justify-content-center right-side">
                        <div className="form-2-wrapper">
                            <div className="logo text-center">
                                <h2>Logo</h2>
                            </div>
                            <h2 className="text-center mb-4">Login to Your Account</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3 form-box">
                                    <input type="email" className="form-control" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder="Enter Your Email" required />
                                </div>
                                <div className="mb-3 form-box">
                                    <input type="password" className="form-control" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter Your Password" required />
                                </div>
                                <div class="mb-3">
                                    <div class="form-check">
                                        <input type="checkbox" class="form-check-input" id="rememberMe" />
                                        <label class="form-check-label" for="rememberMe">Remember me</label>
                                        <Link to="/reset" href="forget-3.html" class="text-decoration-none float-end">Forget Password</Link>
                                    </div>

                                </div>
                                <button type="submit" className="btn btn-outline-secondary login-btn w-100 mb-3">Login</button>
                                <div className="social-login mb-3 type--A">
                                    <h5 className="text-center mb-3">Social Login</h5>
                                    <button className="btn btn-outline-secondary mb-3"><i className="fa-brands fa-google text-danger"></i> Sign With Google</button>
                                    <button className="btn btn-outline-secondary mb-3"><i className="fa-brands fa-facebook-f text-primary"></i> Sign With Facebook</button>
                                </div>
                            </form>

                            {/* Register Link */}
                            <p className="text-center register-test mt-3">Don't have an account? <Link to="/register" className="text-decoration-none">Register here</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
};

export default LoginPage;
