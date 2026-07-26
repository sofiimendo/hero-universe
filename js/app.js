import { fetchHeroes } from "./api.js";

const initializeApp = async () => {
  try {
    const heroes = await fetchHeroes();

    console.log("Heroes loaded:", heroes);
  } catch (error) {
    console.error("Unable to initialize the application:", error);
  }
};

document.addEventListener("DOMContentLoaded", initializeApp);