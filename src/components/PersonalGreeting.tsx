import React from 'react';
import styled, { keyframes } from 'styled-components';
import { User } from '../context/UserContext';

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const GreetingCard = styled.div`
  background: linear-gradient(135deg, #D9C9B7 0%, #A5B29F 100%);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    animation: ${float} 6s ease-in-out infinite;
  }
`;

const GreetingHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 1;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const GreetingText = styled.div`
  flex: 1;
`;

const GreetingTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const GreetingSubtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 0;
  font-weight: 500;
`;

const GreetingMessage = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  margin: 1rem 0 0 0;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  font-style: italic;
`;

const StatsRow = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  @media (max-width: 600px) {
    padding: 0.75rem;
  }
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

interface PersonalGreetingProps {
  user: User;
}

const PersonalGreeting: React.FC<PersonalGreetingProps> = ({ user }) => {
  const getGreetingTime = () => {
    const hour = new Date().getHours();
    if (hour < 6) return 'Доброй ночи';
    if (hour < 12) return 'Доброе утро';
    if (hour < 18) return 'Добрый день';
    return 'Добрый вечер';
  };

  const getGreetingMessage = () => {
    const messages = [
      'Сегодня тебя ждёт уютный день с кофейным оттенком.',
      'Время создавать стильные образы и покорять мир!',
      'Новый день - новые возможности для самовыражения.',
      'Сегодня твой стиль заиграет новыми красками!',
      'Пора показать миру свою индивидуальность.'
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };

  const getDaysUsing = () => {
    return Math.floor(Math.random() * 30) + 1;
  };

  const getOutfitsCreated = () => {
    return Math.floor(Math.random() * 50) + 5;
  };

  return (
    <GreetingCard>
      <GreetingHeader>
        <Avatar>
          {user.name.charAt(0).toUpperCase()}
        </Avatar>
        <GreetingText>
          <GreetingTitle>
            {getGreetingTime()}, {user.name}! ✨
          </GreetingTitle>
          <GreetingSubtitle>
            {user.style === 'elegant' ? 'Элегантная' : 'Стильная'} как всегда
          </GreetingSubtitle>
        </GreetingText>
      </GreetingHeader>
      
      <GreetingMessage>
        {getGreetingMessage()}
      </GreetingMessage>

      <StatsRow>
        <StatItem>
          <StatNumber>{getDaysUsing()}</StatNumber>
          <StatLabel>Дней с нами</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{getOutfitsCreated()}</StatNumber>
          <StatLabel>Образов создано</StatLabel>
        </StatItem>
        <StatItem>
          <StatNumber>{user.colorType ? '1' : '0'}</StatNumber>
          <StatLabel>Цветотип определен</StatLabel>
        </StatItem>
      </StatsRow>
    </GreetingCard>
  );
};

export default PersonalGreeting;
