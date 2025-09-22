import { User } from '../contexts/UserContext';
import { WeatherData } from './weatherService';
import { MoodType } from '../utils/moods';
import { ColorType } from '../utils/colorAnalysis';

export type ChatRole = 'user' | 'assistant';

export interface ChatMessage {
  role: ChatRole;
  text: string;
}

interface OutfitContext {
  user: User;
  weather: WeatherData;
  mood?: MoodType | null;
  colorType?: ColorType | null;
}

const MODEL = 'gemini-1.5-flash-latest';
const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

function buildContextPrompt({ user, weather, mood, colorType }: OutfitContext): string {
  const moodText = mood ? `\nТекущее настроение: ${mood}.` : '';
  const colorTypeText = colorType ? `\nЦветотип: ${colorType}.` : '';

  return [
    'Ты — модный AI-стилист, работающий для женской аудитории. Отвечай только по-русски.',
    'Учитывай данные погоды и персональный профиль, предлагай образ целиком: верх, низ, обувь, аксессуар, возможный макияж/волосы.',
    'Выводи ответ в компактном формате: короткое приветствие, затем нумерованный список 1-4, где каждая строка — предмет + пояснение, и завершай мотивирующим выводом.',
    'Учитывай практичность, комфорт и эстетику. Избегай повторов. Если пользователь задает уточняющие вопросы — отвечай дружелюбно, оставайся в контексте стиля.',
    `Текущая погода в городе ${weather.city}: ${weather.temperature}°C, ощущается как ${weather.feelsLike}°C, ${weather.description}, влажность ${weather.humidity}%, ветер ${weather.windSpeed} м/с.${moodText}${colorTypeText}`,
    `Стиль пользователя: ${user.style}.`
  ].join('\n');
}

export async function getOutfitAdvice(
  messages: ChatMessage[],
  context: OutfitContext
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Не указан ключ Gemini API. Добавьте REACT_APP_GEMINI_API_KEY в .env');
  }

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const contentPrompt = buildContextPrompt(context);

  const contents = [
    {
      role: 'user',
      parts: [{ text: contentPrompt }]
    },
    ...messages.map(message => ({
      role: message.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: message.text }]
    }))
  ];

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ contents })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} ${errorText}`);
  }

  const data = await response.json();

  const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidate) {
    throw new Error('Gemini не вернул ответа. Попробуйте снова.');
  }

  return candidate.trim();
}
