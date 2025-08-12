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
  max-width: 450px;
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
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.95rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 2px solid rgba(116, 185, 255, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.8);
  color: #2d3748;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #74b9ff;
    box-shadow: 0 0 0 3px rgba(116, 185, 255, 0.1);
    background: rgba(255, 255, 255, 1);
  }
`;

const Button = styled.button`
  width: 100%;
  background: linear-gradient(45deg, #74b9ff, #a29bfe);
  color: white;
  border: none;
  padding: 16px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1.1rem;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.6);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const BackLink = styled.button`
  width: 100%;
  background: transparent;
  color: #6a7aa0;
  border: 1px solid rgba(116, 185, 255, 0.3);
  padding: 14px;
  border-radius: 12px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(116, 185, 255, 0.1);
    color: #4a90e2;
    transform: translateY(-2px);
`;

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    // Для демо создаем пользователя с базовыми данными
    const mockUser = {
      id: Date.now().toString(),
      name: 'Пользователь',
      email: 'user@example.com',
      gender: 'male' as const,
      style: 'casual' as const,
      city: 'Санкт-Петербург',
      isRegistered: true
    };

    setUser(mockUser);
    navigate('/home');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>🌸 Вход</Title>
        
        <FormGroup>
          <Label>✉️ Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Введите ваш email"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>🔐 Пароль</Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Введите пароль"
            required
          />
        </FormGroup>

        <Button type="submit">Войти ✨</Button>
        <BackLink type="button" onClick={() => navigate('/')}>
          ← Вернуться на главную
        </BackLink>
      </Form>
    </Container>
  );
};

export default Login;
