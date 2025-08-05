import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Content = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button<{ $variant?: 'primary' | 'danger' }>`
  flex: 1;
  background: ${props => 
    props.$variant === 'danger' ? '#e53e3e' : '#667eea'
  };
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  
  &:hover {
    background: ${props => 
      props.$variant === 'danger' ? '#c53030' : '#5a67d8'
    };
  }
`;

const SuccessMessage = styled.div`
  background: #c6f6d5;
  color: #22543d;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
`;

const Profile: React.FC = () => {
  const { user, updateUser, logout } = useUser();
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    gender: user?.gender || 'male',
    style: user?.style || 'casual',
    city: user?.city || ''
  });

  if (!user?.isRegistered) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateUser({
      name: formData.name,
      gender: formData.gender as 'male' | 'female' | 'other',
      style: formData.style as 'casual' | 'elegant',
      city: formData.city
    });

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <Container>
      <Navigation />
      <Content>
        <ProfileCard>
          <Title>Мой профиль</Title>
          
          {showSuccess && (
            <SuccessMessage>
              Профиль успешно обновлен!
            </SuccessMessage>
          )}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Имя</Label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Пол</Label>
              <Select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другой</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Стиль одежды</Label>
              <Select name="style" value={formData.style} onChange={handleChange}>
                <option value="casual">Casual</option>
                <option value="elegant">Elegant</option>
              </Select>
            </FormGroup>

            <FormGroup>
              <Label>Город</Label>
              <Input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Ваш город"
                required
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="submit">
                Сохранить изменения
              </Button>
              <Button type="button" $variant="danger" onClick={handleLogout}>
                Выйти из аккаунта
              </Button>
            </ButtonGroup>
          </Form>

          <div style={{ 
            marginTop: '2rem', 
            padding: '1rem', 
            background: '#f7fafc', 
            borderRadius: '8px' 
          }}>
            <h4 style={{ margin: '0 0 1rem 0', color: '#333' }}>
              Как работают персональные рекомендации?
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
              <li>Учитываем ваш пол для подбора подходящей одежды</li>
              <li>Стиль влияет на тип рекомендуемых вещей</li>
              <li>Город используется для автоматического определения погоды</li>
              <li>Все данные хранятся локально в вашем браузере</li>
            </ul>
          </div>
        </ProfileCard>
      </Content>
    </Container>
  );
};

export default Profile;
