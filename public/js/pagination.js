const cards = document.querySelectorAll(".card");
const cardsPerPage = 5;
const totalPages = Math.ceil(cards.length / cardsPerPage);
let currentPage = 1;

function showPage(page) {
  cards.forEach((card) => (card.style.display = "none"));
  const startIndex = (page - 1) * cardsPerPage;
  const endIndex = startIndex + cardsPerPage;
  Array.from(cards)
    .slice(startIndex, endIndex)
    .forEach((card) => (card.style.display = "block"));
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndex = document.getElementById("pageIndex");

prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    showPage(currentPage);
    updatePagination();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    showPage(currentPage);
    updatePagination();
  }
});

function updatePagination() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
  pageIndex.textContent = currentPage;
}

showPage(currentPage);
updatePagination();
