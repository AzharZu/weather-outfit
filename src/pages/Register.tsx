import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const Form = styled.form`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(116, 185, 255, 0.2);
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  color: #4a90e2;
  font-weight: 700;
  font-size: 2.2rem;
  font-family: 'Comfortaa', sans-serif;
  text-shadow: 0 2px 4px rgba(74, 144, 226, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &::before {
    content: '✨';
    font-size: 1.5rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #4a90e2;
  font-size: 1rem;
  font-family: 'Comfortaa', cursive;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid rgba(116, 185, 255, 0.3);
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #74b9ff;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
  
  &::placeholder {
    color: #999;
    font-style: italic;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem 1.2rem;
  border: 2px solid rgba(116, 185, 255, 0.3);
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  color: #333;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #74b9ff;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;
const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #74b9ff, #4a90e2);
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  font-family: 'Comfortaa', cursive;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.4);
    background: linear-gradient(135deg, #4a90e2, #74b9ff);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  
  &::before {
    content: '🎉';
    font-size: 1rem;
  }
`;

const BackLink = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  color: #4a90e2;
  border: 2px solid rgba(116, 185, 255, 0.3);
  padding: 0.9rem;
  border-radius: 15px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background: rgba(116, 185, 255, 0.1);
    border-color: #74b9ff;
    transform: translateY(-1px);
  }
  
  &::before {
    content: '🏠';
    font-size: 1rem;
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'male' as 'male' | 'female' | 'other',
    style: 'casual' as 'casual' | 'elegant',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.city) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      style: formData.style,
      city: formData.city,
      isRegistered: true
    };

    setUser(newUser);
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Регистрация</Title>
        
        <FormGroup>
          <Label>Как тебя зовут? 👋</Label>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Твое имя"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Твоя почта 📧</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Пол 👤</Label>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">Мужской</option>
            <option value="female">Женский</option>
            <option value="other">Другое</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Какой стиль нравится? 👗</Label>
          <Select name="style" value={formData.style} onChange={handleChange}>
            <option value="casual">Обычный (джинсы, футболки)</option>
            <option value="elegant">Стильный (красиво одеваюсь)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Твой город 🏙️</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Например: Москва"
            required
          />
        </FormGroup>

        <Button type="submit">
          Регистрация
        </Button>
        <BackLink type="button" onClick={() => navigate('/')}>
          Вернуться на главную
        </BackLink>
      </Form>
    </Container>
  );
};

export default Register;
