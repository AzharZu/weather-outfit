import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { weatherService, WeatherData } from '../services/weatherService';
import { useGeolocation } from '../hooks/useGeolocation';
import { useFavoriteCities } from '../hooks/useFavoriteCities';
import { getPersonalizedRecommendations } from '../utils/outfitRecommendations';
import { getStylistRecommendation } from '../utils/stylistRecommendations';
import { MoodType } from '../utils/moods';
import { useAnalytics } from '../hooks/useAnalytics';
import { ColorType } from '../utils/colorAnalysis';
import MoodOfTheDay from '../components/MoodOfTheDay';
import StylistRecommendationCard from '../components/StylistRecommendationCard';
import ColorTypeAnalyzer from '../components/ColorTypeAnalyzer';
import AIAssistant from '../components/AIAssistant';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #1a1a2e 75%, #0c0c0c 100%);
  font-family: 'Nunito', 'M PLUS Rounded 1c', 'Comfortaa', sans-serif;
  position: relative;
  overflow-x: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const WeatherCard = styled.div`
  background: rgba(15, 15, 30, 0.95);
  border-radius: 24px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(120, 119, 198, 0.3);
  backdrop-filter: blur(20px);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%,
      rgba(120, 119, 198, 0.8) 25%,
      rgba(255, 119, 198, 0.8) 50%,
      rgba(120, 219, 255, 0.8) 75%,
      transparent 100%
    );
    border-radius: 24px 24px 0 0;
  }
  
  h2 {
    color: #ffffff;
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 1.5rem;
    font-family: 'Nunito', sans-serif;
    text-shadow: 0 0 20px rgba(120, 119, 198, 0.5);
    background: linear-gradient(45deg, #7777c6, #ff77c6, #77dbff);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease-in-out infinite;
  }
  
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  
  @media (max-width: 768px) {
    padding: 2rem;
    margin-bottom: 1rem;
  }
`;

const CitySelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  background: ${props => props.$variant === 'secondary' 
    ? 'rgba(255, 255, 255, 0.05)' 
    : 'linear-gradient(45deg, #7777c6, #ff77c6)'};
  color: #ffffff;
  border: 1px solid ${props => props.$variant === 'secondary' 
    ? 'rgba(255, 255, 255, 0.2)'
    : 'transparent'};
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(120, 119, 198, 0.4);
    border-color: ${props => props.$variant === 'secondary' 
      ? 'rgba(255, 255, 255, 0.4)'
      : 'transparent'};
      
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Input = styled.input`
  flex: 1;
  min-width: 200px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 15px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: #7777c6;
    box-shadow: 0 0 20px rgba(120, 119, 198, 0.3);
    background: rgba(255, 255, 255, 0.08);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const WeatherInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const WeatherStat = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 1.5rem;
  border-radius: 18px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
`;

const StatValue = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
`;

const OutfitRecommendation = styled.div`
  background: rgba(15, 15, 30, 0.8);
  border-left: 4px solid;
  border-image: linear-gradient(45deg, #7777c6, #ff77c6, #77dbff) 1;
  border-radius: 20px;
  padding: 2.5rem;
  margin-top: 2rem;
  backdrop-filter: blur(15px);
  box-shadow: 
    0 15px 40px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const RecommendationTitle = styled.h3`
  color: #ffffff;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Nunito', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  text-shadow: 0 0 15px rgba(120, 119, 198, 0.5);
`;

const RecommendationCategories = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const CategoryCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  }
`;

const CategoryTitle = styled.h4`
  color: #ffffff;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.3rem;
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
`;

const CategoryDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-bottom: 1rem;
  font-style: italic;
  font-family: 'Nunito', sans-serif;
  line-height: 1.6;
`;

const StyleNote = styled.div`
  background: linear-gradient(45deg, rgba(120, 119, 198, 0.3), rgba(255, 119, 198, 0.3));
  color: #ffffff;
  padding: 1rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Nunito', sans-serif;
  margin-top: 1rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

const OutfitItems = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const OutfitItem = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border-left: 4px solid #7777c6;
  padding: 1.2rem;
  border-radius: 15px;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.12);
    transform: translateX(5px);
    box-shadow: 0 8px 25px rgba(120, 119, 198, 0.3);
  }
`;

const ItemEmoji = styled.span`
  font-size: 1.8rem;
  flex-shrink: 0;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
`;

const ItemContent = styled.div`
  flex: 1;
`;

const ItemName = styled.h5`
  color: #ffffff;
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 8px rgba(255, 255, 255, 0.3);
`;

const ItemDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-family: 'Nunito', sans-serif;
  line-height: 1.4;
`;

const ItemReason = styled.small`
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.8rem;
  background: rgba(120, 119, 198, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-family: 'Nunito', sans-serif;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
`;

const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.2);
  color: #ff6b6b;
  padding: 1rem;
  border-radius: 15px;
  margin-bottom: 1rem;
  border: 1px solid rgba(239, 68, 68, 0.3);
  backdrop-filter: blur(10px);
  font-family: 'Nunito', sans-serif;
`;

const FavoriteButton = styled.button<{ $isFavorite: boolean }>`
  background: ${props => props.$isFavorite 
    ? 'linear-gradient(45deg, #ff6b6b, #ff8e8e)' 
    : 'rgba(255, 255, 255, 0.05)'};
  color: ${props => props.$isFavorite ? '#ffffff' : '#ff6b6b'};
  border: 2px solid ${props => props.$isFavorite ? 'transparent' : '#ff6b6b'};
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  transition: all 0.3s ease;
  margin-left: auto;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: ${props => props.$isFavorite 
      ? 'linear-gradient(45deg, #ff5252, #ff7979)' 
      : 'rgba(255, 107, 107, 0.2)'};
    color: #ffffff;
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CityHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Weather: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const { latitude, longitude, getCurrentPosition, loading: geoLoading } = useGeolocation();
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavoriteCities();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [error, setError] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [showStylistMode, setShowStylistMode] = useState(false);
  const [colorType, setColorType] = useState<ColorType | null>(user?.colorType || null);

  // Отслеживание посещений
  useAnalytics('Weather Page');
  const [showColorAnalyzer, setShowColorAnalyzer] = useState(false);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Не удалось получить данные о погоде');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteToggle = () => {
    if (!weather) return;
    
    if (isFavorite(weather.city)) {
      removeFavorite(weather.city);
    } else {
      addFavorite(weather.city);
    }
  };

  const getPersonalizedRecommendation = (weather: WeatherData) => {
    return getPersonalizedRecommendations(weather, user);
  };

  const handleColorTypeAnalyzed = (analyzedColorType: ColorType) => {
    setColorType(analyzedColorType);
    // Автоматически сохраняем цветотип в профиль пользователя
    updateUser({ colorType: analyzedColorType });
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
            
            {favorites.length > 0 && (
              <>
                <div style={{ width: '100%', margin: '0.5rem 0', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', fontFamily: 'Nunito, sans-serif' }}>
                  Избранные города:
                </div>
                {favorites.map(city => (
                  <Button 
                    key={city}
                    onClick={() => fetchWeather(city)}
                    $variant="secondary"
                    style={{ fontSize: '0.9rem' }}
                  >
                    ⭐ {city}
                  </Button>
                ))}
              </>
            )}
            
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
            <div style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Nunito, sans-serif' }}>
              Загружаем данные о погоде...
            </div>
          )}

          {weather && !loading && (
            <>
              <CityHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <WeatherIcon 
                    src={weatherService.getWeatherIconUrl(weather.icon)} 
                    alt={weather.description} 
                  />
                  <div>
                    <h3 style={{ color: '#ffffff', fontFamily: 'Nunito, sans-serif', fontSize: '1.3rem', textShadow: '0 0 10px rgba(255, 255, 255, 0.3)' }}>Погода в городе {weather.city}</h3>
                    <div style={{ color: 'rgba(255, 255, 255, 0.8)', textTransform: 'capitalize', fontFamily: 'Nunito, sans-serif' }}>
                      {weather.description}
                    </div>
                  </div>
                </div>
                <FavoriteButton 
                  $isFavorite={isFavorite(weather.city)}
                  onClick={handleFavoriteToggle}
                >
                  {isFavorite(weather.city) ? '❤️ В избранном' : '🤍 В избранное'}
                </FavoriteButton>
              </CityHeader>
              
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <RecommendationTitle>
                    ✨ {showStylistMode ? 'AI Стилист' : 'Персональные рекомендации'} для {user.name}
                  </RecommendationTitle>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button onClick={() => setShowColorAnalyzer(!showColorAnalyzer)}>
                      {showColorAnalyzer ? 'Скрыть' : 'Цветотип'}
                    </Button>
                    <Button onClick={() => setShowStylistMode(!showStylistMode)}>
                      {showStylistMode ? 'Простые советы' : 'AI Стилист'}
                    </Button>
                  </div>
                </div>
                
                {showColorAnalyzer && (
                  <ColorTypeAnalyzer 
                    onColorTypeAnalyzed={handleColorTypeAnalyzed}
                  />
                )}
                
                {/* AI-ассистент с персональными ремарками */}
                <AIAssistant 
                  user={user}
                  weather={weather}
                  colorType={colorType || undefined}
                  currentMood={selectedMood || undefined}
                />
                
                {!showStylistMode ? (
                  <>
                    <p style={{ marginBottom: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontFamily: 'Nunito, sans-serif' }}>
                      На основе вашего стиля ({user.style === 'casual' ? 'повседневный' : 'элегантный'}) 
                      {colorType && <span> и цветотипа</span>}
                      и текущей погоды:
                    </p>
                    
                    <RecommendationCategories>
                      {getPersonalizedRecommendation(weather).map((category, index) => (
                        <CategoryCard key={index}>
                          <CategoryTitle>
                            {category.icon} {category.category}
                          </CategoryTitle>
                          <CategoryDescription>
                            {category.description}
                          </CategoryDescription>
                          <OutfitItems>
                            {category.items.map((item, itemIndex) => (
                              <OutfitItem key={itemIndex}>
                                <ItemEmoji>{item.emoji}</ItemEmoji>
                                <ItemContent>
                                  <ItemName>{item.name}</ItemName>
                                  <ItemDescription>{item.description}</ItemDescription>
                                  <ItemReason>💡 {item.reason}</ItemReason>
                                </ItemContent>
                              </OutfitItem>
                            ))}
                          </OutfitItems>
                          {category.styleNote && (
                            <StyleNote>
                              {category.styleNote}
                            </StyleNote>
                          )}
                        </CategoryCard>
                      ))}
                    </RecommendationCategories>
                  </>
                ) : (
                  <>
                    <MoodOfTheDay 
                      selectedMood={selectedMood}
                      onMoodSelect={setSelectedMood}
                    />
                    <StylistRecommendationCard 
                      recommendation={getStylistRecommendation(weather, user, selectedMood || undefined)}
                    />
                  </>
                )}
              </OutfitRecommendation>
            </>
          )}
        </WeatherCard>
      </Content>
    </Container>
  );
};

export default Weather;
