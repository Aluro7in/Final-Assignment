import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../styles';

function Home() {
  // ... (previous state, useEffect, fetchFeaturedMeals remain the same)
  const [featuredMeals, setFeaturedMeals] = useState([]);

    fetchFeaturedMeals();
      
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedMeals = async () => {
      try {
        const response = await axios.get('/api/featured-meals'); // Adjust the endpoint as necessary
        setFeaturedMeals(response.data);
      } catch (error) {
        console.error('Error fetching featured meals:', error);
        setError('Failed to load featured meals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedMeals();
  }, []);

  if (loading) {
    return <p style={{ color: '#ff0000' }}>Loading featured meals...</p>;
  }

  if (error) {
    return <p style={{ color: '#ff0000' }}>{error}</p>;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center', background: '#000000', color: '#ff0000' }}>
      <h1 style={styles.appTitle}>Welcome to MealMind</h1>
      <p style={{ color: '#ff0000' }}>Discover delicious, personalized meal plans with AI-powered suggestions!</p>
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '100px' }}> {/* Adjusted marginTop for navbar */}
        {featuredMeals.map((meal, index) => (
          <div key={index} style={{ ...styles.recipeCard, border: '2px solid #FF4B4B', background: '#000000', color: '#ff0000' }}>
            <img src={meal.image} alt={meal.name} style={styles.recipeImage} />
            <h3>{meal.name}</h3>
            <p>{meal.calories} kcal</p>
            <p>Protein: {meal.nutrition.protein}g, Carbs: {meal.nutrition.carbs}g, Fat: {meal.nutrition.fat}g</p>
          </div>
        ))}
      </div>
      <p style={{ marginTop: '20px', color: '#ff0000' }}>
        <Link to="/signin" style={{ color: '#ff0000', textDecoration: 'underline' }}>Sign in</Link> to explore more features, or try our <button style={styles.stButton}>AI Suggestions</button>!
      </p>
      <button style={styles.stButton} onClick={() => alert('Settings coming soon!')}>App Settings</button>
    </div>
  );
}

export default Home;