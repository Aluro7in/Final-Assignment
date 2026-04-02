import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function SignIn({ setUserId }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSignIn = async () => {
    try {
      const res = await axios.post('http://localhost:5000/signin', { email, password });
      setUserId(res.data.user_id);
      history.push('/dashboard');
    } catch (error) {
      alert('Sign-in failed: ' + (error.response?.data?.error || error.message));
      console.error('Sign-in error:', error);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', background: '#000000', color: '#ff0000' }}>
      <h1>Sign In</h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={{ padding: '5px', margin: '5px', borderRadius: '4px', border: '1px solid #ff0000', background: '#black', color: '#ff0000' }}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={{ padding: '5px', margin: '5px', borderRadius: '4px', border: '1px solid #ff0000', background: '#black', color: '#ff0000' }}
      />
      <button onClick={handleSignIn} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>Sign In</button>
    </div>
  );
}

export default SignIn;