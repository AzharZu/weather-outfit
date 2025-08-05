const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'e8b231b0c4b3c494d48ad06a2b530f86';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  city: string;
  icon: string;
  pressure: number;
  visibility: number;
}

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  name: string;
}

export const weatherService = {
  async getCurrentWeather(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Город не найден. Проверьте правильность написания.');
        }
        throw new Error('Ошибка при получении данных о погоде');
      }

      const data: WeatherResponse = await response.json();

      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        feelsLike: Math.round(data.main.feels_like),
        city: data.name,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при получении данных о погоде');
    }
  },

  async getCurrentWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ru`
      );

      if (!response.ok) {
        throw new Error('Ошибка при получении данных о погоде по координатам');
      }

      const data: WeatherResponse = await response.json();

      return {
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 10) / 10,
        feelsLike: Math.round(data.main.feels_like),
        city: data.name,
        icon: data.weather[0].icon,
        pressure: data.main.pressure,
        visibility: Math.round(data.visibility / 1000)
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Произошла ошибка при получении данных о погоде');
    }
  },

  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }
};
