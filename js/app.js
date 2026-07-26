import { fetchHeroes } from "./api.js";
import { HEROES_PER_PAGE } from "./constants.js";
import { renderHeroes, updateResultsCount } from "./ui.js";
import {
  getPageItems,
  getTotalPages,
  initializePaginationEvents,
  updatePaginationControls,
} from "./pagination.js";

let allHeroes = [];
let currentPage = 1;
let totalPages = 1;

const renderCurrentPage = () => {
  const heroesToRender = getPageItems(
    allHeroes,
    currentPage,
    HEROES_PER_PAGE
  );

  renderHeroes(heroesToRender);
  updatePaginationControls(currentPage, totalPages);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
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
  currentPage = selectedPage;
  renderCurrentPage();
};

const initializeApp = async () => {
  try {
    allHeroes = await fetchHeroes();

    totalPages = getTotalPages(allHeroes.length, HEROES_PER_PAGE);

    updateResultsCount(allHeroes.length);
    renderCurrentPage();

    initializePaginationEvents({
      goToFirstPage,
      goToPreviousPage,
      goToNextPage,
      goToLastPage,
      goToSelectedPage,
    });
  } catch (error) {
    console.error("Unable to initialize the application:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);