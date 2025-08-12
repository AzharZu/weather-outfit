import { User } from '../context/UserContext';
import { WeatherData } from '../services/weatherService';

export interface OutfitRecommendation {
  category: string;
  items: OutfitItem[];
  icon: string;
  priority: number;
  description: string;
  styleNote?: string;
}

export interface OutfitItem {
  name: string;
  description: string;
  emoji: string;
  reason: string;
}

export const getPersonalizedRecommendations = (
  weather: WeatherData, 
  user: User
): OutfitRecommendation[] => {
  const { temperature, humidity, windSpeed, description } = weather;
  const { gender, style } = user;
  
  const recommendations: OutfitRecommendation[] = [];
  const isFemale = gender === 'female';
  const isElegant = style === 'elegant';

  // Основная одежда по температуре
  if (temperature < -10) {
    recommendations.push({
      category: 'Арктический лук 🧊',
      description: 'Когда на улице настоящий мороз, нужна серьезная защита!',
      items: [
        {
          name: 'Пуховик до колен',
          description: 'Самый теплый вариант с капюшоном',
          emoji: '🧥',
          reason: 'Защита от экстремального холода'
        },
        {
          name: 'Термобелье',
          description: 'Первый слой - основа тепла',
          emoji: '🩲',
          reason: 'Сохраняет тепло тела'
        },
        {
          name: 'Шерстяной свитер',
          description: 'Толстый и уютный',
          emoji: '🧶',
          reason: 'Дополнительный слой утепления'
        }
      ],
      icon: '❄️',
      priority: 1,
      styleNote: 'Функциональность важнее красоты при таком морозе!'
    });
  } else if (temperature < 0) {
    recommendations.push({
      category: 'Зимний образ ❄️',
      description: 'Классическая зима - время для стильных и теплых вещей',
      items: [
        {
          name: isElegant ? 'Шерстяное пальто' : 'Зимняя парка',
          description: isElegant ? 'Элегантно и тепло' : 'Практично и удобно',
          emoji: '🧥',
          reason: 'Основная защита от холода'
        },
        {
          name: isFemale && isElegant ? 'Кашемировый свитер' : 'Теплая толстовка',
          description: isFemale && isElegant ? 'Мягкий и роскошный' : 'Комфортный и теплый',
          emoji: '👕',
          reason: 'Утепляющий слой'
        }
      ],
      icon: '🥶',
      priority: 1,
      styleNote: isElegant ? 'Зима - время для роскошных тканей!' : 'Главное - не замерзнуть!'
    });
  } else if (temperature < 10) {
    recommendations.push({
      category: 'Межсезонный стиль 🍂',
      description: 'Переходный период - время экспериментов с layering!',
      items: [
        {
          name: isElegant ? (isFemale ? 'Тренч или пальто' : 'Классическое пальто') : 'Бомбер или куртка',
          description: isElegant ? 'Вечная классика' : 'Молодежный и стильный',
          emoji: '🧥',
          reason: 'Защита от прохлады и ветра'
        },
        {
          name: isFemale && isElegant ? 'Кардиган оверсайз' : 'Свитшот',
          description: isFemale && isElegant ? 'Уютно и женственно' : 'Комфортно для активности',
          emoji: '👚',
          reason: 'Можно снять, если потеплеет'
        }
      ],
      icon: '🍂',
      priority: 1,
      styleNote: 'Идеальное время для многослойности - можно играть с текстурами!'
    });
  } else if (temperature < 20) {
    recommendations.push({
      category: 'Весенняя свежесть 🌸',
      description: 'Комфортная температура для самых стильных экспериментов!',
      items: [
        {
          name: isFemale && isElegant ? 'Блуза из шелка' : (isElegant ? 'Рубашка из хлопка' : 'Лонгслив'),
          description: isFemale && isElegant ? 'Роскошно и элегантно' : (isElegant ? 'Классика и стиль' : 'Удобно и модно'),
          emoji: '👔',
          reason: 'Идеальная температура для легких тканей'
        },
        {
          name: isFemale && isElegant ? 'Юбка-карандаш или брюки' : 'Чиносы или джинсы',
          description: isFemale && isElegant ? 'Подчеркнет фигуру' : 'Классика casual стиля',
          emoji: '👖',
          reason: 'Комфорт на весь день'
        }
      ],
      icon: '🌤️',
      priority: 1,
      styleNote: 'Время показать свой стиль - погода располагает к экспериментам!'
    });
  } else if (temperature < 25) {
    recommendations.push({
      category: 'Идеальный день ☀️',
      description: 'Та самая погода, когда хочется выглядеть на миллион!',
      items: [
        {
          name: isFemale && isElegant ? 'Легкое платье' : (isElegant ? 'Поло или рубашка' : 'Футболка premium'),
          description: isFemale && isElegant ? 'Женственно и воздушно' : (isElegant ? 'Элегантная классика' : 'Качественный базовый элемент'),
          emoji: isFemale && isElegant ? '👗' : '👕',
          reason: 'Идеальная температура для любой одежды'
        }
      ],
      icon: '☀️',
      priority: 1,
      styleNote: 'Идеальная погода для демонстрации лучших вещей из гардероба!'
    });
  } else {
    recommendations.push({
      category: 'Летний зной 🔥',
      description: 'Жарко! Приоритет - комфорт и защита от солнца',
      items: [
        {
          name: isFemale ? 'Легкий сарафан или топ' : 'Льняная рубашка или футболка',
          description: isFemale ? 'Воздушно и прохладно' : 'Дышащие натуральные ткани',
          emoji: isFemale ? '👗' : '👕',
          reason: 'Естественная вентиляция'
        },
        {
          name: 'Широкополая шляпа или кепка',
          description: 'Защита от прямых солнечных лучей',
          emoji: '👒',
          reason: 'Предотвращает солнечный удар'
        }
      ],
      icon: '🌡️',
      priority: 1,
      styleNote: 'В жару главное - не перегреться. Выбирайте светлые цвета и натуральные ткани!'
    });
  }

  // Обувь
  const shoesRecommendation: OutfitRecommendation = {
    category: 'Обувь 👠',
    description: 'Правильная обувь - основа комфорта на весь день!',
    items: [],
    icon: '👟',
    priority: 2,
    styleNote: ''
  };

  if (temperature < 0) {
    shoesRecommendation.items = [
      {
        name: 'Зимние сапоги с мехом',
        description: 'Высокие, теплые, не скользят',
        emoji: '🥾',
        reason: 'Защита от снега и льда'
      }
    ];
    shoesRecommendation.styleNote = 'Безопасность важнее красоты на льду!';
  } else if (temperature < 15) {
    shoesRecommendation.items = [
      {
        name: isElegant ? (isFemale ? 'Ботильоны на каблуке' : 'Оксфорды') : 'Кроссовки или ботинки',
        description: isElegant ? 'Стильно и элегантно' : 'Комфортно для активности',
        emoji: isElegant ? (isFemale ? '👠' : '👞') : '👟',
        reason: 'Подходит для прохладной погоды'
      }
    ];
    shoesRecommendation.styleNote = isElegant ? 'Время показать элегантную обувь!' : 'Комфорт - приоритет!';
  } else {
    shoesRecommendation.items = [
      {
        name: isElegant ? (isFemale ? 'Туфли или босоножки' : 'Лоферы') : 'Кроссовки или кеды',
        description: isElegant ? 'Изящно и женственно' : 'Легко и дышащие',
        emoji: isElegant ? (isFemale ? '👡' : '👞') : '👟',
        reason: 'Легкость для теплой погоды'
      }
    ];
    shoesRecommendation.styleNote = 'Время для легкой и стильной обуви!';
  }

  recommendations.push(shoesRecommendation);

  // Аксессуары
  const accessoriesRecommendation: OutfitRecommendation = {
    category: 'Аксессуары ✨',
    description: 'Детали, которые делают образ особенным!',
    items: [],
    icon: '👜',
    priority: 3,
    styleNote: ''
  };

  if (humidity > 80 || description.includes('дождь') || description.includes('ливень')) {
    accessoriesRecommendation.items.push({
      name: 'Стильный зонт',
      description: isElegant ? 'Классический или с принтом' : 'Компактный складной',
      emoji: '☂️',
      reason: 'Высокая вероятность дождя'
    });
  }

  if (windSpeed > 5) {
    accessoriesRecommendation.items.push({
      name: 'Легкий шарф или платок',
      description: 'Защитит от ветра, добавит стиля',
      emoji: '🧣',
      reason: `Ветер ${windSpeed} м/с`
    });
  }

  if (temperature > 20) {
    accessoriesRecommendation.items.push({
      name: 'Солнцезащитные очки',
      description: isElegant ? 'Дизайнерские или классические' : 'Спортивные или авиаторы',
      emoji: '🕶️',
      reason: 'Защита глаз от UV лучей'
    });
  }

  if (accessoriesRecommendation.items.length > 0) {
    accessoriesRecommendation.styleNote = 'Аксессуары - это 50% успеха образа!';
    recommendations.push(accessoriesRecommendation);
  }

  // Советы
  const tipsRecommendation: OutfitRecommendation = {
    category: 'Секреты стиля 💡',
    description: 'Профессиональные советы для идеального образа!',
    items: [],
    icon: '💡',
    priority: 4,
    styleNote: ''
  };

  if (temperature < 5) {
    tipsRecommendation.items.push({
      name: 'Правило трех слоев',
      description: 'Термобелье + утепляющий слой + ветрозащита',
      emoji: '🧅',
      reason: 'Максимальная эффективность утепления'
    });
  }

  if (humidity > 70) {
    tipsRecommendation.items.push({
      name: 'Дышащие ткани',
      description: 'Хлопок, лен, бамбук - ваши друзья',
      emoji: '🌿',
      reason: 'Комфорт при высокой влажности'
    });
  }

  if (temperature > 25) {
    tipsRecommendation.items.push({
      name: 'Светлые цвета',
      description: 'Белый, бежевый, пастельные тона',
      emoji: '🤍',
      reason: 'Отражают солнечные лучи'
    });
  }

  if (isElegant) {
    tipsRecommendation.items.push({
      name: 'Правило одного акцента',
      description: 'Один яркий элемент на весь образ',
      emoji: '🎯',
      reason: 'Элегантность в деталях'
    });
  } else {
    tipsRecommendation.items.push({
      name: 'Комфорт превыше всего',
      description: 'Выбирайте удобную одежду для активного дня',
      emoji: '😌',
      reason: 'Хорошее самочувствие = уверенность'
    });
  }

  if (tipsRecommendation.items.length > 0) {
    tipsRecommendation.styleNote = 'Маленькие хитрости для большого эффекта!';
    recommendations.push(tipsRecommendation);
  }

  return recommendations.sort((a, b) => a.priority - b.priority);
};
