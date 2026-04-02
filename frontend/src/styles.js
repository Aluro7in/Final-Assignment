const styles = {
    appTitle: {
      textAlign: "center",
      background: "#FF4B4B",
      color: "white",
      padding: "0.5rem",
      fontSize: "2rem",
      fontWeight: "bold",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1001,
    },
  
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "1rem 2rem",
      background: "linear-gradient(to right, #FF4B4B, #FF6B6B)",
      color: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      position: "fixed",
      top: "40px",
      left: 0,
      right: 0,
      zIndex: 1000,
    },
  
    navbarBrand: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "white",
      textDecoration: "none",
      textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
      padding: "0.5rem 1rem",
      borderRadius: "8px",
      background: "rgba(255,255,255,0.1)",
    },
  
    navbarRight: {
      display: "flex",
      gap: "2rem",
    },
  
    navLink: {
      color: "white",
      textDecoration: "none",
      fontWeight: 500,
      padding: "0.5rem 1rem",
      borderRadius: "4px",
      transition: "background-color 0.3s",
    },
  
    recipeCard: {
      padding: "1rem",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      marginBottom: "1rem",
      backgroundColor: "white",
      transition: "transform 0.2s",
    },
  
    specialRecipe: {
      border: "2px solid #FF4B4B",
      backgroundColor: "#fff9f9",
    },
  
    stButton: {
      width: "100%",
      borderRadius: "5px",
      backgroundColor: "#FF4B4B",
      color: "white",
      margin: "0.5rem 0",
    },
  
    recipeImage: {
      borderRadius: "8px",
      marginBottom: "1rem",
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
  
    nutritionInfo: {
      backgroundColor: "#f8f9fa",
      padding: "1rem",
      borderRadius: "5px",
      marginTop: "1rem",
    },
  
    nutritionInfoTitle: {
      color: "#FF4B4B",
      marginBottom: "0.5rem",
    },
  
    nutritionInfoText: {
      margin: "0.25rem 0",
      fontSize: "0.9rem",
    },
  };
  
  export default styles;