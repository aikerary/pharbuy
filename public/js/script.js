const searchInput = document.getElementById('searchInput');
const cardsSection = document.getElementById('cards');
const loader = document.getElementById('loader');
const searchBtn = document.querySelector('.search-btn');
let currentResults = [];

searchBtn.addEventListener('click', handleSearch);

function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    showLoader();
    fetchResults(query)
      .then(results => {
        currentResults = results;
        displayResults(currentResults, 1);
      })
      .catch(handleError)
      .finally(hideLoader);
  } else {
    currentResults = [];
    clearResults();
  }
}

function fetchResults(query) {
  return fetch(`http://localhost:3000/search?query=${query}`)
    .then(response => response.json());
}

function displayResults(results, page) {
  clearResults();
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  const pageResults = results.slice(startIndex, endIndex);
  pageResults.forEach(item => {
    const card = createCardElement(item);
    cardsSection.appendChild(card);
  });
  updatePagination(results.length, page);
}

function createCardElement(item) {
  const card = document.createElement('article');
  card.innerHTML = `
    <img src="${item.imagen}" alt="${item.nombre}" />
    <h1>${item.nombre}</h1>
    <h2>${item.farmacia}</h2>
    <h2>$${item.precio}</h2>
    <a href="${item.enlaces}" target="_blank">Lo quiero</a>
  `;
  // Set the class to card
  card.className = 'card';
  return card;
}
function clearResults() {
  cardsSection.innerHTML = '';
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function handleError(error) {
  console.error('Error:', error);
}

function updatePagination(totalResults, currentPage) {
  const totalPages = Math.ceil(totalResults / cardsPerPage);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const pageIndex = document.getElementById('pageIndex');

  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      displayResults(currentResults, currentPage);
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayResults(currentResults, currentPage);
    }
  });

  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  pageIndex.textContent = currentPage;
}