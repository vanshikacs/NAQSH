"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthUser, DEMO_USERS, getRoleDashboardPath } from "./roles";
import { UserRole } from "@/lib/db/types";
import { useRouter } from "next/navigation";

interface AuthContextType { user: AuthUser | null; role: UserRole; loginAs: (role: UserRole) => void; logout: () => void; isAuthenticated: boolean; }
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_STORAGE_KEY = "naqsh_auth_role";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>("buyer");
  const [user, setUser] = useState<AuthUser | null>(DEMO_USERS.buyer);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedRole = localStorage.getItem(AUTH_STORAGE_KEY) as UserRole | null;
      if (savedRole && DEMO_USERS[savedRole]) { setRole(savedRole); setUser(DEMO_USERS[savedRole]); }
    } catch {}
  }, []);

  const loginAs = (newRole: UserRole) => {
    setRole(newRole); setUser(DEMO_USERS[newRole]);
    try { localStorage.setItem(AUTH_STORAGE_KEY, newRole); } catch {}
    router.push(getRoleDashboardPath(newRole));
  };

  const logout = () => {
    setRole("visitor"); setUser(DEMO_USERS.visitor);
    try { localStorage.removeItem(AUTH_STORAGE_KEY); } catch {}
    router.push("/");
  };

  return <AuthContext.Provider value={{ user, role, loginAs, logout, isAuthenticated: role !== "visitor" }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}