import { createContext, useContext, useState, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  loginAs: (role: 'owner' | 'customer') => void;
  login: (email: string, password: string, role: 'owner' | 'customer') => boolean;
  signup: (name: string, email: string, password: string, role: 'owner' | 'customer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hawker_user');
    return saved ? JSON.parse(saved) : null;
  });

  const loginAs = (role: 'owner' | 'customer') => {
    const u: User = role === 'owner'
      ? { id: 'u1', email: 'owner@hawker.com', password: '', name: 'Ah Gong', role, stallId: 's1' }
      : { id: 'u2', email: 'customer@test.com', password: '', name: 'Jane Tan', role, partnerCompany: 'Shopee Singapore', priorityQueue: true };
    setUser(u);
    localStorage.setItem('hawker_user', JSON.stringify(u));
  };

  const login = (email: string, password: string, role: 'owner' | 'customer') => {
    if (role === 'owner') {
      if (email === 'owner@hawker.com' && password === 'owner123') {
        const u: User = { id: 'u1', email, password, name: 'Ah Gong', role, stallId: 's1' };
        setUser(u);
        localStorage.setItem('hawker_user', JSON.stringify(u));
        return true;
      }
    } else {
      if (email === 'customer@test.com' && password === 'customer123') {
        const u: User = { id: 'u2', email, password, name: 'Jane Tan', role };
        setUser(u);
        localStorage.setItem('hawker_user', JSON.stringify(u));
        return true;
      }
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, role: 'owner' | 'customer') => {
    const u: User = {
      id: `u${Date.now()}`,
      email,
      password,
      name,
      role,
      ...(role === 'owner' ? { stallId: `s${Date.now()}` } : {}),
    };
    setUser(u);
    localStorage.setItem('hawker_user', JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hawker_user');
  };

  return (
    <AuthContext.Provider value={{ user, loginAs, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
