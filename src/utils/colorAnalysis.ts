export type ColorType = 'spring' | 'summer' | 'autumn' | 'winter';

export interface ColorAnalysis {
  type: ColorType;
  name: string;
  description: string;
  baseColors: string[];
  accentColors: string[];
  avoidColors: string[];
  wowCombinations: string[];
  makeup: {
    foundation: string;
    lipColors: string[];
    eyeColors: string[];
  };
  accessories: string[];
  hairColors: string[];
}

export interface ColorAnswers {
  veins: 'blue' | 'green' | 'both';
  jewelry: 'gold' | 'silver' | 'both';
  sunReaction: 'burns' | 'tans' | 'both';
  eyeColor: 'blue' | 'green' | 'brown' | 'hazel' | 'gray';
  hairColor: 'blonde' | 'brown' | 'black' | 'red' | 'gray';
  skinTone: 'cool' | 'warm' | 'neutral';
  whiteColor: 'pure' | 'cream' | 'both';
}

export const COLOR_TYPES: Record<ColorType, ColorAnalysis> = {
  spring: {
    type: 'spring',
    name: 'Яркая Весна',
    description: 'Ты сияешь как утреннее солнце! Тебе идеально подходят чистые, яркие цвета с теплым подтоном.',
    baseColors: ['Коралловый', 'Желто-зеленый', 'Лазурный', 'Золотисто-желтый', 'Теплый красный'],
    accentColors: ['Ярко-оранжевый', 'Фуксия', 'Изумрудный', 'Солнечно-желтый'],
    avoidColors: ['Черный', 'Серый', 'Приглушенные тона', 'Холодные оттенки'],
    wowCombinations: [
      'Коралловый + золотисто-желтый + кремовый',
      'Изумрудный + персиковый + золотые акценты',
      'Лазурный + кораллово-красный + белоснежный'
    ],
    makeup: {
      foundation: 'Теплый персиковый или золотистый подтон',
      lipColors: ['Коралловый', 'Персиковый', 'Ярко-розовый'],
      eyeColors: ['Золотисто-коричневый', 'Теплый зеленый', 'Коралловый']
    },
    accessories: ['Золотые украшения', 'Теплые металлы', 'Яркие шарфы'],
    hairColors: ['Золотистый блонд', 'Медно-рыжий', 'Каштановый с золотом']
  },
  
  summer: {
    type: 'summer',
    name: 'Мягкое Лето',
    description: 'Ты словно прохладный летний вечер - элегантная и утонченная. Тебе к лицу мягкие, приглушенные тона.',
    baseColors: ['Лавандовый', 'Пыльно-розовый', 'Мягкий голубой', 'Серо-зеленый', 'Кремово-белый'],
    accentColors: ['Малиновый', 'Сливовый', 'Морская волна', 'Лимонно-желтый'],
    avoidColors: ['Оранжевый', 'Золотисто-желтый', 'Теплые красные', 'Яркие контрасты'],
    wowCombinations: [
      'Лавандовый + серебристо-серый + белый',
      'Пыльно-розовый + мягкий голубой + серебро',
      'Морская волна + лимонный + кремовый'
    ],
    makeup: {
      foundation: 'Холодный розоватый или нейтральный подтон',
      lipColors: ['Пыльно-розовый', 'Малиновый', 'Сливовый'],
      eyeColors: ['Серо-коричневый', 'Лавандовый', 'Мягкий зеленый']
    },
    accessories: ['Серебряные украшения', 'Холодные металлы', 'Нежные ткани'],
    hairColors: ['Пепельный блонд', 'Мышиный', 'Каштановый без рыжины']
  },
  
  autumn: {
    type: 'autumn',
    name: 'Глубокая Осень',
    description: 'Ты как золотая осень - богатая, глубокая, завораживающая. Тебе идут насыщенные, земные тона.',
    baseColors: ['Терракотовый', 'Оливковый', 'Горчичный', 'Кирпично-красный', 'Золотисто-коричневый'],
    accentColors: ['Тыквенный', 'Изумрудно-зеленый', 'Бордовый', 'Янтарный'],
    avoidColors: ['Холодные пастельные', 'Черный', 'Ярко-розовый', 'Голубой'],
    wowCombinations: [
      'Терракотовый + оливковый + кремово-золотой',
      'Бордовый + горчичный + теплый коричневый',
      'Изумрудный + тыквенный + золотые акценты'
    ],
    makeup: {
      foundation: 'Теплый золотистый или оливковый подтон',
      lipColors: ['Терракотовый', 'Бордовый', 'Кирпично-красный'],
      eyeColors: ['Золотисто-коричневый', 'Оливково-зеленый', 'Терракотовый']
    },
    accessories: ['Золотые украшения', 'Медь', 'Натуральные материалы'],
    hairColors: ['Каштановый', 'Медно-рыжий', 'Темно-золотистый']
  },
  
  winter: {
    type: 'winter',
    name: 'Яркая Зима',
    description: 'Ты как зимняя королева - яркая, контрастная, драматичная. Тебе к лицу четкие, насыщенные цвета.',
    baseColors: ['Ярко-белый', 'Черный', 'Королевский синий', 'Изумрудный', 'Пурпурный'],
    accentColors: ['Фуксия', 'Лимонно-желтый', 'Ярко-красный', 'Электрик'],
    avoidColors: ['Бежевый', 'Персиковый', 'Оранжевый', 'Теплые пастельные'],
    wowCombinations: [
      'Черный + ярко-белый + фуксия',
      'Королевский синий + серебро + белый',
      'Изумрудный + пурпурный + черный'
    ],
    makeup: {
      foundation: 'Холодный розоватый или нейтральный подтон',
      lipColors: ['Ярко-красный', 'Фуксия', 'Вишневый'],
      eyeColors: ['Серебристый', 'Черный', 'Яркий синий']
    },
    accessories: ['Серебряные украшения', 'Платина', 'Контрастные элементы'],
    hairColors: ['Платиновый блонд', 'Черный', 'Серебристый']
  }
};

export function analyzeColorType(answers: ColorAnswers): ColorAnalysis {
  let springScore = 0;
  let summerScore = 0;
  let autumnScore = 0;
  let winterScore = 0;

  // Анализ вен (25% веса)
  if (answers.veins === 'blue') {
    summerScore += 3;
    winterScore += 3;
  } else if (answers.veins === 'green') {
    springScore += 3;
    autumnScore += 3;
  } else {
    springScore += 1;
    summerScore += 1;
    autumnScore += 1;
    winterScore += 1;
  }

  // Анализ украшений (20% веса)
  if (answers.jewelry === 'gold') {
    springScore += 2;
    autumnScore += 2;
  } else if (answers.jewelry === 'silver') {
    summerScore += 2;
    winterScore += 2;
  } else {
    springScore += 1;
    summerScore += 1;
    autumnScore += 1;
    winterScore += 1;
  }

  // Реакция на солнце (15% веса)
  if (answers.sunReaction === 'burns') {
    summerScore += 2;
    winterScore += 1;
  } else if (answers.sunReaction === 'tans') {
    springScore += 2;
    autumnScore += 2;
  } else {
    springScore += 1;
    summerScore += 1;
    autumnScore += 1;
    winterScore += 1;
  }

  // Цвет глаз (15% веса)
  switch (answers.eyeColor) {
    case 'blue':
      summerScore += 2;
      winterScore += 1;
      break;
    case 'green':
      springScore += 2;
      autumnScore += 1;
      break;
    case 'brown':
      autumnScore += 2;
      winterScore += 1;
      break;
    case 'hazel':
      springScore += 1;
      autumnScore += 2;
      break;
    case 'gray':
      summerScore += 2;
      winterScore += 1;
      break;
  }

  // Цвет волос (10% веса)
  switch (answers.hairColor) {
    case 'blonde':
      springScore += 1;
      summerScore += 1;
      break;
    case 'brown':
      autumnScore += 1;
      winterScore += 1;
      break;
    case 'black':
      winterScore += 2;
      break;
    case 'red':
      springScore += 1;
      autumnScore += 2;
      break;
    case 'gray':
      summerScore += 1;
      winterScore += 1;
      break;
  }

  // Тон кожи (10% веса)
  if (answers.skinTone === 'cool') {
    summerScore += 1;
    winterScore += 1;
  } else if (answers.skinTone === 'warm') {
    springScore += 1;
    autumnScore += 1;
  } else {
    springScore += 0.5;
    summerScore += 0.5;
    autumnScore += 0.5;
    winterScore += 0.5;
  }

  // Предпочтение белого (5% веса)
  if (answers.whiteColor === 'pure') {
    winterScore += 1;
    summerScore += 0.5;
  } else if (answers.whiteColor === 'cream') {
    springScore += 1;
    autumnScore += 1;
  } else {
    springScore += 0.5;
    summerScore += 0.5;
    autumnScore += 0.5;
    winterScore += 0.5;
  }

  // Определяем победителя
  const maxScore = Math.max(springScore, summerScore, autumnScore, winterScore);
  
  let colorType: ColorType;
  if (springScore === maxScore) colorType = 'spring';
  else if (summerScore === maxScore) colorType = 'summer';
  else if (autumnScore === maxScore) colorType = 'autumn';
  else colorType = 'winter';

  return COLOR_TYPES[colorType];
}

export function analyzePhotoColorType(imageFile: File): Promise<ColorType> {
  return new Promise((resolve) => {
    // Симуляция анализа фото (в реальности здесь был бы AI)
    setTimeout(() => {
      // Базируемся на размере файла для разнообразия
      const fileSize = imageFile.size;
      const types: ColorType[] = ['spring', 'summer', 'autumn', 'winter'];
      const index = fileSize % 4;
      resolve(types[index]);
    }, 2000);
  });
}
