const themeToggleButton = document.querySelector("#theme-toggle");

const THEME_STORAGE_KEY = "hero-universe-theme";
const LIGHT_THEME = "light";
const DARK_THEME = "dark";

const updateThemeButton = (theme) => {
  const isLightTheme = theme === LIGHT_THEME;

  themeToggleButton.setAttribute(
    "aria-label",
    isLightTheme
      ? "Switch to dark theme"
      : "Switch to light theme"
  );

  themeToggleButton.setAttribute(
    "aria-pressed",
    String(isLightTheme)
  );

  themeToggleButton.innerHTML = `
    <span aria-hidden="true">
      ${isLightTheme ? "☀️" : "🌙"}
    </span>
  `;
};

const applyTheme = (theme) => {
  const isLightTheme = theme === LIGHT_THEME;

  document.body.classList.toggle(
    "light-theme",
    isLightTheme
  );

  updateThemeButton(theme);
};

const getInitialTheme = () => {
  const savedTheme = localStorage.getItem(
    THEME_STORAGE_KEY
  );

  if (
    savedTheme === LIGHT_THEME ||
    savedTheme === DARK_THEME
  ) {
    return savedTheme;
  }

  const prefersLightTheme = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  return prefersLightTheme
    ? LIGHT_THEME
    : DARK_THEME;
};

export const initializeTheme = () => {
  if (!themeToggleButton) {
    return;
  }

  const initialTheme = getInitialTheme();

  applyTheme(initialTheme);

  themeToggleButton.addEventListener("click", () => {
    const isLightTheme =
      document.body.classList.contains("light-theme");

    const newTheme = isLightTheme
      ? DARK_THEME
      : LIGHT_THEME;

    applyTheme(newTheme);

    localStorage.setItem(
      THEME_STORAGE_KEY,
      newTheme
    );
  });
};