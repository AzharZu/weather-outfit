import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import styled from 'styled-components';

// Типы для цветотипа
type ColorSeason = 'spring' | 'summer' | 'autumn' | 'winter';

interface ColorType {
  season: ColorSeason;
  name: string;
  description: string;
  colors: string[];
  recommendations: string[];
}

const colorTypes: Record<ColorSeason, ColorType> = {
  spring: {
    season: 'spring',
    name: 'Яркая весна',
    description: 'Теплые, яркие и чистые цвета',
    colors: ['#FF6B6B', '#FFE66D', '#FF8E53', '#4ECDC4', '#45B7D1', '#A8E6CF'],
    recommendations: [
      'Яркие, насыщенные цвета',
      'Теплые оттенки золота и кораллов',
      'Избегайте приглушенных и темных тонов',
      'Идеальны: персиковый, коралловый, золотистый'
    ]
  },
  summer: {
    season: 'summer',
    name: 'Мягкое лето', 
    description: 'Холодные, приглушенные и мягкие тона',
    colors: ['#B8D8D8', '#E6B8B8', '#D8B8E6', '#B8E6D8', '#C4C4E6', '#F0C4C4'],
    recommendations: [
      'Мягкие, пудровые оттенки',
      'Холодные тона с серым подтоном',
      'Избегайте ярких и теплых цветов',
      'Идеальны: розовый, лавандовый, мятный'
    ]
  },
  autumn: {
    season: 'autumn',
    name: 'Глубокая осень',
    description: 'Теплые, насыщенные земляные тона',
    colors: ['#8B4513', '#DAA520', '#CD853F', '#A0522D', '#D2691E', '#B8860B'],
    recommendations: [
      'Теплые, насыщенные цвета',
      'Земляные и природные оттенки',
      'Избегайте холодных и пастельных тонов',
      'Идеальны: терракотовый, горчичный, оливковый'
    ]
  },
  winter: {
    season: 'winter',
    name: 'Ясная зима',
    description: 'Контрастные, холодные и четкие цвета',
    colors: ['#000080', '#DC143C', '#800080', '#008B8B', '#2F4F4F', '#4B0082'],
    recommendations: [
      'Контрастные, насыщенные цвета',
      'Холодные тона без примесей',
      'Черный и белый как базовые',
      'Идеальны: королевский синий, изумрудный, фуксия'
    ]
  }
};

// Вопросы для определения цветотипа
const colorQuestions = [
  {
    id: 1,
    question: 'Какой у вас натуральный цвет волос?',
    options: [
      { value: 'light_warm', text: 'Светлый с золотистым отливом', points: { spring: 2, autumn: 1 } },
      { value: 'light_cool', text: 'Светлый с пепельным отливом', points: { summer: 2, winter: 1 } },
      { value: 'medium_warm', text: 'Каштановый с рыжим отливом', points: { autumn: 2, spring: 1 } },
      { value: 'medium_cool', text: 'Каштановый с пепельным отливом', points: { summer: 1, winter: 2 } },
      { value: 'dark', text: 'Темный/черный', points: { winter: 2, autumn: 1 } }
    ]
  },
  {
    id: 2,
    question: 'Какой у вас цвет глаз?',
    options: [
      { value: 'blue_light', text: 'Голубые, светло-синие', points: { summer: 2, winter: 1 } },
      { value: 'blue_dark', text: 'Темно-синие, сапфировые', points: { winter: 2, summer: 1 } },
      { value: 'green_warm', text: 'Зеленые с золотыми вкраплениями', points: { spring: 2, autumn: 1 } },
      { value: 'green_cool', text: 'Серо-зеленые, изумрудные', points: { summer: 1, winter: 2 } },
      { value: 'brown_warm', text: 'Карие с янтарным отливом', points: { autumn: 2, spring: 1 } },
      { value: 'brown_cool', text: 'Темно-карие, почти черные', points: { winter: 2, autumn: 1 } }
    ]
  },
  {
    id: 3,
    question: 'Какой у вас тон кожи?',
    options: [
      { value: 'light_warm', text: 'Светлый с персиковым/золотистым подтоном', points: { spring: 2, summer: 0 } },
      { value: 'light_cool', text: 'Светлый с розовым подтоном', points: { summer: 2, spring: 0 } },
      { value: 'medium_warm', text: 'Средний с желтым/оливковым подтоном', points: { autumn: 2, spring: 1 } },
      { value: 'medium_cool', text: 'Средний с нейтральным подтоном', points: { summer: 1, winter: 1 } },
      { value: 'dark', text: 'Темный', points: { winter: 2, autumn: 1 } }
    ]
  },
  {
    id: 4,
    question: 'Как ваша кожа реагирует на солнце?',
    options: [
      { value: 'burns_easy', text: 'Быстро обгораю, плохо загораю', points: { summer: 2, winter: 1 } },
      { value: 'burns_tans', text: 'Сначала обгораю, потом загораю', points: { spring: 1, summer: 1 } },
      { value: 'tans_well', text: 'Хорошо загораю, редко обгораю', points: { autumn: 2, spring: 1 } },
      { value: 'tans_deep', text: 'Легко получаю глубокий загар', points: { autumn: 1, winter: 2 } }
    ]
  },
  {
    id: 5,
    question: 'Какие украшения вам больше идут?',
    options: [
      { value: 'gold', text: 'Золотые украшения', points: { spring: 2, autumn: 2 } },
      { value: 'silver', text: 'Серебряные украшения', points: { summer: 2, winter: 2 } },
      { value: 'both', text: 'И золотые, и серебряные', points: { spring: 1, summer: 1, autumn: 1, winter: 1 } }
    ]
  }
];

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Nunito', sans-serif;
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const Header = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
  background: linear-gradient(45deg, #ffffff, #7777c6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-family: 'Nunito', sans-serif;
  position: relative;
  z-index: 1;
`;

const TabBar = styled.div`
  display: flex;
  background: rgba(15, 15, 30, 0.8);
  border-radius: 20px;
  padding: 8px;
  margin-bottom: 2rem;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(120, 119, 198, 0.3);
  position: relative;
  z-index: 1;
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  background: ${props => props.active ? 'linear-gradient(45deg, #7777c6, #ff77c6)' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.7)'};
  font-weight: ${props => props.active ? '700' : '500'};
  border-radius: 15px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 8px 25px rgba(120, 119, 198, 0.4)' : 'none'};
  
  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #7777c6, #ff77c6)' : 
      'rgba(120, 119, 198, 0.2)'
    };
    color: #ffffff;
  }

  &:hover {
    background: ${props => props.active ? 
      'linear-gradient(45deg, #7777c6, #ff77c6)' : 
      'rgba(120, 119, 198, 0.2)'
    };
    color: #ffffff;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(15, 15, 30, 0.8);
  padding: 2rem;
  border-radius: 20px;
  border: 1px solid rgba(120, 119, 198, 0.3);
  backdrop-filter: blur(15px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 1;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const FieldLabel = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
  font-family: 'Nunito', sans-serif;
  text-shadow: 0 0 10px rgba(120, 119, 198, 0.5);
`;

const FieldInput = styled.input`
  padding: 14px 18px;
  border: 2px solid rgba(120, 119, 198, 0.3);
  border-radius: 15px;
  font-size: 1rem;
  font-family: 'Nunito', sans-serif;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #7777c6;
    box-shadow: 0 0 20px rgba(120, 119, 198, 0.3);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const ActionButton = styled.button<{ variant?: 'primary' | 'danger' }>`
  padding: 14px 28px;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => 
    props.variant === 'danger' 
      ? 'linear-gradient(45deg, #ff7675, #fd79a8)' 
      : 'linear-gradient(45deg, #74b9ff, #a29bfe)'
  };
  color: white;
  box-shadow: 0 4px 15px ${props => 
    props.variant === 'danger' 
      ? 'rgba(255, 118, 117, 0.4)' 
      : 'rgba(116, 185, 255, 0.4)'
  };

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px ${props => 
      props.variant === 'danger' 
        ? 'rgba(255, 118, 117, 0.6)' 
        : 'rgba(116, 185, 255, 0.6)'
    };
  }
`;

const ColorSection = styled.div`
  padding: 2rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  border: 1px solid rgba(116, 185, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.15);
  text-align: center;
`;

const QuizContainer = styled.div`
  text-align: left;
  margin-top: 2rem;
`;

const Question = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border: 2px solid rgba(116, 185, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(116, 185, 255, 0.1);
`;

const QuestionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #2d3748;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const OptionButton = styled.button<{ selected: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.selected ? '#74b9ff' : 'rgba(116, 185, 255, 0.3)'};
  border-radius: 12px;
  background: ${props => props.selected ? 'rgba(116, 185, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
  text-align: left;
  cursor: pointer;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  color: ${props => props.selected ? '#2d3748' : '#2d3748'};

  &:hover {
    border-color: #74b9ff;
    background: rgba(116, 185, 255, 0.1);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(116, 185, 255, 0.2);
  }
`;

const ResultCard = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 2px solid #74b9ff;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  text-align: center;
  box-shadow: 0 8px 32px rgba(116, 185, 255, 0.2);
`;

const ColorTypeName = styled.h2`
  color: #4a90e2;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-family: 'Comfortaa', sans-serif;
  text-shadow: 0 2px 4px rgba(74, 144, 226, 0.2);
`;

const ColorTypeDescription = styled.p`
  color: #2d3748;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  font-style: italic;
  font-family: 'M PLUS Rounded 1c', sans-serif;
`;

const ColorPalette = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;
  flex-wrap: wrap;
`;

const ColorSwatch = styled.div<{ color: string }>`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${props => props.color};
  border: 3px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const RecommendationsList = styled.ul`
  text-align: left;
  margin: 1.5rem 0;
  padding-left: 1.5rem;
  color: #2d3748;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  
  li {
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const PhotoUploadSection = styled.div`
  margin-top: 2rem;
  padding: 2rem;
  border: 2px dashed rgba(116, 185, 255, 0.4);
  border-radius: 16px;
  text-align: center;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
`;

const UploadButton = styled.input`
  display: none;
`;

const UploadLabel = styled.label`
  display: inline-block;
  padding: 12px 24px;
  background: linear-gradient(45deg, #74b9ff, #a29bfe);
  color: white;
  border-radius: 12px;
  cursor: pointer;
  font-family: 'M PLUS Rounded 1c', sans-serif;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(116, 185, 255, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(116, 185, 255, 0.6);
  }
`;

const PreviewImage = styled.img`
  max-width: 200px;
  max-height: 200px;
  border-radius: 16px;
  margin-top: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  border: 3px solid rgba(255, 255, 255, 0.8);
`;

const Profile: React.FC = () => {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'colors'>('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  
  // Состояние для цветотипа
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [colorTypeResult, setColorTypeResult] = useState<ColorType | null>(null);
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    updateUser({ ...formData });
    setSuccessMessage('Профиль обновлен!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Обработчик ответов на вопросы
  const handleAnswerSelect = (questionId: number, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  // Переход к следующему вопросу
  const handleNextQuestion = () => {
    if (currentQuestion < colorQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateColorType();
    }
  };

  // Расчет цветотипа на основе ответов
  const calculateColorType = () => {
    const scores: Record<ColorSeason, number> = {
      spring: 0,
      summer: 0,
      autumn: 0,
      winter: 0
    };

    // Подсчитываем баллы
    Object.entries(answers).forEach(([questionId, selectedValue]) => {
      const question = colorQuestions.find(q => q.id === parseInt(questionId));
      if (!question) return;
      
      const option = (question.options as any[]).find((opt: any) => opt.value === selectedValue);
      
      if (option) {
        Object.entries(option.points).forEach(([season, points]) => {
          scores[season as ColorSeason] += points as number;
        });
      }
    });

    // Находим цветотип с максимальным количеством баллов
    const winningColorType = Object.entries(scores).reduce((prev, current) => 
      current[1] > prev[1] ? current : prev
    )[0] as ColorSeason;

    const result = colorTypes[winningColorType];
    setColorTypeResult(result);
    setShowResult(true);

    // Сохраняем результат в профиль пользователя
    updateUser({ 
      colorType: result.season,
      colorPalette: result.colors 
    });
  };

  // Загрузка фото
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Сброс теста
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setColorTypeResult(null);
    setShowQuiz(true);
  };

  // Показать результат из сохраненных данных пользователя
  const showSavedColorType = () => {
    if (user?.colorType) {
      const savedResult = colorTypes[user.colorType as ColorSeason];
      setColorTypeResult(savedResult);
      setShowResult(true);
      setShowQuiz(false);
    }
  };

  return (
    <>
      <Navigation />
      <Container>
        <Header>Профиль</Header>
        
        <TabBar>
          <TabButton 
            active={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          >
            Основное
          </TabButton>
          <TabButton 
            active={activeTab === 'colors'} 
            onClick={() => setActiveTab('colors')}
          >
            Цветотип
          </TabButton>
        </TabBar>

        {activeTab === 'profile' && (
          <div>
            {successMessage && (
              <div style={{
                background: '#c6f6d5',
                color: '#22543d',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {successMessage}
              </div>
            )}

            <Form>
              <Field>
                <FieldLabel>Имя</FieldLabel>
                <FieldInput
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Field>

              <Field>
                <FieldLabel>Возраст</FieldLabel>
                <FieldInput
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                />
              </Field>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <ActionButton onClick={handleSave}>
                  Сохранить
                </ActionButton>
                <ActionButton variant="danger" onClick={handleLogout}>
                  Выйти
                </ActionButton>
              </div>
            </Form>
          </div>
        )}

        {activeTab === 'colors' && (
          <ColorSection>
            {user?.colorType && !showQuiz && !showResult ? (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Ваш цветотип определен</h2>
                <p style={{ color: '#8e8e8e', marginBottom: '2rem' }}>
                  Цветотип: <strong>{colorTypes[user.colorType as ColorSeason].name}</strong>
                </p>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <ActionButton onClick={showSavedColorType}>
                    Посмотреть результат
                  </ActionButton>
                  <ActionButton onClick={resetQuiz}>
                    Пройти тест заново
                  </ActionButton>
                </div>
              </div>
            ) : !showQuiz && !showResult ? (
              <div>
                <h2 style={{ marginBottom: '1rem' }}>Определение цветотипа</h2>
                <p style={{ color: '#8e8e8e', marginBottom: '2rem' }}>
                  Узнайте свой цветотип с помощью интерактивного теста или загрузите фото
                </p>
                
                <PhotoUploadSection>
                  <h3 style={{ marginBottom: '1rem' }}>Загрузите ваше фото</h3>
                  <p style={{ color: '#8e8e8e', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                    Фото поможет лучше определить ваш цветотип
                  </p>
                  <UploadLabel htmlFor="photo-upload">
                    Выбрать фото
                  </UploadLabel>
                  <UploadButton
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                  />
                  {uploadedPhoto && (
                    <PreviewImage src={uploadedPhoto} alt="Uploaded" />
                  )}
                </PhotoUploadSection>

                <div style={{ margin: '2rem 0' }}>
                  <ActionButton onClick={() => setShowQuiz(true)}>
                    Пройти тест
                  </ActionButton>
                </div>
              </div>
            ) : showQuiz && !showResult ? (
              <QuizContainer>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                  <h2>Тест на определение цветотипа</h2>
                  <p style={{ color: '#8e8e8e' }}>
                    Вопрос {currentQuestion + 1} из {colorQuestions.length}
                  </p>
                </div>

                {colorQuestions.map((question, index) => (
                  index === currentQuestion && (
                    <Question key={question.id}>
                      <QuestionTitle>{question.question}</QuestionTitle>
                      <OptionsList>
                        {question.options.map((option) => (
                          <OptionButton
                            key={option.value}
                            selected={answers[question.id] === option.value}
                            onClick={() => handleAnswerSelect(question.id, option.value)}
                          >
                            {option.text}
                          </OptionButton>
                        ))}
                      </OptionsList>
                    </Question>
                  )
                ))}

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                  <ActionButton
                    onClick={handleNextQuestion}
                    disabled={!answers[colorQuestions[currentQuestion].id]}
                    style={{
                      opacity: answers[colorQuestions[currentQuestion].id] ? 1 : 0.5,
                      cursor: answers[colorQuestions[currentQuestion].id] ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {currentQuestion < colorQuestions.length - 1 ? 'Следующий вопрос' : 'Получить результат'}
                  </ActionButton>
                </div>
              </QuizContainer>
            ) : showResult && colorTypeResult ? (
              <ResultCard>
                <ColorTypeName>{colorTypeResult.name}</ColorTypeName>
                <ColorTypeDescription>{colorTypeResult.description}</ColorTypeDescription>
                
                <ColorPalette>
                  {colorTypeResult.colors.map((color, index) => (
                    <ColorSwatch key={index} color={color} />
                  ))}
                </ColorPalette>

                <RecommendationsList>
                  {colorTypeResult.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </RecommendationsList>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <ActionButton onClick={resetQuiz}>
                    Пройти тест заново
                  </ActionButton>
                  <ActionButton onClick={() => setActiveTab('profile')}>
                    К профилю
                  </ActionButton>
                </div>
              </ResultCard>
            ) : null}
          </ColorSection>
        )}
      </Container>
    </>
  );
};

export default Profile;
