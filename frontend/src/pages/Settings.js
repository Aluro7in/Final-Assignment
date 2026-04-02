import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Settings({ userId }) {
  const [theme, setTheme] = useState('light');
  const history = useHistory();

  useEffect(() => {
    // Load saved theme from localStorage or backend
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.style.backgroundColor = savedTheme === 'dark' ? '#000000' : '#ffffff';
    document.body.style.color = savedTheme === 'dark' ? '#ff0000' : '#000000';
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.style.backgroundColor = newTheme === 'dark' ? '#000000' : '#ffffff';
    document.body.style.color = newTheme === 'dark' ? '#ff0000' : '#000000';
  };

  if (!userId) return <p style={{ padding: '20px', textAlign: 'center', background: '#000000', color: '#ff0000' }}>Please sign in.</p>;

  return (
    <div style={{ padding: '20px', background: theme === 'dark' ? '#000000' : '#ffffff', color: theme === 'dark' ? '#ff0000' : '#000000' }}>
      <h1>App Settings</h1>
      <div style={{ border: '2px solid #ff0000', padding: '10px', borderRadius: '8px', background: theme === 'dark' ? '#1a1a1a' : '#f8f8f8' }}>
        <h2>Theme</h2>
        <button onClick={() => handleThemeChange('light')} style={{ background: theme === 'light' ? '#ff0000' : '#666', color: 'white', border: 'none', padding: '5px 15px', margin: '5px', borderRadius: '4px', cursor: 'pointer' }}>Light Mode</button>
        <button onClick={() => handleThemeChange('dark')} style={{ background: theme === 'dark' ? '#ff0000' : '#666', color: 'white', border: 'none', padding: '5px 15px', margin: '5px', borderRadius: '4px', cursor: 'pointer' }}>Dark Mode</button>
        <button onClick={() => handleThemeChange('system')} style={{ background: theme === 'system' ? '#ff0000' : '#666', color: 'white', border: 'none', padding: '5px 15px', margin: '5px', borderRadius: '4px', cursor: 'pointer' }}>System Mode</button>
        <h2>Other Settings</h2>
        <button onClick={() => alert('Notification settings coming soon!')} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', margin: '5px', borderRadius: '4px', cursor: 'pointer' }}>Enable Notifications</button>
        <button onClick={() => alert('Customize app layout coming soon!')} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', margin: '5px', borderRadius: '4px', cursor: 'pointer' }}>Customize Layout</button>
      </div>
    </div>
  );
}

export default Settings;