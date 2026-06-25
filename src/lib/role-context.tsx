import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Role, ROLE_USERS, ROLES } from "./mock-data";

type RoleCtx = {
  role: Role;
  setRole: (r: Role) => void;
  logout: () => void;
  user: typeof ROLE_USERS[Role];
  lang: "en" | "mr";
  setLang: (l: "en" | "mr") => void;
};

const Ctx = createContext<RoleCtx | null>(null);
const STORAGE_KEY = "chb_role";
const DEFAULT_ROLE: Role = "super_admin";
const VALID = new Set(ROLES.map((r) => r.value));

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role>(() => {
    if (typeof window === "undefined") return DEFAULT_ROLE;
    const stored = localStorage.getItem(STORAGE_KEY) as Role | null;
    return stored && VALID.has(stored) ? stored : DEFAULT_ROLE;
  });
  const [lang, setLang] = useState<"en" | "mr">("en");

  const setRole = (r: Role) => {
    setRoleState(r);
    try { localStorage.setItem(STORAGE_KEY, r); } catch {}
  };

  const logout = () => {
    setRoleState(DEFAULT_ROLE);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, role); } catch {}
  }, [role]);

  return (
    <Ctx.Provider value={{ role, setRole, logout, user: ROLE_USERS[role], lang, setLang }}>
      {children}
    </Ctx.Provider>
  );
}

export function useRole() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRole outside provider");
  return c;
}
