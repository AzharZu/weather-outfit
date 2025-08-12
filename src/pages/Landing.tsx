import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import WeatherBasic from '../components/WeatherBasic';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const Hero = styled.div`
  text-align: center;
  color: #ffffff;
  margin-bottom: 3rem;
  max-width: 600px;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  font-family: 'Comfortaa', sans-serif;
  color: #ffffff;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 2rem;
  color: #e8e8e8;
  line-height: 1.6;
  font-weight: 400;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const AuthSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(116, 185, 255, 0.2);
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
  max-width: 400px;
`;

const Button = styled(Link)`
  display: inline-block;
  background: linear-gradient(45deg, #74b9ff, #a29bfe);
  color: white;
  padding: 14px 28px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  margin: 0 0.5rem;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.6);
  }
`;

const BasicWeatherSection = styled.div`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  max-width: 600px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(116, 185, 255, 0.2);
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
`;

const SectionTitle = styled.h2`
  color: #030706ff;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.8rem;
  font-family: 'Comfortaa', sans-serif;
  text-shadow: 0 2px 4px rgba(74, 144, 226, 0.1);
`;

const Landing: React.FC = () => {
  const { user } = useUser() as { user: { isRegistered?: boolean; name?: string } };
  // const { theme } = useTheme();
  const theme = {
    background: '#fafafa',
    text: '#2d3748',
    textSecondary: '#6a7aa0',
    primary: '#4a90e2',
    border: '#e2e8f0'
  };

  // Если пользователь уже авторизован, перенаправляем на главную
  if (user?.isRegistered) {
    return (
      <Container theme={theme}>
        <Hero theme={theme}>
          <Title theme={theme}>Добро пожаловать, {user?.name ?? 'Пользователь'}! 👋</Title>
          <Button theme={theme} to="/home">Перейти к приложению</Button>
        </Hero>
      </Container>
    );
  }

  return (
    <Container theme={theme}>
      <Hero theme={theme}>
        <Title theme={theme}>WeatherFit ☁️✨</Title>
        <Subtitle theme={theme}>
          Персональный стилист в кармане. Узнай что надеть по погоде и настроению!
        </Subtitle>
      </Hero>

      <AuthSection theme={theme}>
        <h2 style={{ color: theme.text, marginBottom: '1rem', fontWeight: 600 }}>Начни стильное путешествие</h2>
        <p style={{ marginBottom: '1.5rem', color: theme.textSecondary }}>
          Получай персональные рекомендации по стилю на основе погоды и твоего настроения
        </p>
        <div>
          <Button theme={theme} to="/register">Зарегистрироваться</Button>
          <Button theme={theme} to="/login" style={{ marginLeft: '0.5rem' }}>Войти</Button>
        </div>
      </AuthSection>

      <BasicWeatherSection theme={theme}>
        <SectionTitle theme={theme}>
          Или просто проверь погоду
        </SectionTitle>
        <WeatherBasic />
      </BasicWeatherSection>
    </Container>
  );
};

export default Landing;
