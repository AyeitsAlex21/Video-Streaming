import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    pass1: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/signin/`;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        pass1: formData.pass1
      })
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Login Success:', data);
        alert('Login Successful!');
        navigate('/home', {state: {email: formData.email}})
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error during login');
      });
  };

  return (
    <div className="container mt-4">
      <h3>Log In to your account!</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="text" className="form-control" id="email" name="email" placeholder="Enter Your Email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label for="pass1">Password</label>
          <input type="password" className="form-control" id="pass1" name="pass1" placeholder="Enter Your Password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}

export default SignIn;
