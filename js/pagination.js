const firstPageButton = document.querySelector("#first-page-button");
const previousPageButton = document.querySelector("#previous-page-button");
const nextPageButton = document.querySelector("#next-page-button");
const lastPageButton = document.querySelector("#last-page-button");
const pageIndicator = document.querySelector("#page-indicator");
const pageSelect = document.querySelector("#page-select");

export const getTotalPages = (totalItems, itemsPerPage) => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const getPageItems = (items, currentPage, itemsPerPage) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
};

const updatePageSelect = (totalPages, currentPage) => {
  pageSelect.innerHTML = "";

  for (let page = 1; page <= totalPages; page += 1) {
    const option = document.createElement("option");

    option.value = page;
    option.textContent = page;
    option.selected = page === currentPage;

    pageSelect.appendChild(option);
  }
};

export const updatePaginationControls = (currentPage, totalPages) => {
  const hasResults = totalPages > 0;
  const displayedPage = hasResults ? currentPage : 0;

  pageIndicator.textContent = `Página ${displayedPage} de ${totalPages}`;

  firstPageButton.disabled = !hasResults || currentPage === 1;
  previousPageButton.disabled = !hasResults || currentPage === 1;
  nextPageButton.disabled = !hasResults || currentPage === totalPages;
  lastPageButton.disabled = !hasResults || currentPage === totalPages;
  pageSelect.disabled = !hasResults;

  if (!hasResults) {
    pageSelect.innerHTML = `<option value="">0</option>`;
    return;
  }

  updatePageSelect(totalPages, currentPage);
};

export const initializePaginationEvents = ({
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage,
  goToSelectedPage,
}) => {
  firstPageButton.addEventListener("click", goToFirstPage);
  previousPageButton.addEventListener("click", goToPreviousPage);
  nextPageButton.addEventListener("click", goToNextPage);
  lastPageButton.addEventListener("click", goToLastPage);

  pageSelect.addEventListener("change", (event) => {
    goToSelectedPage(Number(event.target.value));
  });
};