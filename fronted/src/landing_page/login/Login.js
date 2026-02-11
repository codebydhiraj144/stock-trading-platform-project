import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
    const [values, setValues] = useState({ username: "", password: "" });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3002/login", values);

            if (res.data.success) {
                // Cross-port redirect: Passing user data to the Dashboard on Port 3001
                const userData = encodeURIComponent(JSON.stringify(res.data.user));
                window.location.href = `http://localhost:3001/?user=${userData}`;
            }
        } catch (err) {
            // Graceful error handling for failed auth or server downtime
            alert(err.response?.data?.message || "Login failed! Please check your connection.");
        }
    };

    return (
        <div className="container p-5" style={{ marginTop: "100px" }}>
            <div className="row justify-content-center">
                <div className="col-4 border p-4 shadow-sm">
                    <h2 className="text-center mb-4">Login to Kite</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                onChange={(e) => setValues({...values, username: e.target.value})} 
                                required 
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                onChange={(e) => setValues({...values, password: e.target.value})} 
                                required 
                            />
                        </div>
                        <button className="btn btn-primary w-100">Login</button>
                    </form>
                    <p className="mt-3 text-center">
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;