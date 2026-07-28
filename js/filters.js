const searchInput = document.querySelector("#search-input");
const sortFilter = document.querySelector("#sort-filter");
const genderFilter = document.querySelector("#gender-filter");
const alignmentFilter = document.querySelector("#alignment-filter");
const publisherFilter = document.querySelector("#publisher-filter");
const clearFiltersButton = document.querySelector("#clear-filters-button");

const normalizeText = (text) => {
  return String(text ?? "")
    .trim()
    .toLowerCase();
};

const sortHeroesByName = (heroes, sortOrder) => {
  return [...heroes].sort((firstHero, secondHero) => {
    const comparison = firstHero.name.localeCompare(secondHero.name);

    return sortOrder === "descending" ? -comparison : comparison;
  });
};

export const getFilteredHeroes = (heroes) => {
  const searchValue = normalizeText(searchInput.value);
  const sortValue = sortFilter.value;
  const genderValue = genderFilter.value;
  const alignmentValue = alignmentFilter.value;
  const publisherValue = publisherFilter.value;

  const filteredHeroes = heroes.filter((hero) => {
    const heroName = normalizeText(hero.name);
    const heroGender = hero.appearance?.gender ?? "-";
    const heroAlignment = hero.biography?.alignment ?? "-";
    const heroPublisher = hero.biography?.publisher ?? "";

    const matchesSearch =
      searchValue === "" || heroName.includes(searchValue);

    const matchesGender =
      genderValue === "" || heroGender === genderValue;

    const matchesAlignment =
      alignmentValue === "" || heroAlignment === alignmentValue;

    const matchesPublisher =
      publisherValue === "" || heroPublisher === publisherValue;

    return (
      matchesSearch &&
      matchesGender &&
      matchesAlignment &&
      matchesPublisher
    );
  });

  return sortHeroesByName(filteredHeroes, sortValue);
};

export const populatePublisherFilter = (heroes) => {
  const publishers = heroes
    .map((hero) => hero.biography?.publisher)
    .filter((publisher) => publisher && publisher !== "-");

  const uniquePublishers = [...new Set(publishers)].sort((first, second) =>
    first.localeCompare(second)
  );

  publisherFilter.innerHTML = `
    <option value="">Todas las editoriales</option>
  `;

  uniquePublishers.forEach((publisher) => {
    const option = document.createElement("option");

    option.value = publisher;
    option.textContent = publisher;

    publisherFilter.appendChild(option);
  });
};

export const initializeFilterEvents = (onFiltersChange) => {
  searchInput.addEventListener("input", onFiltersChange);
  sortFilter.addEventListener("change", onFiltersChange);
  genderFilter.addEventListener("change", onFiltersChange);
  alignmentFilter.addEventListener("change", onFiltersChange);
  publisherFilter.addEventListener("change", onFiltersChange);

  clearFiltersButton.addEventListener("click", () => {
    searchInput.value = "";
    sortFilter.value = "ascending";
    genderFilter.value = "";
    alignmentFilter.value = "";
    publisherFilter.value = "";

    onFiltersChange();
    searchInput.focus();
  });
};