import React from 'react';
import styled from 'styled-components';
import Navigation from '../components/Navigation';
import OutfitHistory from '../components/OutfitHistory';

const HistoryPageContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const MainContent = styled.main`
  padding: 2rem;
  padding-top: 100px;
  max-width: 1000px;
  margin: 0 auto;
`;

const PageTitle = styled.h1`
  font-family: 'Comfortaa', cursive;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.4);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const PageSubtitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  color: white;
  opacity: 0.95;
  margin-bottom: 3rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
`;

const HistoryPage: React.FC = () => {
  return (
    <HistoryPageContainer>
      <Navigation />
      <MainContent>
        <PageTitle>📚 История ваших образов</PageTitle>
        <PageSubtitle>
          Посмотрите все ваши стильные решения и вдохновитесь прошлыми образами
        </PageSubtitle>
        <OutfitHistory />
      </MainContent>
    </HistoryPageContainer>
  );
};

export default HistoryPage;
