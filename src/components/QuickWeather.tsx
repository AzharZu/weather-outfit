import React, { useState, useEffect } from 'react';
import { weatherService, WeatherData } from '../services/weatherService';
import styled from 'styled-components';

const WeatherWidget = styled.div`
  background: rgba(9, 6, 23, 0.9);
  border-radius: 12px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 15px rgba (255, 255, 255, 0.9);
`;

const WeatherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const WeatherIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const Temperature = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2d3748;
`;

const Description = styled.span`
  color: #4a5568;
  text-transform: capitalize;
  margin-left: 0.5rem;
`;

const LoadingText = styled.div`
  color: #4a5568;
  text-align: center;
  padding: 1rem;
`;

interface QuickWeatherProps {
  city: string;
}

const QuickWeather: React.FC<QuickWeatherProps> = ({ city }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const data = await weatherService.getCurrentWeather(city);
        setWeather(data);
      } catch (err) {
        console.error('Failed to fetch weather:', err);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  if (loading) {
    return (
      <WeatherWidget>
        <LoadingText>Загружаем погоду...</LoadingText>
      </WeatherWidget>
    );
  }

  if (!weather) {
    return (
      <WeatherWidget>
        <LoadingText>Не удалось загрузить погоду</LoadingText>
      </WeatherWidget>
    );
  }

  return (
    <WeatherWidget>
      <WeatherHeader>
        <WeatherIcon 
          src={weatherService.getWeatherIconUrl(weather.icon)} 
          alt={weather.description} 
        />
        <div>
          <Temperature>{weather.temperature}°</Temperature>
          <Description>{weather.description}</Description>
        </div>
      </WeatherHeader>
      <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
        Ощущается как {weather.feelsLike}° • {weather.city}
      </div>
    </WeatherWidget>
  );
};

export default QuickWeather;
