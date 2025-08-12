import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getAnalytics } from '../hooks/useAnalytics';

const AnalyticsContainer = styled.div`
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

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  text-align: center;
  backdrop-filter: blur(10px);
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  color: #7777c6;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 20px rgba(120, 119, 198, 0.6);
`;

const StatLabel = styled.div`
  color: #ffffff;
  font-size: 1rem;
  margin-top: 0.5rem;
  font-family: 'Nunito', sans-serif;
`;

const Analytics: React.FC = () => {
  const [stats, setStats] = useState({
    totalVisits: 0,
    uniquePages: 0,
    lastVisit: 0
  });

  useEffect(() => {
    const updateStats = () => {
      const analytics = getAnalytics();
      setStats(analytics);
    };

    updateStats();
    
    // Обновляем каждую минуту
    const interval = setInterval(updateStats, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'Нет данных';
    return new Date(timestamp).toLocaleString('ru-RU');
  };

  return (
    <AnalyticsContainer>
      <Title>📊 Статистика посещений</Title>
      
      <StatCard>
        <StatNumber>{stats.totalVisits}</StatNumber>
        <StatLabel>Всего посещений</StatLabel>
      </StatCard>

      <StatCard>
        <StatNumber>{stats.uniquePages}</StatNumber>
        <StatLabel>Уникальных страниц</StatLabel>
      </StatCard>

      <StatCard>
        <StatLabel>Последнее посещение:</StatLabel>
        <StatLabel style={{ color: '#7777c6', marginTop: '0.5rem' }}>
          {formatDate(stats.lastVisit)}
        </StatLabel>
      </StatCard>
    </AnalyticsContainer>
  );
};

export default Analytics;
