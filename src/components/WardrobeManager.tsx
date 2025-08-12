import React, { useState } from 'react';
import styled from 'styled-components';

const WardrobeContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(44, 44, 44, 0.05);
  border: 1px solid #E5E5E5;
`;

const Title = styled.h3`
  color: #2C2C2C;
  font-size: 1.375rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const WardrobeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ClothingCard = styled.div`
  background: #F8F8F8;
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-2px);
    border-color: #D9C9B7;
    background: #F0F0F0;
  }
`;

const ItemEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ItemName = styled.h4`
  color: #2C2C2C;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ItemDetails = styled.div`
  color: #666;
  font-size: 0.875rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #D9C9B7, #A5B29F);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(217, 201, 183, 0.4);
  }
`;

interface ClothingItem {
  id: string;
  name: string;
  category: string;
  color: string;
  emoji: string;
  season: string;
}

const WardrobeManager: React.FC = () => {
  const [items] = useState<ClothingItem[]>([
    {
      id: '1',
      name: 'Любимые джинсы',
      category: 'Брюки',
      color: 'Синий',
      emoji: '👖',
      season: 'Всесезон'
    },
    {
      id: '2',
      name: 'Кашемировый свитер',
      category: 'Верх',
      color: 'Бежевый',
      emoji: '🧶',
      season: 'Зима'
    },
    {
      id: '3',
      name: 'Классический блейзер',
      category: 'Верх',
      color: 'Черный',
      emoji: '🧥',
      season: 'Всесезон'
    }
  ]);

  return (
    <WardrobeContainer>
      <Title>👗 Мой гардероб</Title>
      
      <AddButton>
        ➕ Добавить вещь
      </AddButton>

      {items.length > 0 ? (
        <WardrobeGrid>
          {items.map(item => (
            <ClothingCard key={item.id}>
              <ItemEmoji>{item.emoji}</ItemEmoji>
              <ItemName>{item.name}</ItemName>
              <ItemDetails>
                {item.category} • {item.color}<br/>
                {item.season}
              </ItemDetails>
            </ClothingCard>
          ))}
        </WardrobeGrid>
      ) : (
        <EmptyState>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👕</div>
          <p>Ваш гардероб пока пуст</p>
          <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
            Добавьте вещи, чтобы получать персональные рекомендации
          </p>
        </EmptyState>
      )}
    </WardrobeContainer>
  );
};

export default WardrobeManager;
