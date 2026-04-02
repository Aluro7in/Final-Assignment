import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles';

function Navbar({ userId }) {
  const [searchQuery, setSearchQuery] = useState('');
  const history = useHistory();

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      try {
        const res = await axios.get(`http://localhost:5000/search/recipes?q=${searchQuery}`);
        history.push('/recipes', { recipes: res.data });
      } catch (error) {
        alert('Search failed');
      }
    }
  };

  return (
    <nav style={styles.navbar}>
      <Link to="/" style={styles.navbarBrand}>MealMind</Link>
      <div style={styles.navbarRight}>
        {!userId ? (
          <Link to="/signin" style={styles.navLink}>Sign In</Link>
        ) : (
          <>
            <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
            <Link to="/recipes" style={styles.navLink}>Recipes</Link>
            <Link to="/ask" style={styles.navLink}>Ask AI</Link>
            <Link to="/payment" style={styles.navLink}>Upgrade</Link>
            <Link to="/profile" style={styles.navLink}>Profile</Link>
            <Link to="/settings" style={styles.navLink}>Settings</Link>
            <Link to="/styled" style={styles.navLink}>Styled</Link>
          </>
        )}
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleSearch}
        placeholder="Search recipes..."
        style={{ padding: '5px', margin: '0 10px', borderRadius: '4px', border: '1px solid white', background: '#000000', color: 'white' }}
      />
    </nav>
  );
}

export default Navbar;