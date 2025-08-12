import { useState } from 'react';

export const useFavoriteCities = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('weatherfit-favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const addFavorite = (city: string) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('weatherfit-favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFavorite = (city: string) => {
    const newFavorites = favorites.filter(c => c !== city);
    setFavorites(newFavorites);
    localStorage.setItem('weatherfit-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (city: string) => {
    return favorites.includes(city);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite
  };
};
