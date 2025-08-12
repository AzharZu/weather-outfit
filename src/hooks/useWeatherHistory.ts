import { useState } from 'react';
import { WeatherData } from '../services/weatherService';

interface WeatherHistory {
  city: string;
  weather: WeatherData;
  timestamp: number;
}

export const useWeatherHistory = () => {
  const [history, setHistory] = useState<WeatherHistory[]>(() => {
    const saved = localStorage.getItem('weatherfit-history');
    return saved ? JSON.parse(saved) : [];
  });

  const addToHistory = (city: string, weather: WeatherData) => {
    const newEntry: WeatherHistory = {
      city,
      weather,
      timestamp: Date.now()
    };

    const updatedHistory = [newEntry, ...history.filter(h => h.city !== city)]
      .slice(0, 10); // Keep only 10 most recent

    setHistory(updatedHistory);
    localStorage.setItem('weatherfit-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('weatherfit-history');
  };

  const removeFromHistory = (city: string) => {
    const updatedHistory = history.filter(h => h.city !== city);
    setHistory(updatedHistory);
    localStorage.setItem('weatherfit-history', JSON.stringify(updatedHistory));
  };

  return {
    history,
    addToHistory,
    clearHistory,
    removeFromHistory
  };
};
