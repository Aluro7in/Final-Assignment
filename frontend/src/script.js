document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        const results = simulateSearch(query);
        displayResults(results);
    }
});

function simulateSearch(query) {
    // Simulate API response with dummy data
    return [
        { title: 'Pasta', image: 'https://via.placeholder.com/200x150', description: 'A tasty pasta dish' },
        { title: 'Salad', image: 'https://via.placeholder.com/200x150', description: 'Fresh and healthy' },
        { title: 'Cake', image: 'https://via.placeholder.com/200x150', description: 'Sweet dessert' }
    ];
}

function displayResults(results) {
    const resultsSection = document.getElementById('results');
    resultsSection.innerHTML = ''; // Clear previous results
    results.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <p>${recipe.description}</p>
        `;
        resultsSection.appendChild(recipeCard);
    });
}