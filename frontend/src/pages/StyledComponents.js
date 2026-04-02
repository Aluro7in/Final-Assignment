import React from "react";
import styles from "../styles";
import { Link } from 'react-router-dom';

const StyledComponents = () => {
  return (
    <div>
      <header style={styles.appTitle}>MealMind</header>

      <nav style={styles.navbar}>
        <Link to="/" style={styles.navbarBrand}>MealMind</Link>
        <div style={styles.navbarRight}>
          <Link to="/recipes" style={styles.navLink}>Recipes</Link>
          <Link to="/nutrition" style={styles.navLink}>Nutrition</Link>
          <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
        </div>
      </nav>

      <div style={{ marginTop: "100px", padding: "20px" }}>
        <div style={styles.recipeCard}>
          <img src="https://via.placeholder.com/400?text=Delicious+Meal" alt="Recipe" style={styles.recipeImage} />
          <h3>Delicious Recipe</h3>
          <p>Try this amazing recipe that is both healthy and tasty!</p>
          <button style={styles.stButton}>View Recipe</button>
        </div>

        <div style={styles.nutritionInfo}>
          <h4 style={styles.nutritionInfoTitle}>Nutrition Facts</h4>
          <p style={styles.nutritionInfoText}>Calories: 250</p>
          <p style={styles.nutritionInfoText}>Protein: 10g</p>
          <p style={styles.nutritionInfoText}>Carbs: 30g</p>
          <p style={styles.nutritionInfoText}>Fat: 5g</p>
        </div>
      </div>
    </div>
  );
};

export default StyledComponents;