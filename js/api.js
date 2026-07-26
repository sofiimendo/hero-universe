import { API_URL } from "./constants.js";

export const fetchHeroes = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Unable to fetch heroes:", error);
    throw error;
  }
};