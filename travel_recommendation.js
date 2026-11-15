const searchInput = document.getElementById('searchInput');
const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const resultsContainer = document.getElementById('resultsContainer');

async function searchRecommendations() {
  const query = searchInput.value.trim().toLowerCase();
  resultsContainer.innerHTML = '';
  if (!query) return;

  const response = await fetch('travel_recommendation_api.json');
  const data = await response.json();
  let results = [];

  if (query.includes('beach')) {
    results = data.beaches;
  } else if (query.includes('temple')) {
    results = data.temples;
  } else if (query.includes('country') || query.includes('countries')) {
    results = data.countries[0].cities;
  } else {
    const matchedCountry = data.countries.find((c) => c.name.toLowerCase().includes(query));
    if (matchedCountry) results = matchedCountry.cities;
  }

  results.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'result-card';
    card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" />
      <div class="card-body">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <button class="btn-visit">Visit</button>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

btnSearch.addEventListener('click', searchRecommendations);
btnClear.addEventListener('click', () => {
  searchInput.value = '';
  resultsContainer.innerHTML = '';
});
