import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import WeatherBasic from '../components/WeatherBasic';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(120deg, #6fa8dc 0%, #8b7ed8 50%, #c27ba0 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hero = styled.div`
  text-align: center;
  color: white;
  margin-bottom: 40px;
  max-width: 750px;
`;

const Title = styled.h1`
  font-size: 2.8rem;
  margin-bottom: 18px;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 25px;
  opacity: 0.95;
  line-height: 1.4;
`;

const AuthSection = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 35px;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  backdrop-filter: blur(5px);
`;

const Button = styled(Link)`
  display: inline-block;
  background: #6fa8dc;
  color: white;
  padding: 12px 28px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: 500;
  margin: 0 8px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
  
  &:hover {
    background: #5a95c9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const BasicWeatherSection = styled.div`
  background: rgba(255, 255, 255, 0.92);
  border-radius: 15px;
  padding: 25px;
  width: 100%;
  max-width: 650px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.12);
`;

const SectionTitle = styled.h2`
  color: #444;
  margin-bottom: 18px;
  text-align: center;
  font-weight: 500;
`;

const Landing: React.FC = () => {
  const { user } = useUser() as { user: { isRegistered?: boolean; name?: string } };

  // Если пользователь уже авторизован, перенаправляем на главную
  if (user?.isRegistered) {
    return (
      <Container>
        <Hero>
          <Title>Добро пожаловать, {user?.name ?? 'Пользователь'}! 👋</Title>
          <Button to="/home">Перейти к приложению</Button>
        </Hero>
      </Container>
    );
  }

  return (
    <Container>
      <Hero>
        <Title>WeatherFit �️�</Title>
        <Subtitle>
          Не знаешь что надеть? Я подскажу что одеть по погоде и твоему стилю!
        </Subtitle>
      </Hero>

      <AuthSection>
        <h2>Хочешь крутые советы по одежде?</h2>
        <p style={{ marginBottom: '1.5rem', color: '#555' }}>
          Регистрируйся и получай советы что надеть исходя из твоего стиля и погоды! 
        </p>
        <Button to="/register">Зарегистрироваться</Button>
        <Button to="/login">Войти</Button>
      </AuthSection>

      <BasicWeatherSection>
        <SectionTitle>
          Или просто попробуй без регистрации
        </SectionTitle>
        <WeatherBasic />
      </BasicWeatherSection>
    </Container>
  );
};

export default Landing;
