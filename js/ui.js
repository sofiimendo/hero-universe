const heroesGrid = document.querySelector("#heroes-grid");
const resultsCount = document.querySelector("#results-count");

const createHeroCard = (hero) => {
  const article = document.createElement("article");
  article.classList.add("hero-card");

  const publisher = hero.biography.publisher || "Editorial desconocida";
  const alignment = hero.biography.alignment || "Desconocida";

  article.innerHTML = `
    <div class="hero-card__image-container">
      <img
        src="${hero.images.md}"
        alt="${hero.name}"
        class="hero-card__image"
        loading="lazy"
      />
    </div>

    <div class="hero-card__content">
      <p class="hero-card__publisher">${publisher}</p>

      <h3 class="hero-card__name">${hero.name}</h3>

      <p class="hero-card__alignment">
        Alineación: ${alignment}
      </p>

      <button
        type="button"
        class="hero-card__button"
        data-hero-id="${hero.id}"
      >
        Ver detalles
      </button>
    </div>
  `;

  return article;
};

export const renderHeroes = (heroes) => {
  heroesGrid.innerHTML = "";

  if (heroes.length === 0) {
    heroesGrid.innerHTML = `
      <p class="empty-message">
        No se encontraron héroes.
      </p>
    `;

    return;
  }

  const fragment = document.createDocumentFragment();

  heroes.forEach((hero) => {
    const heroCard = createHeroCard(hero);
    fragment.appendChild(heroCard);
  });

  heroesGrid.appendChild(fragment);
  heroesGrid.setAttribute("aria-busy", "false");
};

export const updateResultsCount = (totalHeroes) => {
  const resultText = totalHeroes === 1 ? "resultado" : "resultados";

  resultsCount.textContent = `${totalHeroes} ${resultText}`;
};