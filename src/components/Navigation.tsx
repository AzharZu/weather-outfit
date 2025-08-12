import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(116, 185, 255, 0.2);
  border-radius: 20px;
  margin: 20px auto;
  max-width: 1000px;
  padding: 15px 30px;
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
  position: sticky;
  top: 20px;
  z-index: 100;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Logo = styled.div`
  font-family: 'Comfortaa', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  color: #2d3748;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 2px 4px rgba(116, 185, 255, 0.3);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  background: rgba(116, 185, 255, 0.08);
  padding: 6px;
  border-radius: 16px;
  border: 1px solid rgba(116, 185, 255, 0.2);
  flex-shrink: 0;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? '#ffffff' : '#2d3748'};
  background: ${props => props.$isActive ? 'linear-gradient(45deg, #74b9ff, #a29bfe)' : 'transparent'};
  font-weight: ${props => props.$isActive ? '600' : '500'};
  padding: 12px 18px;
  border-radius: 12px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  white-space: nowrap;
  
  &:hover {
    background: ${props => props.$isActive ? 'linear-gradient(45deg, #74b9ff, #a29bfe)' : 'rgba(116, 185, 255, 0.15)'};
    color: ${props => props.$isActive ? '#ffffff' : '#1a202c'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(116, 185, 255, 0.25);
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  min-width: 200px;
  justify-content: flex-end;
`;

const UserName = styled.span`
  color: #2d3748;
  font-weight: 600;
  font-size: 1rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(116, 185, 255, 0.2);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LogoutButton = styled.button`
  background: rgba(255, 107, 107, 0.12);
  color: #e53e3e;
  border: 1.5px solid rgba(255, 107, 107, 0.4);
  padding: 10px 18px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 107, 107, 0.2);
    color: #c53030;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 107, 107, 0.35);
    border-color: rgba(255, 107, 107, 0.6);
  }
`;

const Navigation: React.FC = () => {
  const { user, logout } = useUser();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (!user?.isRegistered) {
    return null;
  }

  return (
    <Nav>
      <NavContainer>
        <Logo>
          🌸 WeatherFit
        </Logo>
        
        <NavLinks>
          <NavLink to="/home" $isActive={location.pathname === '/home'}>
            🏠 Главная
          </NavLink>
          <NavLink to="/weather" $isActive={location.pathname === '/weather'}>
            ☁️ Погода
          </NavLink>
          <NavLink to="/outfit-history" $isActive={location.pathname === '/outfit-history'}>
            📚 История
          </NavLink>
          <NavLink to="/profile" $isActive={location.pathname === '/profile'}>
            👤 Профиль
          </NavLink>
          <NavLink to="/settings" $isActive={location.pathname === '/settings'}>
            ⚙️ Настройки
          </NavLink>
        </NavLinks>

        <UserSection>
          <UserName>✨ {user.name}</UserName>
          <LogoutButton onClick={handleLogout}>
            Выйти
          </LogoutButton>
        </UserSection>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
