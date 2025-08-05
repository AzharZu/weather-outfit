import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { weatherService, WeatherData } from '../services/weatherService';
import { useGeolocation } from '../hooks/useGeolocation';
import { getPersonalizedRecommendations } from '../utils/outfitRecommendations';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const WeatherCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const CitySelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'secondary' ? 'transparent' : '#667eea'};
  color: ${props => props.$variant === 'secondary' ? '#667eea' : 'white'};
  border: 2px solid #667eea;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a67d8;
    color: white;
    border-color: #5a67d8;
  }
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

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const WeatherStat = styled.div`
  background: #f7fafc;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #718096;
  font-size: 0.9rem;
`;

const OutfitRecommendation = styled.div`
  background: linear-gradient(135deg, #e6fffa 0%, #f0fff4 100%);
  border-left: 5px solid #38b2ac;
  border-radius: 12px;
  padding: 2rem;
  margin-top: 2rem;
`;

const RecommendationTitle = styled.h3`
  color: #2d3748;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RecommendationCategories = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const CategoryTitle = styled.h4`
  color: #2d3748;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const OutfitItems = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const OutfitItem = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const ErrorMessage = styled.div`
  background: #fed7d7;
  color: #c53030;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const Weather: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { latitude, longitude, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [selectedCity, setSelectedCity] = useState(user?.city || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.city) {
      fetchWeather(user.city);
    }
  }, [user]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByCoords(latitude, longitude);
    }
  }, [latitude, longitude]);

  if (!user?.isRegistered) {
    navigate('/');
    return null;
  }

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await weatherService.getCurrentWeather(city);
      setWeather(weatherData);
      setSelectedCity(city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить данные о погоде');
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError('');
    
    try {
      const weatherData = await weatherService.getCurrentWeatherByCoords(lat, lon);
      setWeather(weatherData);
      setSelectedCity(weatherData.city);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить данные о погоде');
    } finally {
      setLoading(false);
    }
  };

  const getPersonalizedRecommendation = (weather: WeatherData) => {
    return getPersonalizedRecommendations(weather, user);
  };

  return (
    <Container>
      <Navigation />
      <Content>
        <WeatherCard>
          <h2>Погода и рекомендации одежды</h2>
          
          <CitySelector>
            <Button onClick={() => fetchWeather(user.city)}>
              Мой город ({user.city})
            </Button>
            <Button 
              onClick={getCurrentPosition} 
              disabled={geoLoading}
              $variant="secondary"
            >
              {geoLoading ? 'Определяем' : 'Моё местоположение'}
            </Button>
            <Input
              type="text"
              placeholder="Введите другой город"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
            />
            <Button 
              $variant="secondary" 
              onClick={() => customCity && fetchWeather(customCity)}
            >
              Проверить
            </Button>
          </CitySelector>

          {error && (
            <ErrorMessage>{error}</ErrorMessage>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              Загружаем данные о погоде...
            </div>
          )}

          {weather && !loading && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <WeatherIcon 
                  src={weatherService.getWeatherIconUrl(weather.icon)} 
                  alt={weather.description} 
                />
                <div>
                  <h3>Погода в городе {weather.city}</h3>
                  <div style={{ color: '#666', textTransform: 'capitalize' }}>
                    {weather.description}
                  </div>
                </div>
              </div>
              
              <WeatherInfo>
                <WeatherStat>
                  <StatValue>{weather.temperature}°C</StatValue>
                  <StatLabel>Температура</StatLabel>
                </WeatherStat>
                <WeatherStat>
                  <StatValue>{weather.feelsLike}°C</StatValue>
                  <StatLabel>Ощущается как</StatLabel>
                </WeatherStat>
                <WeatherStat>
                  <StatValue>{weather.humidity}%</StatValue>
                  <StatLabel>Влажность</StatLabel>
                </WeatherStat>
                <WeatherStat>
                  <StatValue>{weather.windSpeed} м/с</StatValue>
                  <StatLabel>Ветер</StatLabel>
                </WeatherStat>
                <WeatherStat>
                  <StatValue>{weather.pressure} мм</StatValue>
                  <StatLabel>Давление</StatLabel>
                </WeatherStat>
                <WeatherStat>
                  <StatValue>{weather.visibility} км</StatValue>
                  <StatLabel>Видимость</StatLabel>
                </WeatherStat>
              </WeatherInfo>

              <OutfitRecommendation>
                <RecommendationTitle>
                  ✨ Персональные рекомендации для {user.name}
                </RecommendationTitle>
                <p style={{ marginBottom: '1rem', color: '#4a5568' }}>
                  На основе вашего стиля ({user.style === 'casual' ? 'повседневный' : 'элегантный'}) 
                  и предпочтений:
                </p>
                
                <RecommendationCategories>
                  {getPersonalizedRecommendation(weather).map((category, index) => (
                    <CategoryCard key={index}>
                      <CategoryTitle>
                        {category.icon} {category.category}
                      </CategoryTitle>
                      <OutfitItems>
                        {category.items.map((item, itemIndex) => (
                          <OutfitItem key={itemIndex}>
                            {item}
                          </OutfitItem>
                        ))}
                      </OutfitItems>
                    </CategoryCard>
                  ))}
                </RecommendationCategories>
              </OutfitRecommendation>
            </>
          )}
        </WeatherCard>
      </Content>
    </Container>
  );
};

export default Weather;
