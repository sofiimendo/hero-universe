import { fetchHeroes } from "./api.js";
import { HEROES_PER_PAGE } from "./constants.js";
import {
  getFilteredHeroes,
  initializeFilterEvents,
  populatePublisherFilter,
} from "./filters.js";
import {
  getPageItems,
  getTotalPages,
  initializePaginationEvents,
  updatePaginationControls,
} from "./pagination.js";
import { renderHeroes, updateResultsCount } from "./ui.js";

let allHeroes = [];
let filteredHeroes = [];
let currentPage = 1;
let totalPages = 1;

const renderCurrentPage = () => {
  const heroesToRender = getPageItems(
    filteredHeroes,
    currentPage,
    HEROES_PER_PAGE
  );

  renderHeroes(heroesToRender);
  updateResultsCount(filteredHeroes.length);
  updatePaginationControls(currentPage, totalPages);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const updateFilteredHeroes = () => {
  filteredHeroes = getFilteredHeroes(allHeroes);

  currentPage = 1;
  totalPages = getTotalPages(filteredHeroes.length, HEROES_PER_PAGE);

  renderCurrentPage();
};

const goToFirstPage = () => {
  currentPage = 1;
  renderCurrentPage();
};

const goToPreviousPage = () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderCurrentPage();
  }
};

const goToNextPage = () => {
  if (currentPage < totalPages) {
    currentPage += 1;
    renderCurrentPage();
  }
};

const goToLastPage = () => {
  currentPage = totalPages;
  renderCurrentPage();
};

const goToSelectedPage = (selectedPage) => {
  if (selectedPage >= 1 && selectedPage <= totalPages) {
    currentPage = selectedPage;
    renderCurrentPage();
  }
};

const initializeApp = async () => {
  try {
    allHeroes = await fetchHeroes();

    populatePublisherFilter(allHeroes);

    filteredHeroes = getFilteredHeroes(allHeroes);
    totalPages = getTotalPages(filteredHeroes.length, HEROES_PER_PAGE);

    initializeFilterEvents(updateFilteredHeroes);

    initializePaginationEvents({
      goToFirstPage,
      goToPreviousPage,
      goToNextPage,
      goToLastPage,
      goToSelectedPage,
    });

    renderCurrentPage();
  } catch (error) {
    console.error("No se pudo iniciar la aplicación:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);