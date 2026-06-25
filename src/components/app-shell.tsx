import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Bell, Search, Menu, ChevronDown, LogOut, UserCircle2, Globe, Building2,
} from "lucide-react";
import { useRole } from "@/lib/role-context";
import { ROLES, NOTIFICATIONS } from "@/lib/mock-data";
import { NAV_BY_ROLE, canAccess } from "@/lib/rbac";
import { cn } from "@/lib/utils";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { role } = useRole();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const allowed = canAccess(role, pathname);

  useEffect(() => {
    if (pathname.startsWith("/app") && !allowed && pathname !== "/app/dashboard") {
      navigate({ to: "/app/dashboard", replace: true });
    }
  }, [allowed, pathname, navigate]);

  return (
    <div className="flex min-h-dvh bg-background">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-200",
          open ? "w-[280px]" : "w-[72px]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <SidebarHeader open={open} />
        <SidebarNav open={open} />
        <SidebarFooter open={open} />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main */}
      <div
        className={cn(
          "flex flex-1 flex-col transition-all duration-200",
          open ? "lg:pl-[280px]" : "lg:pl-[72px]",
        )}
      >
        <TopBar
          onMenu={() => setMobileOpen((s) => !s)}
          onToggle={() => setOpen((s) => !s)}
        />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {allowed ? children : <AccessDenied role={role} path={pathname} />}
        </main>
        <Footer />
      </div>
    </div>
  );
}

function SidebarHeader({ open }: { open: boolean }) {
  return (
    <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold">
        म
      </div>
      {open && (
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-sidebar-foreground">DTE Maharashtra</p>
          <p className="truncate text-[11px] text-sidebar-foreground/70">CHB Lecturer Portal</p>
        </div>
      )}
    </div>
  );
}

function SidebarNav({ open }: { open: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { role } = useRole();
  const nav = NAV_BY_ROLE[role];
  return (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
      {nav.map((group) => (
        <div key={group.label} className="mb-5">
          {open && (
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
              {group.label}
            </p>
          )}
          <ul className="space-y-1">
            {group.items.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={cn(
                      "group flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "text-sidebar-foreground/85 hover:bg-sidebar-accent",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {open && <span className="flex-1 truncate">{item.label}</span>}
                    {open && item.badge && (
                      <Badge className="h-5 bg-accent/20 text-[10px] text-accent-foreground hover:bg-accent/20">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({ open }: { open: boolean }) {
  const { user, role } = useRole();
  const roleLabel = ROLES.find((r) => r.value === role)?.label;
  return (
    <div className="border-t border-sidebar-border p-3">
      <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent/60 px-2 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
          {user.name.split(" ").slice(-1)[0][0]}
        </div>
        {open && (
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold">{user.name}</p>
            <p className="truncate text-[10px] text-sidebar-foreground/70">{roleLabel}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TopBar({ onMenu, onToggle }: { onMenu: () => void; onToggle: () => void }) {
  const { role, setRole, logout, user, lang, setLang } = useRole();
  const navigate = useNavigate();
  const currentRole = ROLES.find((r) => r.value === role)!;
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu} aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onToggle} aria-label="Toggle sidebar">
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden min-w-0 items-center gap-3 lg:flex">
        <div className="h-9 w-px bg-border" />
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Directorate of Technical Education
          </p>
          <p className="truncate text-xs text-muted-foreground">Government of Maharashtra · शासकीय पोर्टल</p>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="h-9 w-64 pl-8" placeholder="Search lecturer, bill, vacancy..." />
        </div>

        {/* Role switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 hidden sm:inline-flex">
              <Building2 className="h-3.5 w-3.5" />
              <span className="max-w-[140px] truncate">{currentRole.label}</span>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Switch role (demo)</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {ROLES.map((r) => (
              <DropdownMenuItem
                key={r.value}
                onSelect={() => setRole(r.value)}
                className={cn("flex flex-col items-start gap-0.5", role === r.value && "bg-primary-soft")}
              >
                <span className="text-sm font-medium">{r.label}</span>
                <span className="text-xs text-muted-foreground">{r.org}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Language */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === "en" ? "mr" : "en")}
          className="gap-1"
        >
          <Globe className="h-4 w-4" />
          <span className="text-xs font-semibold">{lang === "en" ? "EN" : "मरा"}</span>
        </Button>

        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-semibold">Notifications</p>
              <Badge variant="secondary" className="text-[10px]">{NOTIFICATIONS.length} new</Badge>
            </div>
            <ul className="max-h-80 divide-y divide-border overflow-y-auto">
              {NOTIFICATIONS.map((n) => (
                <li key={n.id} className="px-4 py-3 hover:bg-muted/50">
                  <p className="text-sm font-medium text-foreground">{n.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
                </li>
              ))}
            </ul>
          </PopoverContent>
        </Popover>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Profile">
              <UserCircle2 className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/app/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/app/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onSelect={() => {
                logout();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-2 text-xs text-muted-foreground sm:flex-row">
        <p>© 2025 Directorate of Technical Education, Government of Maharashtra. All rights reserved.</p>
      </div>
    </footer>
  );
}

function AccessDenied({ role, path }: { role: string; path: string }) {
  const roleLabel = ROLES.find((r) => r.value === role)?.label ?? role;
  return (
    <div className="mx-auto mt-12 max-w-xl rounded-xl border border-border bg-card p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <LogOut className="h-6 w-6" />
      </div>
      <h2 className="mt-4 text-lg font-bold">Access Restricted</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        <span className="font-medium">{roleLabel}</span> role does not have permission to access <code className="rounded bg-muted px-1.5 py-0.5 text-xs">{path}</code>.
      </p>
      <p className="mt-4 text-xs text-muted-foreground">Redirecting to your dashboard…</p>
    </div>
  );
}
