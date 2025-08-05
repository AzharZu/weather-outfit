import React from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #6fa8dc 0%, #8b7ed8 50%, #c27ba0 100%);
`;

const Content = styled.div`
  padding: 25px;
  max-width: 1100px;
  margin: 0 auto;
`;

const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 28px;
  margin-bottom: 30px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const UserInfo = styled.div`
  background: #f7fafc;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const InfoValue = styled.span`
  color: #2d3748;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

const ActionCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0,0,0,0.15);
  }
`;

const ActionIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ActionTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const ActionDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const Home: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // проверяем есть ли юзер
  if (!user?.isRegistered) {
    navigate('/');
    return null;
  }

  // функция для стиля (casual или elegant)
  const getStyleText = (style: string) => {
    return style === 'casual' ? 'Обычный' : 'Стильный';
  };

  // функция для пола
  const getGenderText = (gender: string) => {
    switch(gender) {
      case 'male': return 'М';
      case 'female': return 'Ж';
      default: return 'Другое';
    }
  };

  return (
    <Container>
      <Navigation />
      <Content>
        <WelcomeCard>
          <Title>Привет, {user.name}! 👋</Title>
          <p>Готов узнать что надеть сегодня?</p>
        </WelcomeCard>

        <UserInfo>
          <h3 style={{ marginBottom: '15px', color: '#333' }}>Твой профиль</h3>
          <InfoRow>
            <InfoLabel>Имя:</InfoLabel>
            <InfoValue>{user.name}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Пол:</InfoLabel>
            <InfoValue>{getGenderText(user.gender)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Стиль:</InfoLabel>
            <InfoValue>{getStyleText(user.style)}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>Город:</InfoLabel>
            <InfoValue>{user.city}</InfoValue>
          </InfoRow>
        </UserInfo>

        <QuickActions>
          <ActionCard onClick={() => navigate('/weather')}>
            <ActionIcon>🌤️</ActionIcon>
            <ActionTitle>Погода</ActionTitle>
            <ActionDescription>
              Узнай что надеть по погоде в твоем городе
            </ActionDescription>
          </ActionCard>

          <ActionCard onClick={() => navigate('/profile')}>
            <ActionIcon>⚙️</ActionIcon>
            <ActionTitle>Настройки</ActionTitle>
            <ActionDescription>
              Изменить свои данные
            </ActionDescription>
          </ActionCard>

          <ActionCard onClick={() => navigate('/weather')}>
            <ActionIcon>🗺️</ActionIcon>
            <ActionTitle>Другой город</ActionTitle>
            <ActionDescription>
              Проверить погоду в другом месте
            </ActionDescription>
          </ActionCard>
        </QuickActions>
      </Content>
    </Container>
  );
};

export default Home;
