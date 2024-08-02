import React, { useState } from 'react';
import { fetchRequestToken, validateRequestToken, createSession } from '../api';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestToken = await fetchRequestToken();
      const isValid = await validateRequestToken(username, password, requestToken);

      if (isValid) {
        const sessionId = await createSession(requestToken);
        onLogin(sessionId);
      } else {
        setError('Invalid login credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="detail">
      <div>
        <label>Username:</label><br />
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label><br />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default LoginForm;
