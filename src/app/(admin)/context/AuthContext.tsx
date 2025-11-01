"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface Account {
  id: string;
  email: string;
  fullName: string;
  roleId: number;
  status: "active" | "inactive" | "pending";
  lastLogin: string;
  password?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  account: Account | null;
  token: string | null;
  login: (account: Account, token: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const isTokenExpired = (token: string): boolean => {
  try {
    const payloadBase64 = token.split(".")[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));
    const exp = decodedPayload.exp;
    return exp * 1000 < Date.now();
  } catch {
    return true;
  }
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedAccount = localStorage.getItem("account");

    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setIsAuthenticated(true);

      if (storedAccount) {
        try {
          setAccount(JSON.parse(storedAccount));
        } catch (error) {
          console.error("Không thể parse account từ localStorage:", error);
        }
      }
    } else {
      localStorage.removeItem("authToken");
      localStorage.removeItem("account");
      sessionStorage.removeItem("authToken");
    }
  }, []);

  const login = (account: Account, token: string, refreshToken: string) => {
    setAccount(account);
    setToken(token);
    setIsAuthenticated(true);

    localStorage.setItem("authToken", token);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("account", JSON.stringify(account));
  };

  const logout = () => {
    setAccount(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("account");
    sessionStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, account, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
