import React from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useFavoriteCities } from '../hooks/useFavoriteCities';
import { useWeatherHistory } from '../hooks/useWeatherHistory';
import { useAnalytics } from '../hooks/useAnalytics';
import Navigation from '../components/Navigation';
import Analytics from '../components/Analytics';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: ${(props: any) => props.theme?.background || '#fafafa'};
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SettingsCard = styled.div`
  background: ${(props: any) => props.theme?.surface || '#ffffff'};
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  border: 1px solid ${(props: any) => props.theme?.border || '#dbdbdb'};
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Title = styled.h2`
  color: ${(props: any) => props.theme?.text || '#262626'};
  margin-bottom: 2rem;
  font-weight: 600;
  font-size: 1.5rem;
`;

const SettingGroup = styled.div`
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${(props: any) => props.theme?.border || '#dbdbdb'};
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const SettingTitle = styled.h3`
  color: ${(props: any) => props.theme?.text || '#262626'};
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 600;
`;

const SettingDescription = styled.p`
  color: ${(props: any) => props.theme?.textSecondary || '#8e8e8e'};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const ToggleButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active 
    ? (props as any).theme?.primary || '#0095f6'
    : (props as any).theme?.border || '#dbdbdb'};
  color: ${props => props.$active 
    ? 'white' 
    : (props as any).theme?.textSecondary || '#8e8e8e'};
  border: none;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
    transform: translateY(-1px);
  }
`;

const Button = styled.button<{ $variant?: 'danger' }>`
  background: ${props => props.$variant === 'danger' ? '#e53e3e' : '#667eea'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.$variant === 'danger' ? '#c53030' : '#5a67d8'};
  }
`;

const FavoritesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FavoriteCity = styled.span`
  background: #e6fffa;
  color: #38b2ac;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
  font-size: 1.1rem;
  
  &:hover {
    color: #c53030;
  }
`;

const Settings: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { isDark, theme, toggleTheme } = useTheme();
  const { favorites, removeFavorite } = useFavoriteCities();
  const { clearHistory, history } = useWeatherHistory();

  // Отслеживание посещений
  useAnalytics('Settings Page');

  if (!user?.isRegistered) {
    navigate('/');
    return null;
  }

  const handleClearHistory = () => {
    if (window.confirm('Очистить всю историю просмотров?')) {
      clearHistory();
    }
  };

  const handleClearData = () => {
    if (window.confirm('Удалить все данные приложения? Это действие нельзя отменить!')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Container theme={theme}>
      <Navigation />
      <Content theme={theme}>
        <SettingsCard theme={theme}>
          <Title theme={theme}>⚙️ Настройки</Title>
            
            <SettingGroup>
              <SettingTitle>Темная тема</SettingTitle>
              <SettingDescription>
                Переключение между светлой и темной темой
              </SettingDescription>
              <ToggleButton $active={isDark} onClick={toggleTheme}>
                {isDark ? '🌙 Темная' : '☀️ Светлая'}
              </ToggleButton>
            </SettingGroup>

            <SettingGroup>
              <SettingTitle>Избранные города ({favorites.length})</SettingTitle>
              <SettingDescription>
                Города, которые вы добавили в избранное
              </SettingDescription>
              {favorites.length > 0 ? (
                <FavoritesList>
                  {favorites.map(city => (
                    <FavoriteCity key={city}>
                      {city}
                      <RemoveButton onClick={() => removeFavorite(city)}>
                        ×
                      </RemoveButton>
                    </FavoriteCity>
                  ))}
                </FavoritesList>
              ) : (
                <p style={{ color: '#666', fontStyle: 'italic' }}>
                  Нет избранных городов
                </p>
              )}
            </SettingGroup>

            <SettingGroup>
              <SettingTitle>История поиска</SettingTitle>
              <SettingDescription>
                Последние {history.length} проверок погоды
              </SettingDescription>
              <Button onClick={handleClearHistory}>
                Очистить историю
              </Button>
            </SettingGroup>

            <SettingGroup>
              <SettingTitle>Данные приложения</SettingTitle>
              <SettingDescription>
                Полная очистка всех сохраненных данных
              </SettingDescription>
              <Button $variant="danger" onClick={handleClearData}>
                Удалить все данные
              </Button>
            </SettingGroup>
          </SettingsCard>

          <Analytics />
        </Content>
      </Container>
  );
};

export default Settings;
