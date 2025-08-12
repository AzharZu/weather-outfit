import { useEffect } from 'react';

interface AnalyticsData {
  page: string;
  timestamp: number;
  userAgent: string;
  referrer: string;
}

export const useAnalytics = (pageName: string) => {
  useEffect(() => {
    // Отправляем данные о посещении
    const trackVisit = async () => {
      try {
        const data: AnalyticsData = {
          page: pageName,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };

        // Сохраняем локально (можно заменить на API)
        const visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
        visits.push(data);
        localStorage.setItem('siteVisits', JSON.stringify(visits));

        // Здесь можно отправить на ваш сервер
        // await fetch('/api/analytics', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(data)
        // });

        console.log(`📊 Посещение страницы: ${pageName}`);
      } catch (error) {
        console.error('Ошибка аналитики:', error);
      }
    };

    trackVisit();
  }, [pageName]);
};

// Функция для получения статистики
export const getAnalytics = () => {
  const visits = JSON.parse(localStorage.getItem('siteVisits') || '[]');
  const uniquePages = new Set(visits.map((v: AnalyticsData) => v.page));
  return {
    totalVisits: visits.length,
    uniquePages: uniquePages.size,
    lastVisit: visits[visits.length - 1]?.timestamp,
    visits: visits
  };
};
