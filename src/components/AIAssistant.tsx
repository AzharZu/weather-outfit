import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { PersonalRemark, generatePersonalRemarks } from '../utils/aiAssistant';
import { User } from '../contexts/UserContext';
import { WeatherData } from '../services/weatherService';
import { ColorType } from '../utils/colorAnalysis';
import { MoodType } from '../utils/moods';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const sparkle = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
`;

const AIContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  color: white;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
    transform: rotate(45deg);
    animation: ${sparkle} 3s ease-in-out infinite;
  }
`;

const AIHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
`;

const AIAvatar = styled.div`
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #ff6b9d, #c44569);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  animation: ${sparkle} 2s ease-in-out infinite;
`;

const AIInfo = styled.div`
  flex: 1;
`;

const AIName = styled.h3`
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 700;
`;

const AIRole = styled.p`
  margin: 0;
  opacity: 0.9;
  font-size: 1rem;
`;

const RemarksContainer = styled.div`
  position: relative;
  z-index: 1;
`;

const RemarkCard = styled.div<{ $priority: number }>`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${props => 
    props.$priority <= 2 ? '#ff6b9d' : 
    props.$priority <= 3 ? '#ffd93e' : '#6c5ce7'
  };
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.2);
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RemarkHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const RemarkEmoji = styled.span`
  font-size: 1.5rem;
  animation: ${sparkle} 2s ease-in-out infinite;
`;

const RemarkType = styled.span<{ $priority: number }>`
  background: ${props => 
    props.$priority <= 2 ? '#ff6b9d' : 
    props.$priority <= 3 ? '#ffd93e' : '#6c5ce7'
  };
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const RemarkMessage = styled.p`
  margin: 0;
  line-height: 1.6;
  font-size: 1rem;
`;

const ToggleButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  margin-bottom: 1rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }
`;

const LoadingAnimation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem;
`;

const LoadingDot = styled.div<{ $delay: number }>`
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  animation: ${sparkle} 1s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

interface AIAssistantProps {
  user: User;
  weather: WeatherData;
  colorType?: ColorType;
  currentMood?: MoodType;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ 
  user, 
  weather, 
  colorType, 
  currentMood 
}) => {
  const [remarks, setRemarks] = useState<PersonalRemark[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Симуляция "размышления" AI
    setIsLoading(true);
    const timer = setTimeout(() => {
      const newRemarks = generatePersonalRemarks(user, weather, currentMood || 'business-lady', colorType);
      setRemarks(newRemarks);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [user, weather, colorType, currentMood]);

  const sortedRemarks = remarks.sort((a, b) => a.priority - b.priority);

  return (
    <AIContainer>
      <AIHeader>
        <AIAvatar>🤖</AIAvatar>
        <AIInfo>
          <AIName>Ася - твой AI стилист</AIName>
          <AIRole>Персональный консультант по стилю и красоте</AIRole>
        </AIInfo>
      </AIHeader>

      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? '🔽 Свернуть советы' : '🔼 Показать мои советы'}
      </ToggleButton>

      {isExpanded && (
        <RemarksContainer>
          {isLoading ? (
            <LoadingAnimation>
              <span style={{ marginRight: '1rem' }}>Ася анализирует твой стиль...</span>
              <LoadingDot $delay={0} />
              <LoadingDot $delay={0.2} />
              <LoadingDot $delay={0.4} />
            </LoadingAnimation>
          ) : (
            sortedRemarks.map((remark) => (
              <RemarkCard key={remark.category + '-' + remark.priority + '-' + remark.icon} $priority={remark.priority}>
                <RemarkHeader>
                  <RemarkEmoji>{remark.icon}</RemarkEmoji>
                  <RemarkType $priority={remark.priority}>
                    {remark.category === 'color' ? 'цвет' :
                     remark.category === 'weather' ? 'погода' :
                     remark.category === 'mood' ? 'настроение' :
                     remark.category === 'outfit' ? 'образ' : 'стиль'}
                  </RemarkType>
                </RemarkHeader>
                <RemarkMessage>{remark.text}</RemarkMessage>
              </RemarkCard>
            ))
          )}
        </RemarksContainer>
      )}
    </AIContainer>
  );
};

export default AIAssistant;
