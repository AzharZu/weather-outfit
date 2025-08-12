const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_DIR = path.join(__dirname, 'data');

// Middleware
app.use(cors());
app.use(express.json());

// Создаем папку для данных если её нет
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Утилита для чтения файла
const readDataFile = async (filename) => {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

// Утилита для записи файла
const writeDataFile = async (filename, data) => {
  const filePath = path.join(DATA_DIR, filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

// Маршруты для пользователей
app.post('/api/users/register', async (req, res) => {
  try {
    const userData = req.body;
    const userId = Date.now().toString();
    
    const user = {
      id: userId,
      ...userData,
      isRegistered: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await writeDataFile(`user_${userId}.json`, user);
    
    res.status(201).json({ 
      success: true, 
      user,
      message: 'Пользователь успешно зарегистрирован!' 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при регистрации пользователя' 
    });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // В реальном приложении здесь была бы проверка пароля
    // Для демо создаем базового пользователя
    const user = {
      id: Date.now().toString(),
      name: 'Пользователь',
      email: email,
      gender: 'female',
      style: 'casual',
      city: 'Санкт-Петербург',
      isRegistered: true,
      createdAt: new Date().toISOString()
    };

    res.json({ 
      success: true, 
      user,
      message: 'Вход выполнен успешно!' 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка входа' 
    });
  }
});

app.put('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    
    // Читаем существующего пользователя
    let user = await readDataFile(`user_${id}.json`);
    
    if (!user) {
      // Если пользователь не найден, создаем нового
      user = {
        id,
        name: 'Пользователь',
        email: 'user@example.com',
        gender: 'female',
        style: 'casual',
        city: 'Москва',
        isRegistered: true,
        createdAt: new Date().toISOString()
      };
    }

    // Обновляем данные пользователя
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await writeDataFile(`user_${id}.json`, updatedUser);
    
    res.json({ 
      success: true, 
      user: updatedUser,
      message: 'Профиль успешно обновлен! ✨' 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при обновлении профиля' 
    });
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await readDataFile(`user_${id}.json`);
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    res.json({ 
      success: true, 
      user 
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении данных пользователя' 
    });
  }
});

// Маршруты для избранных городов
app.post('/api/users/:id/favorites', async (req, res) => {
  try {
    const { id } = req.params;
    const { city } = req.body;
    
    let user = await readDataFile(`user_${id}.json`);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    if (!user.favoriteCities) user.favoriteCities = [];
    
    if (!user.favoriteCities.includes(city)) {
      user.favoriteCities.push(city);
      user.updatedAt = new Date().toISOString();
      await writeDataFile(`user_${id}.json`, user);
    }

    res.json({ 
      success: true, 
      user,
      message: `${city} добавлен в избранное!` 
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при добавлении в избранное' 
    });
  }
});

app.delete('/api/users/:id/favorites/:city', async (req, res) => {
  try {
    const { id, city } = req.params;
    
    let user = await readDataFile(`user_${id}.json`);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Пользователь не найден' 
      });
    }

    if (user.favoriteCities) {
      user.favoriteCities = user.favoriteCities.filter(c => c !== city);
      user.updatedAt = new Date().toISOString();
      await writeDataFile(`user_${id}.json`, user);
    }

    res.json({ 
      success: true, 
      user,
      message: `${city} удален из избранного` 
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при удалении из избранного' 
    });
  }
});

// Маршрут для аналитики
app.get('/api/analytics/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Генерируем базовую аналитику
    const analytics = {
      weatherChecks: Math.floor(Math.random() * 50) + 10,
      favoriteStyle: ['casual', 'elegant'][Math.floor(Math.random() * 2)],
      mostCheckedCity: 'Москва',
      averageTemp: Math.floor(Math.random() * 30) - 5,
      totalOutfits: Math.floor(Math.random() * 100) + 20,
      colorTypeAnalyzed: Math.random() > 0.5,
      lastActive: new Date().toISOString()
    };

    res.json({ 
      success: true, 
      analytics 
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Ошибка при получении аналитики' 
    });
  }
});

// Маршрут для здоровья сервера
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'WeatherFit Backend работает!' 
  });
});

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Endpoint не найден' 
  });
});

// Обработка ошибок
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ 
    success: false, 
    message: 'Внутренняя ошибка сервера' 
  });
});

// Запуск сервера
const startServer = async () => {
  await ensureDataDir();
  
  app.listen(PORT, () => {
    console.log(`🌤️  WeatherFit Backend запущен на порту ${PORT}`);
    console.log(`📁 Данные сохраняются в: ${DATA_DIR}`);
    console.log(`🔗 Проверить здоровье: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch(console.error);
