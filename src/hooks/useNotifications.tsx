import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';  
  duration?: number;
}

const NotificationWrapper = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const NotificationItem = styled.div<{ type: 'success' | 'error' | 'info' }>`
  background: ${props => 
    props.type === 'success' ? '#48bb78' :
    props.type === 'error' ? '#e53e3e' : '#3182ce'
  };
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideIn 0.3s ease;
  max-width: 300px;
  word-wrap: break-word;
  cursor: pointer;

  @keyframes slideIn {
    from { 
      transform: translateX(100%); 
      opacity: 0; 
    }
    to { 
      transform: translateX(0); 
      opacity: 1; 
    }
  }
`;

let notificationId = 0;

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    const id = String(++notificationId);
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification
  };
};

export const NotificationContainer: React.FC<{
  notifications: Notification[];
  onRemove: (id: string) => void;
}> = ({ notifications, onRemove }) => {
  if (notifications.length === 0) return null;

  return (
    <NotificationWrapper>
      {notifications.map(notification => (
        <NotificationItem 
          key={notification.id} 
          type={notification.type}
          onClick={() => onRemove(notification.id)}
        >
          {notification.message}
        </NotificationItem>
      ))}
    </NotificationWrapper>
  );
};
