const heroModal = document.querySelector("#hero-modal");
const modalBody = document.querySelector("#modal-body");
const modalCloseButton = document.querySelector("#modal-close-button");

const getTextValue = (value, fallback = "Unknown") => {
  if (!value || value === "-") {
    return fallback;
  }

  return value;
};

const getArrayValue = (values, fallback = "Unknown") => {
  if (!Array.isArray(values)) {
    return fallback;
  }

  const validValues = values.filter(
    (value) => value && value !== "-" && value !== "0 kg"
  );

  return validValues.length > 0 ? validValues.join(" / ") : fallback;
};

export const closeHeroModal = () => {
  heroModal.classList.remove("modal--open");
  heroModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  modalBody.innerHTML = "";
};

export const openHeroModal = (hero) => {
  const fullName = getTextValue(hero.biography.fullName);
  const publisher = getTextValue(hero.biography.publisher);
  const alignment = getTextValue(hero.biography.alignment);
  const gender = getTextValue(hero.appearance.gender);
  const placeOfBirth = getTextValue(hero.biography.placeOfBirth);
  const occupation = getTextValue(hero.work.occupation);
  const height = getArrayValue(hero.appearance.height);
  const weight = getArrayValue(hero.appearance.weight);
  const heroImage = hero.images.lg || hero.images.md;

  modalBody.innerHTML = `
    <div class="modal__image-container">
      <img
        src="${heroImage}"
        alt="${hero.name}"
        class="modal__image"
      />
    </div>

    <div class="modal__information">
      <p class="modal__publisher">${publisher}</p>

      <h2 id="modal-title" class="modal__title">
        ${hero.name}
      </h2>

      <dl class="modal__details">
        <div class="modal__detail">
          <dt>Full name</dt>
          <dd>${fullName}</dd>
        </div>

        <div class="modal__detail">
          <dt>Alignment</dt>
          <dd>${alignment}</dd>
        </div>

        <div class="modal__detail">
          <dt>Gender</dt>
          <dd>${gender}</dd>
        </div>

        <div class="modal__detail">
          <dt>Place of birth</dt>
          <dd>${placeOfBirth}</dd>
        </div>

        <div class="modal__detail">
          <dt>Height</dt>
          <dd>${height}</dd>
        </div>

        <div class="modal__detail">
          <dt>Weight</dt>
          <dd>${weight}</dd>
        </div>

        <div class="modal__detail">
          <dt>Occupation</dt>
          <dd>${occupation}</dd>
        </div>
      </dl>
    </div>
  `;

  heroModal.classList.add("modal--open");
  heroModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  modalCloseButton.focus();
};

modalCloseButton.addEventListener("click", closeHeroModal);

heroModal.addEventListener("click", (event) => {
  if (event.target === heroModal) {
    closeHeroModal();
  }
});

document.addEventListener("keydown", (event) => {
  const isModalOpen = heroModal.classList.contains("modal--open");

  if (event.key === "Escape" && isModalOpen) {
    closeHeroModal();
  }
});