import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import { getMoodIcon, MOODS, MoodType } from '../utils/moods';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  font-family: 'Nunito', sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const MainContent = styled.main`
  padding: 2rem;
  padding-top: 100px;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  color: #ffffff;
  text-shadow: 0 0 20px rgba(120, 119, 198, 0.5);
`;

const WelcomeTitle = styled.h1`
  font-family: 'Nunito', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 1rem 0;
  background: linear-gradient(45deg, #ffffff, #7777c6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: none;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  font-weight: 400;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
  font-family: 'Nunito', sans-serif;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: rgba(15, 15, 30, 0.8);
  border-radius: 20px;
  padding: 2rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(120, 119, 198, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #7777c6, #ff77c6);
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 50px rgba(120, 119, 198, 0.4);
    border-color: rgba(120, 119, 198, 0.5);
  }
`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  text-align: center;
  filter: drop-shadow(0 0 10px rgba(120, 119, 198, 0.5));
`;

const CardTitle = styled.h3`
  font-family: 'Nunito', sans-serif;
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-align: center;
  text-shadow: 0 0 15px rgba(120, 119, 198, 0.5);
`;

const CardDescription = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
  text-align: center;
  font-family: 'Nunito', sans-serif;
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
`;

const MoodCard = styled.div<{ $isSelected?: boolean }>`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  border: 2px solid ${props => props.$isSelected ? '#4a90e2' : 'rgba(116, 185, 255, 0.2)'};
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    border-color: #4a90e2;
    box-shadow: 0 8px 25px rgba(74, 144, 226, 0.2);
    background: rgba(255, 255, 255, 1);
  }
`;

const MoodIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.8rem;
`;

const MoodTitle = styled.h3`
  font-family: 'Comfortaa', cursive;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 3rem 0;
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(116, 185, 255, 0.3);
  border-radius: 15px;
  padding: 1.5rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    border-color: #4a90e2;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(74, 144, 226, 0.2);
    color: #4a90e2;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ActionIcon = styled.span`
  font-size: 1.5rem;
`;

const Home: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<MoodType>('business-lady');

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'weather':
        navigate('/weather');
        break;
      case 'wardrobe':
        navigate('/profile');
        break;
      case 'history':
        navigate('/outfit-history');
        break;
      case 'settings':
        navigate('/settings');
        break;
    }
  };

  const dashboardItems = [
    {
      icon: '🌤️',
      title: 'Weather Forecast',
      description: 'Check current weather and get outfit recommendations',
      action: 'weather'
    },
    {
      icon: '👕',
      title: 'My Wardrobe',
      description: 'Manage your clothing items and color preferences',
      action: 'wardrobe'
    },
    {
      icon: '📚',
      title: 'Outfit History',
      description: 'View your previous outfit choices and favorites',
      action: 'history'
    },
    {
      icon: '⚙️',
      title: 'Settings',
      description: 'Customize your preferences and notifications',
      action: 'settings'
    }
  ];

  return (
    <HomeContainer>
      <Navigation />
      <MainContent>
        <WelcomeSection>
          <WelcomeTitle>
            Добро пожаловать{user?.name ? `, ${user.name}` : ''}! 🌟
          </WelcomeTitle>
          <WelcomeSubtitle>
            Создайте идеальный образ с учетом погоды и вашего настроения
          </WelcomeSubtitle>
        </WelcomeSection>

        <DashboardGrid>
          {dashboardItems.map((item, index) => (
            <Card key={index} onClick={() => handleQuickAction(item.action)}>
              <CardIcon>{item.icon}</CardIcon>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </DashboardGrid>

        <WelcomeSection style={{ marginTop: '3rem' }}>
          <WelcomeTitle style={{ fontSize: '2rem' }}>
            Выберите настроение дня 🎭
          </WelcomeTitle>
          <WelcomeSubtitle>
            Мы подберем идеальный стиль под ваше настроение
          </WelcomeSubtitle>
        </WelcomeSection>

        <MoodGrid>
          {MOODS.map((mood) => (
            <MoodCard
              key={mood.id}
              $isSelected={selectedMood === mood.id}
              onClick={() => setSelectedMood(mood.id)}
            >
              <MoodIcon>{getMoodIcon(mood.id)}</MoodIcon>
              <MoodTitle>{mood.name}</MoodTitle>
            </MoodCard>
          ))}
        </MoodGrid>

        <QuickActions>
          <ActionButton onClick={() => navigate('/weather')}>
            <ActionIcon>🌈</ActionIcon>
            Получить рекомендации
          </ActionButton>
          <ActionButton onClick={() => navigate('/profile')}>
            <ActionIcon>🎨</ActionIcon>
            Цветотип
          </ActionButton>
          <ActionButton onClick={() => navigate('/outfit-history')}>
            <ActionIcon>📚</ActionIcon>
            История образов
          </ActionButton>
        </QuickActions>
      </MainContent>
    </HomeContainer>
  );
};

export default Home;
