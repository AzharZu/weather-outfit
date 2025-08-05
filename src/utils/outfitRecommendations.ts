import { User } from '../context/UserContext';
import { WeatherData } from '../services/weatherService';

export interface OutfitRecommendation {
  category: string;
  items: string[];
  icon: string;
  priority: number;
}

export const getPersonalizedRecommendations = (
  weather: WeatherData, 
  user: User
): OutfitRecommendation[] => {
  const { temperature, humidity, windSpeed } = weather;
  const { gender, style } = user;
  
  const recommendations: OutfitRecommendation[] = [];

  // Основная одежда по температуре
  if (temperature < -10) {
    recommendations.push({
      category: 'Верхняя одежда',
      items: [
        'Зимняя куртка или пуховик',
        'Теплый шарф',
        'Зимние перчатки',
        'Теплая шапка'
      ],
      icon: '❄️',
      priority: 1
    });
  } else if (temperature < 0) {
    recommendations.push({
      category: 'Зимняя одежда',
      items: [
        'Зимняя куртка',
        'Шарф',
        'Перчатки',
        style === 'elegant' ? 'Стильная шапка' : 'Теплая шапка'
      ],
      icon: '🥶',
      priority: 1
    });
  } else if (temperature < 10) {
    recommendations.push({
      category: 'Демисезонная одежда',
      items: [
        style === 'elegant' ? 'Пальто или тренч' : 'Куртка или ветровка',
        'Свитер или толстовка',
        style === 'elegant' ? 'Кардиган' : 'Флисовая кофта'
      ],
      icon: '🍂',
      priority: 1
    });
  } else if (temperature < 20) {
    recommendations.push({
      category: 'Прохладная погода',
      items: [
        style === 'elegant' 
          ? (gender === 'female' ? 'Блуза или рубашка' : 'Рубашка')
          : 'Футболка с длинным рукавом',
        style === 'casual' ? 'Джинсы' : 'Классические брюки',
        'Легкая куртка (на случай ветра)'
      ],
      icon: '🌤️',
      priority: 1
    });
  } else if (temperature < 25) {
    recommendations.push({
      category: 'Комфортная температура',
      items: [
        style === 'elegant' 
          ? (gender === 'female' ? 'Легкое платье' : 'Рубашка')
          : 'Футболка или поло',
        style === 'casual' ? 'Джинсы или чиносы' : 'Легкие брюки'
      ],
      icon: '☀️',
      priority: 1
    });
  } else {
    recommendations.push({
      category: 'Жаркая погода',
      items: [
        gender === 'female' && style === 'elegant' 
          ? 'Летнее платье' 
          : 'Легкая футболка или майка',
        'Шорты или легкие брюки',
        'Солнцезащитные очки',
        'олнцезащитный крем'
      ],
      icon: '🌡️',
      priority: 1
    });
  }

  // Обувь
  const shoesRecommendation: OutfitRecommendation = {
    category: 'Обувь',
    items: [],
    icon: '👟',
    priority: 2
  };

  if (temperature < 0) {
    shoesRecommendation.items = [
      gender === 'female' ? 'Зимние сапоги' : 'Зимняя обувь',
      'Теплые носки'
    ];
  } else if (temperature < 15) {
    shoesRecommendation.items = [
      style === 'elegant'
        ? (gender === 'female' ? 'Ботильоны или туфли' : 'Классические ботинки')
        : 'Кроссовки или ботинки'
    ];
  } else {
    shoesRecommendation.items = [
      style === 'elegant'
        ? (gender === 'female' ? 'Туфли или босоножки' : 'Мокасины')
        : 'Кроссовки или кеды'
    ];
  }

  recommendations.push(shoesRecommendation);

  // Аксессуары в зависимости от погодных условий
  const accessoriesRecommendation: OutfitRecommendation = {
    category: 'Аксессуары',
    items: [],
    icon: '👜',
    priority: 3
  };

  if (humidity > 80) {
    accessoriesRecommendation.items.push('🌂 Зонт (высокая влажность)');
  }

  if (windSpeed > 5) {
    accessoriesRecommendation.items.push('🧣 Легкий шарф (защита от ветра)');
  }

  if (temperature > 20) {
    accessoriesRecommendation.items.push('🧴 Солнцезащитный крем');
    accessoriesRecommendation.items.push('🕶️ Солнцезащитные очки');
  }

  if (gender === 'female' && style === 'elegant') {
    accessoriesRecommendation.items.push('👜 Стильная сумочка');
    if (temperature > 15) {
      accessoriesRecommendation.items.push('💄 Легкий макияж');
    }
  }

  if (accessoriesRecommendation.items.length > 0) {
    recommendations.push(accessoriesRecommendation);
  }

  // Дополнительные советы
  const tipsRecommendation: OutfitRecommendation = {
    category: 'Полезные советы',
    items: [],
    icon: '💡',
    priority: 4
  };

  if (temperature < 5) {
    tipsRecommendation.items.push('🔥 Одевайтесь слоями для лучшего сохранения тепла');
  }

  if (humidity > 70) {
    tipsRecommendation.items.push('🌊 Выбирайте дышащие ткани');
  }

  if (windSpeed > 7) {
    tipsRecommendation.items.push('💨 Избегайте слишком свободной одежды');
  }

  if (temperature > 25) {
    tipsRecommendation.items.push('💧 Не забывайте пить больше воды');
    tipsRecommendation.items.push('🌳 По возможности находитесь в тени');
  }

  if (tipsRecommendation.items.length > 0) {
    recommendations.push(tipsRecommendation);
  }

  return recommendations.sort((a, b) => a.priority - b.priority);
};
