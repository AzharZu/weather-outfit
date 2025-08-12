export type MoodType = 
  | 'business-lady' 
  | 'cozy-coffee' 
  | 'parisian-elegance' 
  | 'rainy-cinema'
  | 'street-confident'
  | 'romantic-dreamy';

export interface Mood {
  id: MoodType;
  name: string;
  emoji: string;
  description: string;
  vibe: string;
}

export const MOODS: Mood[] = [
  {
    id: 'business-lady',
    name: 'Бизнес-леди',
    emoji: '💼',
    description: 'Покоряю офис с утра до вечера',
    vibe: 'Уверенность в каждом шаге, элегантность в каждой детали'
  },
  {
    id: 'cozy-coffee',
    name: 'Кофе на подоконнике',
    emoji: '☕',
    description: 'Уютное утро дома или в любимой кофейне',
    vibe: 'Тепло, комфорт и никакой спешки'
  },
  {
    id: 'parisian-elegance',
    name: 'Парижская элегантность',
    emoji: '💃',
    description: 'Как кадр из французского фильма',
    vibe: 'Шик, изысканность и неповторимый стиль'
  },
  {
    id: 'rainy-cinema',
    name: 'Дождливое кино',
    emoji: '🌧️',
    description: 'Романтичный вечер или меланхоличный день',
    vibe: 'Загадочность и художественная натура'
  },
  {
    id: 'street-confident',
    name: 'Уличная уверенность',
    emoji: '🔥',
    description: 'Яркая, смелая, не как все',
    vibe: 'Энергия молодости и дерзкий стиль'
  },
  {
    id: 'romantic-dreamy',
    name: 'Романтичная мечтательница',
    emoji: '🌸',
    description: 'Нежность и женственность',
    vibe: 'Мягкость, грация и воздушность'
  }
];

export const getMoodIcon = (moodId: MoodType): string => {
  const mood = MOODS.find(mood => mood.id === moodId);
  return mood?.emoji || '😊';
};
