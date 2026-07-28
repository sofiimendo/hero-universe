const heroModal = document.querySelector("#hero-modal");
const modalBody = document.querySelector("#modal-body");
const modalCloseButton = document.querySelector("#close-modal-button");

const getTextValue = (value, fallback = "Desconocido") => {
  if (!value || value === "-") {
    return fallback;
  }

  return value;
};

const getArrayValue = (values, fallback = "Desconocido") => {
  if (!Array.isArray(values)) {
    return fallback;
  }

  const validValues = values.filter(
    (value) => value && value !== "-" && value !== "0 kg"
  );

  return validValues.length > 0
    ? validValues.join(" / ")
    : fallback;
};

const translateValue = (value) => {
  if (!value || value === "-") {
    return "Desconocido";
  }

  const translations = {
    good: "Bueno",
    bad: "Malo",
    neutral: "Neutral",
    male: "Masculino",
    female: "Femenino",
    unknown: "Desconocido",
  };

  return translations[value.toLowerCase()] || value;
};

export const closeHeroModal = () => {
  if (!heroModal || !modalBody) {
    return;
  }

  heroModal.classList.remove("modal--open");
  heroModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  window.setTimeout(() => {
    heroModal.hidden = true;

    modalBody.innerHTML = `
      <h2 id="modal-title">Detalles del personaje</h2>
    `;
  }, 300);
};

export const openHeroModal = (hero) => {
  if (!heroModal || !modalBody || !hero) {
    console.error("No se pudo abrir el modal del personaje.");
    return;
  }

  const heroName = getTextValue(hero.name);
  const fullName = getTextValue(hero.biography?.fullName);
  const publisher = getTextValue(hero.biography?.publisher);
  const alignment = translateValue(hero.biography?.alignment);
  const gender = translateValue(hero.appearance?.gender);
  const placeOfBirth = getTextValue(
    hero.biography?.placeOfBirth
  );
  const occupation = getTextValue(hero.work?.occupation);
  const height = getArrayValue(hero.appearance?.height);
  const weight = getArrayValue(hero.appearance?.weight);

  const heroImage =
    hero.images?.lg ||
    hero.images?.md ||
    hero.images?.sm ||
    "";

  modalBody.innerHTML = `
    <div class="modal__image-container">
      <img
        src="${heroImage}"
        alt="Imagen de ${heroName}"
        class="modal__image"
      />
    </div>

    <div class="modal__information">
      <p class="modal__publisher">
        Editorial: ${publisher}
      </p>

      <h2 id="modal-title" class="modal__title">
        ${heroName}
      </h2>

      <dl class="modal__details">
        <div class="modal__detail">
          <dt>Nombre completo</dt>
          <dd>${fullName}</dd>
        </div>

        <div class="modal__detail">
          <dt>Alineación</dt>
          <dd>${alignment}</dd>
        </div>

        <div class="modal__detail">
          <dt>Género</dt>
          <dd>${gender}</dd>
        </div>

        <div class="modal__detail">
          <dt>Lugar de nacimiento</dt>
          <dd>${placeOfBirth}</dd>
        </div>

        <div class="modal__detail">
          <dt>Altura</dt>
          <dd>${height}</dd>
        </div>

        <div class="modal__detail">
          <dt>Peso</dt>
          <dd>${weight}</dd>
        </div>

        <div class="modal__detail">
          <dt>Ocupación</dt>
          <dd>${occupation}</dd>
        </div>
      </dl>
    </div>
  `;

  heroModal.hidden = false;
  heroModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  requestAnimationFrame(() => {
    heroModal.classList.add("modal--open");
  });

  if (modalCloseButton) {
    modalCloseButton.focus();
  }
};

if (modalCloseButton) {
  modalCloseButton.addEventListener(
    "click",
    closeHeroModal
  );
}

if (heroModal) {
  heroModal.addEventListener("click", (event) => {
    const clickedCloseElement = event.target.closest(
      "[data-close-modal]"
    );

    if (clickedCloseElement) {
      closeHeroModal();
    }
  });
}

document.addEventListener("keydown", (event) => {
  if (!heroModal) {
    return;
  }

  const isModalOpen =
    heroModal.classList.contains("modal--open");

  if (event.key === "Escape" && isModalOpen) {
    closeHeroModal();
  }
});