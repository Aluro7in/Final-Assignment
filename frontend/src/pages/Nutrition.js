import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Nutrition({ userId }) {
  const [nutritionData, setNutritionData] = useState(null);
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchNutrition();
      fetchMeal();
    }
  }, [userId]);

  const fetchNutrition = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/nutrition/${userId}`);
      setNutritionData(res.data);
    } catch (error) {
      console.error('Failed to fetch nutrition:', error);
    }
  };

  const fetchMeal = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/meal/suggest/${userId}`);
      setMeal(res.data);
    } catch (error) {
      console.error('Failed to fetch meal:', error);
    }
  };

  if (!userId) return <p style={{ padding: '20px', textAlign: 'center', background: '#000000', color: '#ff0000' }}>Please sign in.</p>;

  return (
    <div style={{ padding: '20px', background: '#000000', color: '#ff0000' }}>
      <h1>Nutrition & Calories</h1>
      {meal && (
        <div style={{ border: '2px solid #ff0000', padding: '10px', marginBottom: '20px', borderRadius: '8px', background: '#1a1a1a' }}>
          <h2>{meal.name}</h2>
          <p>Calories: {meal.calories} kcal</p>
          <p>Protein: {(meal.calories * 0.3 / 4).toFixed(1)}g (30% of calories)</p> {/* Assuming 30% protein */}
          <p>Carbs: {(meal.calories * 0.5 / 4).toFixed(1)}g (50% of calories)</p>
          <p>Fat: {(meal.calories * 0.2 / 9).toFixed(1)}g (20% of calories)</p>
          <p>Ingredients: {meal.ingredients}</p>
        </div>
      )}
      {nutritionData && (
        <div style={{ border: '2px solid #ff0000', padding: '10px', borderRadius: '8px', background: '#1a1a1a' }}>
          <h2>Daily Nutrition Summary</h2>
          <p>Total Calories: {nutritionData.totalCalories} kcal</p>
          <p>Protein: {nutritionData.protein}g</p>
          <p>Carbs: {nutritionData.carbs}g</p>
          <p>Fat: {nutritionData.fat}g</p>
        </div>
      )}
      <button onClick={() => alert('Consult with AI for personalized nutrition!')} style={{ background: '#ff0000', color: 'white', border: 'none', padding: '5px 15px', marginTop: '20px', borderRadius: '4px', cursor: 'pointer' }}>AI Nutrition Consultation</button>
    </div>
  );
}

export default Nutrition;