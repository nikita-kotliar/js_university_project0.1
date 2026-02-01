import { fetchDailyQuote } from './api.js';

export const STORAGE_KEY_FAVORITES = 'userFavorites';

const STORAGE_KEY_QUOTE = 'dailyQuote';
const STORAGE_KEY_QUOTE_TIME = 'quoteTimestamp';
const MILLISECONDS_IN_A_DAY = 86_400_000;

export const loadFavorites = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load favorites:', error.message);
    return [];
  }
};

export const saveFavorites = favorites => {
  localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
};

export const isFavorite = id => {
  return loadFavorites().some(item => item._id === id);
};

export const addFavorite = exercise => {
  const favorites = loadFavorites();
  if (!favorites.some(item => item._id === exercise._id)) {
    favorites.push(exercise);
    saveFavorites(favorites);
  }
};

export const removeFavoriteById = id => {
  const updated = loadFavorites().filter(item => item._id !== id);
  saveFavorites(updated);
};

export const toggleFavorite = exercise => {
  if (isFavorite(exercise._id)) {
    removeFavoriteById(exercise._id);
    return false;
  } else {
    addFavorite(exercise);
    return true;
  }
};

export async function getDailyQuote() {
  const cachedQuote = localStorage.getItem(STORAGE_KEY_QUOTE);
  const cachedTimestamp = localStorage.getItem(STORAGE_KEY_QUOTE_TIME);

  if (
    cachedQuote &&
    cachedTimestamp &&
    Date.now() - Number(cachedTimestamp) < MILLISECONDS_IN_A_DAY
  ) {
    return JSON.parse(cachedQuote);
  }

  try {
    const quoteData = await fetchDailyQuote();
    localStorage.setItem(STORAGE_KEY_QUOTE, JSON.stringify(quoteData));
    localStorage.setItem(STORAGE_KEY_QUOTE_TIME, Date.now().toString());
    return quoteData;
  } catch (error) {
    console.error('Failed to fetch daily quote:', error);
    return cachedQuote
      ? JSON.parse(cachedQuote)
      : { text: 'No quote available', author: 'Unknown' };
  }
}
