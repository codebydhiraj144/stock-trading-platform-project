import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  // State object to manage multiple registration fields
  const [values, setValues] = useState({ email: "", username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending registration data to the Auth Backend service
      const { data } = await axios.post("http://localhost:3002/signup", values);
      
      if (data.success) {
        alert("Account created! Please login.");
        navigate("/login"); // Internal navigation within the same port
      }
    } catch (err) {
      // Handling API errors or duplicate user scenarios
      alert(err.response?.data?.message || "Error creating account");
    }
  };

  return (
    <div className="auth_container">
      <div className="auth_form_box">
        <h2 className="auth_header">Signup Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="auth_field">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              onChange={(e) => setValues({...values, email: e.target.value})} 
              required
            />
          </div>
          <div className="auth_field">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter username" 
              onChange={(e) => setValues({...values, username: e.target.value})} 
              required
            />
          </div>
          <div className="auth_field">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter password" 
              onChange={(e) => setValues({...values, password: e.target.value})} 
              required
            />
          </div>
          <button type="submit" className="btn-blue" style={{width: "100%"}}>Submit</button>
        </form>
        <p className="auth_footer">Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;