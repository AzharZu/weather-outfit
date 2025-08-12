import React, { useState } from 'react';
import styled from 'styled-components';
import { MOODS, MoodType } from '../utils/moods';

const MoodContainer = styled.div`
  background: rgba(15, 15, 30, 0.8);
  border-radius: 20px;
  padding: 2rem;
  margin: 2rem 0;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(120, 119, 198, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
`;

const Title = styled.h3`
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 15px rgba(120, 119, 198, 0.5);
`;

const MoodGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const MoodCard = styled.div<{ $isSelected: boolean }>`
  background: ${props => props.$isSelected 
    ? 'linear-gradient(45deg, #7777c6, #ff77c6)' 
    : 'rgba(255, 255, 255, 0.08)'};
  border: 2px solid ${props => props.$isSelected ? '#7777c6' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 16px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    transform: translateY(-5px);
    background: ${props => props.$isSelected 
      ? 'linear-gradient(45deg, #7777c6, #ff77c6)' 
      : 'rgba(255, 255, 255, 0.12)'};
    box-shadow: 0 8px 25px rgba(120, 119, 198, 0.3);
  }
`;

const MoodEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.3));
`;

const MoodName = styled.h4`
  color: ${props => (props as any).$isSelected ? 'white' : '#ffffff'};
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Nunito', sans-serif;
  text-shadow: ${props => (props as any).$isSelected ? 'none' : '0 0 8px rgba(255, 255, 255, 0.3)'};
`;

const MoodDescription = styled.p`
  color: ${props => (props as any).$isSelected ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.8)'};
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-family: 'Nunito', sans-serif;
`;

const MoodVibe = styled.p`
  color: ${props => (props as any).$isSelected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.6)'};
  font-size: 0.8rem;
  font-style: italic;
  font-family: 'Nunito', sans-serif;
`;

const QuickMoodButton = styled.button`
  background: rgba(120, 119, 198, 0.2);
  border: 1px solid rgba(120, 119, 198, 0.3);
  color: #ffffff;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  margin: 0 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Nunito', sans-serif;
  font-weight: 500;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(120, 119, 198, 0.3);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(120, 119, 198, 0.4);
  }
`;

interface Props {
  selectedMood: MoodType | null;
  onMoodSelect: (mood: MoodType | null) => void;
}

const MoodOfTheDay: React.FC<Props> = ({ selectedMood, onMoodSelect }) => {
  const [showAll, setShowAll] = useState(false);

  const handleMoodClick = (moodId: MoodType) => {
    if (selectedMood === moodId) {
      onMoodSelect(null); // Убрать выбор
    } else {
      onMoodSelect(moodId);
    }
  };

  const quickMoods: MoodType[] = ['business-lady', 'cozy-coffee', 'parisian-elegance'];
  const displayMoods = showAll ? MOODS : MOODS.filter(mood => quickMoods.includes(mood.id));

  return (
    <MoodContainer>
      <Title>🌟 Какое у тебя настроение сегодня?</Title>
      
      {!showAll && (
        <div>
          <Title>Или выбери быстро:</Title>
          {MOODS.filter(mood => !quickMoods.includes(mood.id)).map(mood => (
            <MoodCard
              key={mood.id}
              $isSelected={selectedMood === mood.id}
              onClick={() => handleMoodClick(mood.id)}
            >
              <MoodEmoji>{mood.emoji}</MoodEmoji>
              <MoodName>{mood.name}</MoodName>
              <MoodDescription>{mood.description}</MoodDescription>
              <MoodVibe>{mood.vibe}</MoodVibe>
            </MoodCard>
          ))}
        </div>
      )}

      <MoodGrid>
        {displayMoods.map(mood => (
          <MoodCard
            key={mood.id}
            $isSelected={selectedMood === mood.id}
            onClick={() => handleMoodClick(mood.id)}
          >
            <MoodEmoji>{mood.emoji}</MoodEmoji>
            <MoodName>{mood.name}</MoodName>
            <MoodDescription>{mood.description}</MoodDescription>
            <MoodVibe>{mood.vibe}</MoodVibe>
          </MoodCard>
        ))}
      </MoodGrid>

      <div style={{ textAlign: 'center' }}>
        <QuickMoodButton onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Свернуть' : 'Все настроения'} {showAll ? '↑' : '↓'}
        </QuickMoodButton>
        {selectedMood && (
          <QuickMoodButton onClick={() => onMoodSelect(null)}>
            Сбросить выбор ✕
          </QuickMoodButton>
        )}
      </div>
    </MoodContainer>
  );
};

export default MoodOfTheDay;
