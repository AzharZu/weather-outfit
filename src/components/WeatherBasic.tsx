import React, { useState } from 'react';
import styled from 'styled-components';
import { weatherService, WeatherData } from '../services/weatherService';

const Container = styled.div`
  padding: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 1rem;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: #5a67d8;
  }
  
  &:disabled {
    background: #a0aec0;
    cursor: not-allowed;
  }
`;

const WeatherCard = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-top: 1rem;
`;

const WeatherHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const WeatherIcon = styled.img`
  width: 80px;
  height: 80px;
`;

const Temperature = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Description = styled.div`
  color: #718096;
  margin-bottom: 1rem;
  text-transform: capitalize;
`;

const WeatherDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`;

const WeatherDetail = styled.div`
  text-align: center;
  padding: 0.5rem;
  background: white;
  border-radius: 8px;
`;

const DetailValue = styled.div`
  font-weight: bold;
  color: #2d3748;
`;

const DetailLabel = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

const Recommendation = styled.div`
  background: #e6fffa;
  border-left: 4px solid #38b2ac;
  padding: 1rem;
  border-radius: 0 8px 8px 0;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const WeatherBasic: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Введите название города');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const weatherData = await weatherService.getCurrentWeather(city);
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить данные о погоде');
    } finally {
      setLoading(false);
    }
  };

  const getBasicRecommendation = (temp: number): string => {
    // простые советы по температуре
    if (temp < 0) return '❄️ Холодно! Одевайся теплее - куртка, шапка, перчатки';
    if (temp < 10) return '🧥 Прохладно. Куртка или свитер точно нужны';
    if (temp < 20) return '👕 Нормально. Футболка + что-то сверху на всякий случай';
    if (temp < 25) return '☀️ Тепло! Футболка или что-то легкое';
    return '🌡️ Жарко! Одевайся легко и не забудь очки от солнца';
  };

  return (
    <Container>
      <InputGroup>
        <Input
          type="text"
          placeholder="Введите название города"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && getWeather()}
        />
        <Button onClick={getWeather} disabled={loading}>
          {loading ? 'Ищу...' : 'Узнать'}
        </Button>
      </InputGroup>

      {error && (
        <ErrorMessage>{error}</ErrorMessage>
      )}

      {weather && !loading && (
        <WeatherCard>
          <h3>{weather.city}</h3>
          <WeatherHeader>
            <WeatherIcon 
              src={weatherService.getWeatherIconUrl(weather.icon)} 
              alt={weather.description} 
            />
            <div>
              <Temperature>{weather.temperature}°C</Temperature>
              <Description>{weather.description}</Description>
            </div>
          </WeatherHeader>
          
          <WeatherDetails>
            <WeatherDetail>
              <DetailValue>{weather.feelsLike}°C</DetailValue>
              <DetailLabel>Ощущается</DetailLabel>
            </WeatherDetail>
            <WeatherDetail>
              <DetailValue>{weather.humidity}%</DetailValue>
              <DetailLabel>Влажность</DetailLabel>
            </WeatherDetail>
            <WeatherDetail>
              <DetailValue>{weather.windSpeed} м/с</DetailValue>
              <DetailLabel>Ветер</DetailLabel>
            </WeatherDetail>
            <WeatherDetail>
              <DetailValue>{weather.pressure} мм</DetailValue>
              <DetailLabel>Давление</DetailLabel>
            </WeatherDetail>
          </WeatherDetails>

          <Recommendation>
            <strong>Рекомендация:</strong><br />
            {getBasicRecommendation(weather.temperature)}
          </Recommendation>
        </WeatherCard>
      )}
    </Container>
  );
};

export default WeatherBasic;
