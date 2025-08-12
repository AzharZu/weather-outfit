import { User } from '../context/UserContext';

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  user?: User; // для updateUser
}

// Mock API service для демонстрации
class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'https://api.weatherfit.app';
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<ApiResponse<User>> {
    try {
      // Симуляция API запроса
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // В реальном приложении здесь был бы настоящий HTTP запрос
      // const response = await fetch(`${this.baseUrl}/users/${userId}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updates),
      // });

      // Mock успешный ответ
      const currentUser = JSON.parse(localStorage.getItem('weatherfit-user') || '{}');
      const updatedUser = { ...currentUser, ...updates };

      return {
        success: true,
        user: updatedUser,
        message: 'Профиль успешно обновлен! ✨'
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: 'Не удалось обновить профиль'
      };
    }
  }

  async getUser(userId: string): Promise<ApiResponse<User>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const user = JSON.parse(localStorage.getItem('weatherfit-user') || '{}');
      
      return {
        success: true,
        data: user
      };
    } catch (error) {
      return {
        success: false,
        error: 'Пользователь не найден'
      };
    }
  }

  async saveOutfitHistory(userId: string, outfit: any): Promise<ApiResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Сохраняем в localStorage как fallback
      const history = JSON.parse(localStorage.getItem('outfit-history') || '[]');
      history.unshift({ ...outfit, id: Date.now().toString(), date: new Date().toISOString() });
      history.splice(50); // Ограничиваем до 50 записей
      localStorage.setItem('outfit-history', JSON.stringify(history));

      return {
        success: true,
        message: 'Образ сохранен в истории'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Не удалось сохранить образ'
      };
    }
  }
}

export const apiService = new ApiService();
