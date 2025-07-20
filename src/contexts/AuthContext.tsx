"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { RegisterFormData, UserData } from "@/types/auth.types";
import { useRouter } from "next/navigation";
import { getStoredUserData } from "@/lib/auth";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthContextType {
  user: UserData | null;
  login: (id_user: string, password: string) => Promise<boolean>;
  register: (data: RegisterFormData) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const userData = await getStoredUserData();
      setUser(userData);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (id_user: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_user, password }),
      });

      if (!res.ok) return false;

      const result = await res.json();

      if (result.success) {
        // Re-fetch user from cookie
        const me = await fetch("/api/auth/me");
        const userData = await me.json();
        setUser(userData.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const register = async (data: RegisterFormData): Promise<boolean> => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      return result.success;
    } catch (error) {
      console.error("Registration failed", error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      router.push("/login"); // Redirect after logout
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
