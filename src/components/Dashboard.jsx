import React from 'react';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const { user, logout } = React.useContext(AuthContext);
  
  return (
    <div className='detail'>
      <h1>Welcome, {user ? user.name : 'User'}</h1>
      <br />
      <p>Session ID : {user ? user.username : 'Loading...'}</p>
      <p>Pays : {user ? user.iso_3166_1 : 'Loading...'}</p> 
      <p>Langue : {user ? user.iso_639_1 : 'Loading...'}</p>
      <p>ID : {user ? user.id : 'Loading...'}</p>
      <br />
      <button onClick={logout}>Logout</button>
      
    </div>
  );
};

export default Dashboard;
