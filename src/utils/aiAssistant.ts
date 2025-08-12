import { User } from '../contexts/UserContext';
import { WeatherData } from '../services/weatherService';
import { MoodType } from './moods';

// Direct type definition to avoid circular imports
export type ColorType = 'spring' | 'summer' | 'autumn' | 'winter';

export interface PersonalRemark {
  priority: number;
  icon: string;
  text: string;
  category: 'outfit' | 'style' | 'mood' | 'weather' | 'color';
}

// Функция получения стилевых комментариев
function getStyleComment(name: string, style: string): string {
  switch (style) {
    case 'casual':
      return `${name}, твой casual-стиль говорит о твоей уверенности и комфорте! Сегодня добавь яркий аксессуар для настроения! ✨`;
    case 'elegant':
      return `${name}, элегантность - твоя суперсила! Сегодня ты можешь позволить себе смелый цвет или необычную деталь! 💎`;
    case 'sporty':
      return `${name}, твой спортивный стиль заряжает энергией! Сегодня попробуй стильные кроссовки с неожиданным нарядом! ⚡`;
    case 'business':
      return `${name}, деловой стиль - это твоя броня успеха! Добавь что-то личное - яркую помаду или стильные часы! 💼`;
    default:
      return `${name}, твой уникальный стиль - это то, что делает тебя особенной! Сегодня прислушайся к своему сердцу! 💫`;
  }
}

// Функция получения комментариев по настроению
function getMoodComment(name: string, mood: MoodType): string {
  switch (mood) {
    case 'business-lady':
      return `${name}, сегодня ты - настоящая бизнес-леди! Четкие линии, качественные ткани, продуманные детали. Ты готова покорять деловой мир! �`;
    case 'cozy-coffee':
      return `${name}, уютное кафе и теплый кофе - твоя атмосфера! Мягкие текстуры, спокойные тона и комфорт прежде всего! ☕`;
    case 'parisian-elegance':
      return `${name}, парижская элегантность течет в твоих венах! Изысканные детали, благородные ткани, безупречный вкус! 🥐`;
    case 'rainy-cinema':
      return `${name}, дождливый день - повод для кинематографичного образа! Винтажные детали и загадочная атмосфера! �`;
    case 'street-confident':
      return `${name}, улицы - твоя сцена! Уверенные силуэты, смелые сочетания, характерные детали. Ты готова покорять мир! �`;
    case 'romantic-dreamy':
      return `${name}, романтичность и мечтательность - твоя особая магия! Нежные оттенки, струящиеся ткани, женственные силуэты! 🌸`;
    default:
      return `${name}, твое настроение уникально, как и ты! Прислушайся к себе и создай образ мечты! ✨`;
  }
}

// Функция получения комментариев по цветотипу
function getColorTypeComment(name: string, colorType?: ColorType): string {
  if (!colorType) {
    return `${name}, определи свой цветотип, чтобы всегда выглядеть на все 100%! Это твой секретный код стиля! 🎨`;
  }

  switch (colorType) {
    case 'spring':
      return `${name}-Весна, твои цвета - это персиковые, коралловые, золотистые оттенки! Ты словно утреннее солнце! 🌸`;
    case 'summer':
      return `${name}-Лето, мягкие и прохладные тона - твоя стихия! Лавандовый, пыльная роза, серо-голубой! 🌿`;
    case 'autumn':
      return `${name}-Осень, глубокие и теплые цвета раскрывают твою красоту! Терракотовый, горчичный, оливковый! 🍂`;
    case 'winter':
      return `${name}-Зима, контрастные и яркие цвета - твоя сила! Чистый белый, черный, ярко-красный! ❄️`;
    default:
      return `${name}, каждый цветотип прекрасен по-своему! Найди свой и сияй! 🌈`;
  }
}

// Функция получения погодных комментариев
function getWeatherComment(name: string, weather: WeatherData): string {
  const temp = weather.temperature;

  if (temp < 0) {
    return `${name}, мороз - не повод грустить! Стильные слои, уютные свитера и яркие аксессуары согреют душу! ❄️`;
  } else if (temp < 10) {
    return `${name}, прохладная погода идеальна для многослойности! Играй с текстурами и создавай уютные образы! 🧥`;
  } else if (temp < 20) {
    return `${name}, идеальная температура для экспериментов! Легкая куртка или кардigan + любимые джинсы! 🌤`;
  } else if (temp < 30) {
    return `${name}, теплая погода открывает безграничные возможности! Легкие ткани и яркие принты! ☀️`;
  } else {
    return `${name}, жара - время для воздушных тканей и свежих образов! Лен, хлопок и пастельные оттенки! 🌡`;
  }
}

// Основная функция генерации персональных замечаний
export function generatePersonalRemarks(
  user: User,
  weather: WeatherData,
  mood: MoodType,
  colorType?: ColorType
): PersonalRemark[] {
  const remarks: PersonalRemark[] = [];

  // Приоритет 1: Настроение (самый важный)
  remarks.push({
    priority: 1,
    icon: '💫',
    text: getMoodComment(user.name, mood),
    category: 'mood'
  });

  // Приоритет 2: Погода
  remarks.push({
    priority: 2,
    icon: '🌤',
    text: getWeatherComment(user.name, weather),
    category: 'weather'
  });

  // Приоритет 3: Стиль
  remarks.push({
    priority: 3,
    icon: '👗',
    text: getStyleComment(user.name, user.style),
    category: 'style'
  });

  // Приоритет 4: Цветотип
  remarks.push({
    priority: 4,
    icon: '🎨',
    text: getColorTypeComment(user.name, colorType),
    category: 'color'
  });

  // Приоритет 5: Общий совет
  const generalAdvice = [
    `${user.name}, помни - уверенность это лучший аксессуар! 💪`,
    `${user.name}, твоя индивидуальность - твоя суперсила! ✨`,
    `${user.name}, стиль - это способ сказать кто ты, не произнося ни слова! 👑`,
    `${user.name}, экспериментируй! Мода - это игра, получай удовольствие! 🎭`,
    `${user.name}, качество всегда побеждает количество! Выбирай осознанно! 💎`
  ];

  const randomAdvice = generalAdvice[Math.floor(Math.random() * generalAdvice.length)];
  
  remarks.push({
    priority: 5,
    icon: '💝',
    text: randomAdvice,
    category: 'outfit'
  });

  return remarks.sort((a, b) => a.priority - b.priority);
}
