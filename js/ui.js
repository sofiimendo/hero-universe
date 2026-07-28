import { openHeroModal } from "./modal.js";

const heroesGrid = document.querySelector("#heroes-grid");
const resultsCount = document.querySelector("#results-count");

const translateAlignment = (alignment) => {
  const translations = {
    good: "Bueno",
    bad: "Malo",
    neutral: "Neutral",
    unknown: "Desconocido",
  };

  if (!alignment) {
    return "Desconocido";
  }

  return translations[alignment.toLowerCase()] || alignment;
};

const createHeroCard = (hero) => {
  const article = document.createElement("article");
  article.classList.add("hero-card");

  const publisher =
    hero.biography?.publisher || "Editorial desconocida";

  const alignment = translateAlignment(
    hero.biography?.alignment
  );

  const heroImage =
    hero.images?.md ||
    hero.images?.sm ||
    hero.images?.lg ||
    "";

  article.innerHTML = `
    <div class="hero-card__image-container">
      <img
        src="${heroImage}"
        alt="Imagen de ${hero.name}"
        class="hero-card__image"
        loading="lazy"
      />
    </div>

    <div class="hero-card__content">
      <p class="hero-card__publisher">
        ${publisher}
      </p>

      <h3 class="hero-card__name">
        ${hero.name}
      </h3>

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

  const detailsButton = article.querySelector(
    ".hero-card__button"
  );

  if (detailsButton) {
    detailsButton.addEventListener("click", () => {
      openHeroModal(hero);
    });
  }

  return article;
};

export const renderHeroes = (heroes) => {
  if (!heroesGrid) {
    console.error(
      "No se encontró la grilla de personajes."
    );
    return;
  }

  heroesGrid.innerHTML = "";

  if (!Array.isArray(heroes) || heroes.length === 0) {
    heroesGrid.innerHTML = `
      <p class="empty-message">
        No se encontraron personajes.
      </p>
    `;

    heroesGrid.setAttribute("aria-busy", "false");
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
  if (!resultsCount) {
    return;
  }

  const resultText =
    totalHeroes === 1 ? "resultado" : "resultados";

  resultsCount.textContent =
    `${totalHeroes} ${resultText}`;
};