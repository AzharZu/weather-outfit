import React, { useState } from 'react';
import styled from 'styled-components';
import { ColorType, COLOR_TYPES, analyzeColorType, analyzePhotoColorType, ColorAnswers } from '../utils/colorAnalysis';

const ColorTypeContainer = styled.div`
  margin: 2rem 0;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
`;

const Title = styled.h3`
  color: white;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AnalysisMethod = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

const MethodButton = styled.button<{ $active: boolean }>`
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #ff6b6b, #ffa500)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 2px solid ${props => props.$active ? '#fff' : 'transparent'};
  border-radius: 15px;
  padding: 1rem 1.5rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #ff6b6b, #ffa500)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const PhotoUpload = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadButton = styled.label`
  display: inline-block;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 15px;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
`;

const QuestionnaireForm = styled.div`
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Question = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 1.5rem;
`;

const QuestionTitle = styled.h4`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.1rem;
`;

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 0.8rem;
`;

const OptionButton = styled.button<{ $selected: boolean }>`
  background: ${props => props.$selected 
    ? 'linear-gradient(135deg, #ff6b6b, #ffa500)' 
    : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.$selected ? '#fff' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 10px;
  padding: 0.8rem;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  
  &:hover {
    background: ${props => props.$selected 
      ? 'linear-gradient(135deg, #ff6b6b, #ffa500)' 
      : 'rgba(255, 255, 255, 0.2)'};
  }
`;

const AnalyzeButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  border: none;
  border-radius: 15px;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 auto;
  display: block;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
  border-radius: 20px;
  padding: 2rem;
  margin-top: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ColorTypeName = styled.h2`
  color: white;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #ff6b6b, #ffa500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Description = styled.p`
  color: white;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  text-align: center;
  font-style: italic;
`;

const ColorSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  color: white;
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
`;

const ColorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const ColorChip = styled.span<{ $type: 'base' | 'accent' | 'avoid' }>`
  background: ${props => {
    switch(props.$type) {
      case 'base': return 'rgba(102, 126, 234, 0.3)';
      case 'accent': return 'rgba(255, 107, 107, 0.3)';
      case 'avoid': return 'rgba(128, 128, 128, 0.3)';
    }
  }};
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const CombinationCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 0.8rem;
  border-left: 4px solid #ff6b6b;
`;

const StyleAdvice = styled.div`
  background: rgba(255, 215, 0, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border-left: 4px solid #ffd700;
`;

interface Props {
  onColorTypeAnalyzed?: (colorType: ColorType) => void;
}

const ColorTypeAnalyzer: React.FC<Props> = ({ onColorTypeAnalyzed }) => {
  const [method, setMethod] = useState<'photo' | 'questionnaire'>('questionnaire');
  const [result, setResult] = useState<ColorType | null>(null);
  const [loading, setLoading] = useState(false);
  
    // Состояние для анкеты
  const [skinTone, setSkinTone] = useState<'warm' | 'cool' | 'neutral' | null>(null);
  const [hairColor, setHairColor] = useState<'blonde' | 'brown' | 'black' | 'red' | 'gray' | null>(null);
  const [eyeColor, setEyeColor] = useState<'blue' | 'green' | 'brown' | 'hazel' | 'gray' | null>(null);
  const [contrast, setContrast] = useState<'high' | 'medium' | 'low' | null>(null);
  const [veins, setVeins] = useState<'blue' | 'green' | 'both' | null>(null);
  const [jewelry, setJewelry] = useState<'gold' | 'silver' | 'both' | null>(null);
  const [sunReaction, setSunReaction] = useState<'burns' | 'tans' | 'both' | null>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const colorType = await analyzePhotoColorType(file);
      setResult(colorType);
      onColorTypeAnalyzed?.(colorType);
    } catch (error) {
      console.error('Ошибка анализа фото:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuestionnaireAnalysis = () => {
    if (!skinTone || !hairColor || !eyeColor || !contrast || !veins || !jewelry || !sunReaction) return;

    const answers: ColorAnswers = {
      skinTone,
      hairColor,
      eyeColor,
      veins,
      jewelry,
      sunReaction,
      whiteColor: 'pure' // по умолчанию
    };

    const colorAnalysis = analyzeColorType(answers);
    setResult(colorAnalysis.type);
    onColorTypeAnalyzed?.(colorAnalysis.type);
  };

  const canAnalyze = skinTone && hairColor && eyeColor && contrast && veins && jewelry && sunReaction;
  const colorAnalysis = result ? COLOR_TYPES[result] : null;

  return (
    <ColorTypeContainer>
      <Title>🎨 Определение цветотипа</Title>
      
      <AnalysisMethod>
        <MethodButton 
          $active={method === 'photo'} 
          onClick={() => setMethod('photo')}
        >
          📸 По фото
        </MethodButton>
        <MethodButton 
          $active={method === 'questionnaire'} 
          onClick={() => setMethod('questionnaire')}
        >
          📝 Опросник
        </MethodButton>
      </AnalysisMethod>

      {method === 'photo' ? (
        <PhotoUpload>
          <p style={{ color: 'white', marginBottom: '1rem', opacity: 0.8 }}>
            Загрузите селфи при естественном освещении
          </p>
          <FileInput
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />
          <UploadButton htmlFor="photo-upload">
            {loading ? 'Анализируем...' : '📸 Выберите фото'}
          </UploadButton>
        </PhotoUpload>
      ) : (
        <QuestionnaireForm>
          <Question>
            <QuestionTitle>Тон кожи</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={skinTone === 'warm'} 
                onClick={() => setSkinTone('warm')}
              >
                Тёплый (золотистый)
              </OptionButton>
              <OptionButton 
                $selected={skinTone === 'cool'} 
                onClick={() => setSkinTone('cool')}
              >
                Холодный (розоватый)
              </OptionButton>
              <OptionButton 
                $selected={skinTone === 'neutral'} 
                onClick={() => setSkinTone('neutral')}
              >
                Нейтральный
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Цвет волос</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={hairColor === 'blonde'} 
                onClick={() => setHairColor('blonde')}
              >
                Блондин
              </OptionButton>
              <OptionButton 
                $selected={hairColor === 'brown'} 
                onClick={() => setHairColor('brown')}
              >
                Шатен
              </OptionButton>
              <OptionButton 
                $selected={hairColor === 'black'} 
                onClick={() => setHairColor('black')}
              >
                Брюнет
              </OptionButton>
              <OptionButton 
                $selected={hairColor === 'red'} 
                onClick={() => setHairColor('red')}
              >
                Рыжий
              </OptionButton>
              <OptionButton 
                $selected={hairColor === 'gray'} 
                onClick={() => setHairColor('gray')}
              >
                Седой
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Цвет глаз</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={eyeColor === 'blue'} 
                onClick={() => setEyeColor('blue')}
              >
                Голубые
              </OptionButton>
              <OptionButton 
                $selected={eyeColor === 'green'} 
                onClick={() => setEyeColor('green')}
              >
                Зелёные
              </OptionButton>
              <OptionButton 
                $selected={eyeColor === 'brown'} 
                onClick={() => setEyeColor('brown')}
              >
                Карие
              </OptionButton>
              <OptionButton 
                $selected={eyeColor === 'hazel'} 
                onClick={() => setEyeColor('hazel')}
              >
                Ореховые
              </OptionButton>
              <OptionButton 
                $selected={eyeColor === 'gray'} 
                onClick={() => setEyeColor('gray')}
              >
                Серые
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Контрастность внешности</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={contrast === 'high'} 
                onClick={() => setContrast('high')}
              >
                Высокая (яркая)
              </OptionButton>
              <OptionButton 
                $selected={contrast === 'medium'} 
                onClick={() => setContrast('medium')}
              >
                Средняя
              </OptionButton>
              <OptionButton 
                $selected={contrast === 'low'} 
                onClick={() => setContrast('low')}
              >
                Низкая (мягкая)
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Цвет вен на запястье</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={veins === 'blue'} 
                onClick={() => setVeins('blue')}
              >
                Синие/фиолетовые
              </OptionButton>
              <OptionButton 
                $selected={veins === 'green'} 
                onClick={() => setVeins('green')}
              >
                Зелёные
              </OptionButton>
              <OptionButton 
                $selected={veins === 'both'} 
                onClick={() => setVeins('both')}
              >
                И те, и другие
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Какие украшения тебе больше идут?</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={jewelry === 'gold'} 
                onClick={() => setJewelry('gold')}
              >
                Золотые
              </OptionButton>
              <OptionButton 
                $selected={jewelry === 'silver'} 
                onClick={() => setJewelry('silver')}
              >
                Серебряные
              </OptionButton>
              <OptionButton 
                $selected={jewelry === 'both'} 
                onClick={() => setJewelry('both')}
              >
                Оба одинаково
              </OptionButton>
            </OptionsGrid>
          </Question>

          <Question>
            <QuestionTitle>Как реагирует кожа на солнце?</QuestionTitle>
            <OptionsGrid>
              <OptionButton 
                $selected={sunReaction === 'burns'} 
                onClick={() => setSunReaction('burns')}
              >
                Быстро обгорает
              </OptionButton>
              <OptionButton 
                $selected={sunReaction === 'tans'} 
                onClick={() => setSunReaction('tans')}
              >
                Легко загорает
              </OptionButton>
              <OptionButton 
                $selected={sunReaction === 'both'} 
                onClick={() => setSunReaction('both')}
              >
                Сначала обгорает, потом загорает
              </OptionButton>
            </OptionsGrid>
          </Question>

          <AnalyzeButton 
            onClick={handleQuestionnaireAnalysis}
            disabled={!canAnalyze}
          >
            ✨ Определить цветотип
          </AnalyzeButton>
        </QuestionnaireForm>
      )}

      {colorAnalysis && (
        <ResultCard>
          <ColorTypeName>{colorAnalysis.name}</ColorTypeName>
          <Description>{colorAnalysis.description}</Description>
          
          <ColorSection>
            <SectionTitle>🎯 Твои базовые цвета</SectionTitle>
            <ColorList>
              {colorAnalysis.baseColors.map((color: string, index: number) => (
                <ColorChip key={index} $type="base">{color}</ColorChip>
              ))}
            </ColorList>
          </ColorSection>

          <ColorSection>
            <SectionTitle>✨ Акцентные цвета</SectionTitle>
            <ColorList>
              {colorAnalysis.accentColors.map((color: string, index: number) => (
                <ColorChip key={index} $type="accent">{color}</ColorChip>
              ))}
            </ColorList>
          </ColorSection>

          <ColorSection>
            <SectionTitle>❌ Избегай эти цвета</SectionTitle>
            <ColorList>
              {colorAnalysis.avoidColors.map((color: string, index: number) => (
                <ColorChip key={index} $type="avoid">{color}</ColorChip>
              ))}
            </ColorList>
          </ColorSection>

          <ColorSection>
            <SectionTitle>🔥 Сочетания для вау-эффекта</SectionTitle>
            {colorAnalysis.wowCombinations.map((combination: string, index: number) => (
              <CombinationCard key={index}>
                <div style={{ color: 'white', fontSize: '0.95rem', lineHeight: 1.4 }}>
                  {combination}
                </div>
              </CombinationCard>
            ))}
          </ColorSection>

          <StyleAdvice>
            <SectionTitle>💡 Секрет твоего стиля</SectionTitle>
            <p style={{ color: 'white', margin: 0, lineHeight: 1.5 }}>
              {result === 'winter' ? 
                'Ты — яркий зимний тип. Оставь пастель другим — тебе нужен контраст. Чёрное пальто, белый свитер, красный акцент — и ты как сцена из «Дьявол носит Prada».' :
                'Твой цветотип открывает множество возможностей для создания потрясающих образов!'
              }
            </p>
            <ColorSection>
              <SectionTitle>💄 Макияж</SectionTitle>
              <p style={{ color: 'white', fontSize: '0.9rem', opacity: 0.9 }}>
                <strong>Тональная основа:</strong> {colorAnalysis.makeup.foundation}<br/>
                <strong>Губы:</strong> {colorAnalysis.makeup.lipColors.join(', ')}<br/>
                <strong>Глаза:</strong> {colorAnalysis.makeup.eyeColors.join(', ')}
              </p>
            </ColorSection>
          </StyleAdvice>
        </ResultCard>
      )}
    </ColorTypeContainer>
  );
};

export default ColorTypeAnalyzer;
