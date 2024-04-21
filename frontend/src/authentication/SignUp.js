import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    pass1: '',
    pass2: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    formData.username = formData.email
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/signup/`;
    console.log(JSON.stringify(formData))
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        alert('Signup Successful!');
        navigate('/home', {state: {email: formData.email}})
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error during signup');
      });
  };

  return (
    <div className="container mt-4">
      <h3>Create your account!</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fname">First Name</label>
          <input type="text" className="form-control" id="fname" name="fname" placeholder="Enter Your First Name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="lname">Last Name</label>
          <input type="text" className="form-control" id="lname" name="lname" placeholder="Enter Your Last Name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="Enter Your Email Address" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="pass1">Password</label>
          <input type="password" className="form-control" id="pass1" name="pass1" placeholder="Create Your Password" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="pass2">Confirm Password</label>
          <input type="password" className="form-control" id="pass2" name="pass2" placeholder="Confirm Your Password" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
