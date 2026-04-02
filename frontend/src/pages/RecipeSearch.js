import React, { useState } from 'react';
import axios from 'axios';

function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const res = await axios.get(`http://localhost:5000/search/recipes?q=${query}`);
        setRecipes(res.data);
      } catch (error) {
        console.error('Search failed:', error);
        alert('Search failed');
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Search Recipes</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
        style={{ padding: '5px', marginRight: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSearch} style={{ padding: '5px 10px', borderRadius: '4px', border: 'none', background: '#007BFF', color: 'white' }}>
        Search
      </button>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {recipes.map((recipe, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px', width: '200px' }}>
            <img src={`https://via.placeholder.com/200?text=${recipe.name}`} alt={recipe.name} style={{ width: '100%', borderRadius: '4px' }} />
            <h3>{recipe.name}</h3>
            <p>Calories: {recipe.calories} kcal</p>
            <p>Ingredients: {recipe.ingredients}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecipeSearch;