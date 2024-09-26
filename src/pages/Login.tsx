
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


  export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = () => {
      if (email === 'mike@gmail.com' && password === 'Password123!') {
        localStorage.setItem('authToken', 'your-auth-token');
        navigate('/products'); 
      } else {
        alert('Invalid credentials');
      }
    };
  
    return (
      <div>
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  };
  