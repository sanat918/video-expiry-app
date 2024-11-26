import React, { useState } from 'react';
import Login from './components/Login';
import VideoExpiry from './components/VideoExpiry';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <VideoExpiry />
      )}
    </div>
  );
};

export default App;
