import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';

const Nav = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #6fa8dc;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)<{ $isActive: boolean }>`
  text-decoration: none;
  color: ${props => props.$isActive ? '#6fa8dc' : '#333'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 8px 15px;
  border-radius: 18px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #6fa8dc;
    color: white;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  color: #333;
  font-weight: 500;
`;

const LogoutButton = styled.button`
  background: transparent;
  color: #e53e3e;
  border: 1px solid #e53e3e;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e53e3e;
    color: white;
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
        <Logo>WeatherFit �️</Logo>
        
        <NavLinks>
          <NavLink to="/home" $isActive={location.pathname === '/home'}>
            Главная
          </NavLink>
          <NavLink to="/weather" $isActive={location.pathname === '/weather'}>
            Погода
          </NavLink>
          <NavLink to="/profile" $isActive={location.pathname === '/profile'}>
            Профиль
          </NavLink>
        </NavLinks>

        <UserSection>
          <UserName>{user.name}</UserName>
          <LogoutButton onClick={handleLogout}>
            Выйти
          </LogoutButton>
        </UserSection>
      </NavContainer>
    </Nav>
  );
};

export default Navigation;
