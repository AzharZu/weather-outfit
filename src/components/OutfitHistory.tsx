import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const HistoryContainer = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(116, 185, 255, 0.2);
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const Title = styled.h3`
  color: #2d3748;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Comfortaa', sans-serif;
  text-shadow: 0 2px 4px rgba(74, 144, 226, 0.1);
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
  
  /* Anime scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(116, 185, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #74b9ff, #a29bfe);
    border-radius: 10px;
  }
`;

const HistoryCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid rgba(116, 185, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    border-color: rgba(116, 185, 255, 0.4);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.2);
  }
`;

const HistoryDate = styled.div`
  color: #4a90e2;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 0.8rem;
`;

const HistoryContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
`;

const OutfitInfo = styled.div`
  flex: 1;
`;

const OutfitName = styled.h4`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const OutfitDetails = styled.div`
  color: #6a7aa0;
  font-size: 0.9rem;
  font-weight: 400;
`;

const WeatherInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  color: #4a90e2;
  font-weight: 500;
  min-width: 60px;
`;

const WeatherIcon = styled.div`
  font-size: 1.5rem;
`;

const WeatherTemp = styled.div`
  font-size: 0.9rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #6a7aa0;
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
  margin: 0;
`;

interface HistoryEntry {
  id: string;
  date: string;
  outfit: string;
  weather: {
    temperature: number;
    condition: string;
    icon: string;
  };
  mood: string;
}

const OutfitHistory: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    // Загрузка истории из localStorage или API
    const savedHistory = localStorage.getItem('outfit-history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    } else {
      // Mock данные для демонстрации
      setHistory([
        {
          id: '1',
          date: '2024-12-10',
          outfit: 'Бизнес-леди: черный блейзер + белая блуза',
          weather: {
            temperature: 15,
            condition: 'облачно',
            icon: '☁️'
          },
          mood: 'Деловое настроение'
        },
        {
          id: '2',
          date: '2024-12-09',
          outfit: 'Уютный кофе: оверсайз свитер + джинсы',
          weather: {
            temperature: 8,
            condition: 'дождь',
            icon: '🌧️'
          },
          mood: 'Домашний уют'
        },
        {
          id: '3',
          date: '2024-12-08',
          outfit: 'Парижская элегантность: тренч + платье',
          weather: {
            temperature: 12,
            condition: 'переменная облачность',
            icon: '⛅'
          },
          mood: 'Романтично'
        },
        {
          id: '4',
          date: '2024-12-07',
          outfit: 'Спортивный шик: кроссовки + куртка',
          weather: {
            temperature: 5,
            condition: 'солнечно',
            icon: '☀️'
          },
          mood: 'Активный день'
        },
        {
          id: '5',
          date: '2024-12-06',
          outfit: 'Вечерняя элегантность: коктейльное платье',
          weather: {
            temperature: 18,
            condition: 'ясно',
            icon: '🌙'
          },
          mood: 'Романтичный вечер'
        }
      ]);
    }
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <HistoryContainer>
      <Title>📚 История образов</Title>
      
      {history.length > 0 ? (
        <HistoryList>
          {history.map(entry => (
            <HistoryCard key={entry.id}>
              <HistoryDate>{formatDate(entry.date)}</HistoryDate>
              <HistoryContent>
                <OutfitInfo>
                  <OutfitName>{entry.outfit}</OutfitName>
                  <OutfitDetails>{entry.mood}</OutfitDetails>
                </OutfitInfo>
                <WeatherInfo>
                  <WeatherIcon>{entry.weather.icon}</WeatherIcon>
                  <WeatherTemp>{entry.weather.temperature}°</WeatherTemp>
                </WeatherInfo>
              </HistoryContent>
            </HistoryCard>
          ))}
        </HistoryList>
      ) : (
        <EmptyState>
          <EmptyIcon>📖</EmptyIcon>
          <EmptyText>История образов пока пуста</EmptyText>
          <EmptySubtext>
            Используйте приложение, чтобы накопить историю ваших стильных решений
          </EmptySubtext>
        </EmptyState>
      )}
    </HistoryContainer>
  );
};

export default OutfitHistory;
