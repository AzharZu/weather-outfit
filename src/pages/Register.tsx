import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const Form = styled.form`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const Button = styled.button`
  width: 100%;
  background: #667eea;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 1rem;
  
  &:hover {
    background: #5a67d8;
  }
`;

const BackLink = styled.button`
  width: 100%;
  background: transparent;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  
  const [formData, setFormData] = useState({
    name: '',
    gender: 'male' as 'male' | 'female' | 'other',
    style: 'casual' as 'casual' | 'elegant',
    city: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: formData.name,
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
          <Label>Как тебя зовут?</Label>
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
          <Label>Пол</Label>
          <Select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male">М</option>
            <option value="female">Ж</option>
            <option value="other">Другое</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Какой стиль нравится?</Label>
          <Select name="style" value={formData.style} onChange={handleChange}>
            <option value="casual">Обычный (джинсы, футболки)</option>
            <option value="elegant">Стильный (красиво одеваюсь)</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Твой город</Label>
          <Input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Например: Москва"
            required
          />
        </FormGroup>

        <Button type="submit">Регистрация</Button>
        <BackLink type="button" onClick={() => navigate('/')}>
          Вернуться на главную
        </BackLink>
      </Form>
    </Container>
  );
};

export default Register;
