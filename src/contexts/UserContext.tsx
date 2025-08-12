import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  gender: 'male' | 'female' | 'other';
  style: 'casual' | 'elegant';
  city: string;
  age?: string;
  isRegistered: boolean;
  colorType?: 'spring' | 'summer' | 'autumn' | 'winter';
  colorPalette?: string[];
  favoriteCities?: string[];
  lastWeatherCheck?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Загружаем пользователя из localStorage при старте
    const saved = localStorage.getItem('weatherfit-user');
    return saved ? JSON.parse(saved) : null;
  });

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('weatherfit-user', JSON.stringify(updatedUser));
    }
  };

  const setUserWithSave = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem('weatherfit-user', JSON.stringify(newUser));
    } else {
      localStorage.removeItem('weatherfit-user');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('weatherfit-user');
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserWithSave, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
