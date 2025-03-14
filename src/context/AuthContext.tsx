import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'instructor' | 'student') => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Mock users for demo purposes
  const mockUsers: User[] = [
    {
      id: '1',
      name: 'Admin',
      email: 'instructor@example.com',
      password: 'password123',
      role: 'instructor'
    },
    {
      id: '2',
      name: 'Etudiant',
      email: 'student@example.com',
      password: 'password123',
      role: 'student'
    }
  ];

  const login = (email: string, password: string): boolean => {
    // In a real app, this would be an API call
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (name: string, email: string, password: string, role: 'instructor' | 'student'): boolean => {
    // Check if email already exists
    if (mockUsers.some(u => u.email === email)) {
      return false;
    }

    // In a real app, this would be an API call
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      password,
      role
    };

    mockUsers.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
  };

  const value = {
    currentUser,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};