import React from 'react';
import styled from 'styled-components';
import { StylistRecommendation } from '../utils/stylistRecommendations';

const StylistCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border-radius: 25px;
  padding: 2.5rem;
  margin: 2rem 0;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const StylistTitle = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const VibeSection = styled.div`
  background: rgba(255, 182, 193, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #ff6b6b;
`;

const VibeText = styled.p`
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  font-style: italic;
  font-weight: 500;
`;

const MainLookSection = styled.div`
  background: rgba(106, 90, 205, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #6a5acd;
`;

const SectionTitle = styled.h3`
  color: white;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const MainLookText = styled.p`
  color: white;
  font-size: 1.1rem;
  margin: 0;
  font-weight: 500;
`;

const AlternativesSection = styled.div`
  margin-bottom: 1.5rem;
`;

const AlternativesList = styled.div`
  display: grid;
  gap: 0.8rem;
`;

const AlternativeItem = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  color: white;
  border-left: 3px solid #ffa500;
`;

const StylistNoteSection = styled.div`
  background: rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #ffd700;
`;

const StylistNote = styled.p`
  color: white;
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

const WeatherWisdom = styled.div`
  background: rgba(135, 206, 235, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #87ceeb;
`;

const ColorTipSection = styled.div`
  background: rgba(255, 192, 203, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid #ffb6c1;
`;

const ConfidenceBoost = styled.div`
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.3), rgba(255, 165, 0, 0.3));
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: center;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;

const ConfidenceText = styled.p`
  color: white;
  font-size: 1.1rem;
  line-height: 1.5;
  margin: 0;
  font-weight: 600;
`;

const ItemsSection = styled.div`
  margin-top: 2rem;
`;

const ItemsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-top: 1rem;
`;

const ItemCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ItemCategory = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ItemEmoji = styled.span`
  font-size: 1.5rem;
`;

const CategoryName = styled.h4`
  color: white;
  font-size: 1.2rem;
  margin: 0;
  font-weight: 600;
`;

const ItemMain = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.8rem;
`;

const ItemAlternatives = styled.div`
  margin-bottom: 0.8rem;
`;

const AlternativesTitle = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const AlternativeText = styled.div`
  color: rgba(255, 209, 164, 0.9);
  font-size: 0.95rem;
  padding: 0.3rem 0;
`;

const WhyThisWorks = styled.div`
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-style: italic;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

interface Props {
  recommendation: StylistRecommendation;
}

const StylistRecommendationCard: React.FC<Props> = ({ recommendation }) => {
  return (
    <StylistCard>
      <StylistTitle>👗 {recommendation.title} 👗</StylistTitle>
      
      <VibeSection>
        <VibeText>{recommendation.vibe}</VibeText>
      </VibeSection>

      <MainLookSection>
        <SectionTitle>✨ Главный образ</SectionTitle>
        <MainLookText>{recommendation.mainLook}</MainLookText>
      </MainLookSection>

      <AlternativesSection>
        <SectionTitle>🔄 Альтернативы</SectionTitle>
        <AlternativesList>
          {recommendation.alternatives.map((alt, index) => (
            <AlternativeItem key={index}>
              {alt}
            </AlternativeItem>
          ))}
        </AlternativesList>
      </AlternativesSection>

      <StylistNoteSection>
        <SectionTitle>💡 Секрет от стилиста</SectionTitle>
        <StylistNote>{recommendation.stylistNote}</StylistNote>
      </StylistNoteSection>

      <WeatherWisdom>
        <SectionTitle>🌤️ Погодная мудрость</SectionTitle>
        <StylistNote>{recommendation.weatherWisdom}</StylistNote>
      </WeatherWisdom>

      {recommendation.colorTip && (
        <ColorTipSection>
          <SectionTitle>🎨 Цветовая магия</SectionTitle>
          <StylistNote>{recommendation.colorTip}</StylistNote>
        </ColorTipSection>
      )}

      <ConfidenceBoost>
        <SectionTitle>💪 Заряд уверенности</SectionTitle>
        <ConfidenceText>{recommendation.confidenceBoost}</ConfidenceText>
      </ConfidenceBoost>

      <ItemsSection>
        <SectionTitle>👚 Детали образа</SectionTitle>
        <ItemsGrid>
          {recommendation.items.map((item, index) => (
            <ItemCard key={index}>
              <ItemCategory>
                <ItemEmoji>{item.emoji}</ItemEmoji>
                <CategoryName>{item.category}</CategoryName>
              </ItemCategory>
              
              <ItemMain>💎 {item.main}</ItemMain>
              
              <ItemAlternatives>
                <AlternativesTitle>Или попробуй:</AlternativesTitle>
                {item.alternatives.map((alt, altIndex) => (
                  <AlternativeText key={altIndex}>• {alt}</AlternativeText>
                ))}
              </ItemAlternatives>
              
              <WhyThisWorks>
                💭 Почему это работает: {item.whyThisWorks}
              </WhyThisWorks>
            </ItemCard>
          ))}
        </ItemsGrid>
      </ItemsSection>
    </StylistCard>
  );
};

export default StylistRecommendationCard;
