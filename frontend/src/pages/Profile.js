import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ userId }) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/profile/${userId}`);
      setProfile(res.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const updateProfile = async (field, value) => {
    const updates = {};
    if (field) updates[field] = value || profile[field];
    try {
      await axios.post(`http://localhost:5000/profile/${userId}`, updates);
      fetchProfile(); // Refresh profile
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!userId) return <p style={{ padding: '20px', textAlign: 'center', background: '#000000', color: '#ff0000' }}>Please sign in.</p>;

  return (
    <div style={{ padding: '20px', background: '#000000', color: '#ff0000' }}>
      <h1>My Profile</h1>
      {profile && (
        <div style={{ border: '2px solid #ff0000', padding: '10px', borderRadius: '8px', background: '#1a1a1a' }}>
          <p>Email: {profile.email}</p>
          <p>Name: <input value={profile.name || ''} onChange={(e) => updateProfile('name', e.target.value)} placeholder="Name" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <p>Age: <input type="number" value={profile.age || ''} onChange={(e) => updateProfile('age', e.target.value)} placeholder="Age" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <p>Weight: <input type="number" value={profile.weight || ''} onChange={(e) => updateProfile('weight', e.target.value)} placeholder="Weight (kg)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <p>Height: <input type="number" value={profile.height || ''} onChange={(e) => updateProfile('height', e.target.value)} placeholder="Height (cm)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <p>Calorie Goal: <input type="number" value={profile.calorie_goal || ''} onChange={(e) => updateProfile('calorie_goal', e.target.value)} placeholder="Calorie Goal (kcal)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <p>Preferences: <input value={profile.preferences || ''} onChange={(e) => updateProfile('preferences', e.target.value)} placeholder="Preferences (e.g., vegan)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', background: '#black', color: '#ff0000' }} /></p>
          <button onClick={() => updateProfile()} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>Update Profile</button>
        </div>
      )}
    </div>
  );
}

export default Profile;