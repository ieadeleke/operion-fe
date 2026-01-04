import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/lib/api";
import type { User, LoginCredentials, RegisterData } from "@/types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const response = await api.get<{ data: { user: User } }>("/auth/me");
      setUser(response.data.data.user);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      // Try to get current user (will use HttpOnly cookie automatically)
      await refreshUser();
      setIsLoading(false);
    };

    initAuth();
  }, [refreshUser]);

  const login = async (credentials: LoginCredentials) => {
    const response = await api.post<{ data: { user: User } }>("/auth/login", credentials);
    setUser(response.data.data.user);
  };

  const register = async (data: RegisterData) => {
    const response = await api.post<{ data: { user: User } }>("/auth/register", data);
    setUser(response.data.data.user);
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Ignore errors on logout
    } finally {
      setUser(null);
    }
  };

  const logoutAll = async () => {
    try {
      await api.post("/auth/logout-all");
    } catch {
      // Ignore errors on logout
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        logoutAll,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
