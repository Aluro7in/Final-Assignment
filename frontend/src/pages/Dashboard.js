import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard({ userId }) {
  const [meal, setMeal] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState('');
  const [theme, setTheme] = useState('light'); // Manage theme state

  useEffect(() => {
    if (userId) {
      fetchMeal();
      fetchUserProfile();
      fetchFavorites();
    }
  }, [userId]);

  const fetchMeal = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/meal/suggest/${userId}`);
      setMeal(res.data);
    } catch (error) {
      console.error('Failed to fetch meal:', error);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/profile/${userId}`);
      setUserProfile(res.data);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/favorites/${user_id}`);
      setFavorites(res.data);
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await axios.post('http://localhost:5000/meal/image', formData);
      setImageData(res.data);
    } catch (error) {
      console.error('Failed to upload image:', error);
    }
  };

  const addFavorite = async () => {
    if (newFavorite.trim() && meal) {
      try {
        await axios.post(`http://localhost:5000/favorites/${userId}`, { name: newFavorite });
        setNewFavorite('');
        fetchFavorites(); // Refresh favorites list
      } catch (error) {
        console.error('Failed to add favorite:', error);
      }
    }
  };

  const updateProfile = async (field, value) => {
    const updates = {};
    if (field) updates[field] = value || userProfile[field];
    try {
      await axios.post(`http://localhost:5000/profile/${userId}`, updates);
      fetchUserProfile(); // Refresh profile
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const suggestWithAI = async () => {
    try {
      const res = await axios.post('http://localhost:5000/ask', { question: 'Suggest a meal based on my preferences' });
      alert(res.data.answer);
    } catch (error) {
      console.error('AI suggestion failed:', error);
      alert('AI suggestion failed');
    }
  };

  if (!userId) return <p style={{ padding: '20px', textAlign: 'center', background: theme === 'dark' ? '#000000' : '#ffffff', color: theme === 'dark' ? '#ff0000' : '#000000' }}>Please sign in.</p>;

  return (
    <div style={{ padding: '20px', background: theme === 'dark' ? '#000000' : '#ffffff', color: theme === 'dark' ? '#ff0000' : '#000000' }}>
      <h1>Dashboard</h1>
      {userProfile && (
        <div style={{ border: '2px solid #ff0000', padding: '10px', marginBottom: '20px', borderRadius: '8px', background: theme === 'dark' ? '#1a1a1a' : '#f8f8f8' }}>
          <h2>User Profile</h2>
          <p>Email: {userProfile.email}</p>
          <p>Name: <input value={userProfile.name || ''} onChange={(e) => updateProfile('name', e.target.value)} placeholder="Name" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <p>Age: <input type="number" value={userProfile.age || ''} onChange={(e) => updateProfile('age', e.target.value)} placeholder="Age" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <p>Weight: <input type="number" value={userProfile.weight || ''} onChange={(e) => updateProfile('weight', e.target.value)} placeholder="Weight (kg)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <p>Height: <input type="number" value={userProfile.height || ''} onChange={(e) => updateProfile('height', e.target.value)} placeholder="Height (cm)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <p>Calorie Goal: <input type="number" value={userProfile.calorie_goal || ''} onChange={(e) => updateProfile('calorie_goal', e.target.value)} placeholder="Calorie Goal (kcal)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <p>Preferences: <input value={userProfile.preferences || ''} onChange={(e) => updateProfile('preferences', e.target.value)} placeholder="Preferences (e.g., vegan)" style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px' }} /></p>
          <button onClick={() => updateProfile()} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>Update Profile</button>
        </div>
      )}
      {meal && (
        <div style={{ border: '2px solid #ff0000', padding: '10px', marginBottom: '20px', borderRadius: '8px', background: theme === 'dark' ? '#1a1a1a' : '#f8f8f8' }}>
          <h2>Today’s Meal Suggestion</h2>
          <img src={`https://via.placeholder.com/200?text=${meal.name}`} alt={meal.name} style={{ width: '100%', borderRadius: '4px' }} />
          <h3>{meal.name}</h3>
          <p>Calories: {meal.calories} kcal</p>
          <p>Ingredients: {meal.ingredients}</p>
          <p>Instructions: {meal.instructions}</p>
          <input
            type="text"
            value={newFavorite}
            onChange={(e) => setNewFavorite(e.target.value)}
            placeholder="Add to favorites..."
            style={{ border: '1px solid #ff0000', padding: '5px', borderRadius: '4px', marginRight: '10px' }}
          />
          <button onClick={addFavorite} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>Add Favorite</button>
        </div>
      )}
      <div style={{ border: '2px solid #ff0000', padding: '10px', marginBottom: '20px', borderRadius: '8px', background: theme === 'dark' ? '#1a1a1a' : '#f8f8f8' }}>
        <h2>Favorite Meals</h2>
        {favorites.map((favorite, index) => (
          <div key={index} style={{ border: '1px solid #ff0000', padding: '5px', margin: '5px 0', borderRadius: '4px', background: theme === 'dark' ? '#2a2a2a' : '#ffffff' }}>
            {favorite.name}
          </div>
        ))}
      </div>
      <h2>Upload Food Image</h2>
      <input type="file" onChange={handleImageUpload} />
      {imageData && <p style={{ color: theme === 'dark' ? '#ff0000' : '#000000' }}>Food: {imageData.food}, Calories: {imageData.calories} kcal</p>}
      <div style={{ marginTop: '20px' }}>
        <h2>Meal & Nutrition</h2>
        <button onClick={() => history.push('/nutrition')} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px', cursor: 'pointer' }}>View Nutrition</button>
        <button onClick={suggestWithAI} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', marginLeft: '10px', borderRadius: '4px', cursor: 'pointer' }}>AI Meal Suggestion</button>
        <button onClick={() => alert('Share this meal with friends!')} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', marginLeft: '10px', borderRadius: '4px', cursor: 'pointer' }}>Share Meal</button>
      </div>
    </div>
  );
}

export default Dashboard;