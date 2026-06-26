import {
  LayoutDashboard, Briefcase, FileText, Users, Calendar, Receipt, Banknote,
  BarChart3, Shield, ScrollText, ClipboardList,
  GraduationCap, Building2, UserCircle2, Bell, BookOpen, LifeBuoy,
} from "lucide-react";
import type { Role } from "./mock-data";

export type NavItem = { label: string; to: string; icon: any; badge?: string };
export type NavGroup = { label: string; items: NavItem[] };

// Per-role navigation. Each role sees a completely different sidebar.
export const NAV_BY_ROLE: Record<Role, NavGroup[]> = {
  super_admin: [
    {
      label: "Governance",
      items: [
        { label: "Executive Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
        { label: "User Management", to: "/app/admin", icon: Shield },
        { label: "Audit Logs", to: "/app/audit-logs", icon: ScrollText },
      ],
    },
    {
      label: "State Analytics",
      items: [
        { label: "Attendance Analytics", to: "/app/attendance", icon: Calendar },
        { label: "Payment Analytics", to: "/app/payments", icon: Banknote },
        { label: "Reports & MIS", to: "/app/reports", icon: BarChart3 },
      ],
    },
  ],

  regional: [
    {
      label: "Overview",
      items: [
        { label: "Regional Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
      ],
    },
    {
      label: "Approval Queues",
      items: [
        { label: "Vacancy Approval", to: "/app/vacancies", icon: Briefcase, badge: "9" },
        { label: "Bill Approval", to: "/app/bills", icon: Receipt, badge: "12" },
      ],
    },
    {
      label: "Insights",
      items: [
        { label: "Regional Reports", to: "/app/reports", icon: BarChart3 },
      ],
    },
  ],

  principal: [
    {
      label: "Overview",
      items: [
        { label: "Institute Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
        { label: "User Management", to: "/app/admin", icon: Shield },
      ],
    },
    {
      label: "Recruitment",
      items: [
        { label: "Faculty Requirements", to: "/app/requirements", icon: ClipboardList },
      ],
    },
    {
      label: "Onboarding",
      items: [
        { label: "Candidates", to: "/app/applications", icon: FileText },
        { label: "Interviews", to: "/app/interviews", icon: Users },
        { label: "Appointments", to: "/app/appointments", icon: GraduationCap, badge: "3" },
      ],
    },
    {
      label: "Operations",
      items: [
        { label: "Attendance Approval", to: "/app/attendance", icon: Calendar, badge: "7" },
        { label: "Bill Approval", to: "/app/bills", icon: Receipt, badge: "5" },
      ],
    },
    {
      label: "Insights",
      items: [
        { label: "Institute Reports", to: "/app/reports", icon: BarChart3 },
      ],
    },
  ],

  candidate: [
    {
      label: "My Workspace",
      items: [
        { label: "My Profile", to: "/app/profile", icon: UserCircle2 },
      ],
    },
    {
      label: "Recruitment",
      items: [
        { label: "Vacancy Listings", to: "/app/vacancies", icon: Briefcase },
        { label: "My Applications", to: "/app/applications", icon: FileText },
        { label: "Interview Schedule", to: "/app/interviews", icon: Calendar, badge: "1" },
      ],
    },
  ],

  lecturer: [
    {
      label: "My Workspace",
      items: [
        { label: "My Dashboard", to: "/app/dashboard", icon: LayoutDashboard },
        { label: "My Profile", to: "/app/profile", icon: UserCircle2 },
      ],
    },
    {
      label: "Service",
      items: [
        { label: "Attendance Submission", to: "/app/attendance", icon: BookOpen },
        { label: "My Bills", to: "/app/bills", icon: Receipt },
      ],
    },
  ],

};

// Allowed routes per role — derived from sidebar definitions.
export function allowedRoutes(role: Role): string[] {
  const set = new Set<string>(["/app", "/app/dashboard"]);
  for (const g of NAV_BY_ROLE[role]) for (const i of g.items) set.add(i.to);
  return Array.from(set);
}

export function canAccess(role: Role, path: string): boolean {
  return allowedRoutes(role).some((p) => path === p || path.startsWith(p + "/"));
}

// Hint shown on Access Denied
export const ROLE_PURPOSE: Record<Role, string> = {
  super_admin: "State-wide governance, monitoring & analytics across all DTE institutes.",
  regional: "Regional approval authority for vacancies, appointments and bills.",
  principal: "Institute-level management — recruitment, attendance & bill approvals.",
  candidate: "Applicant self-service — profile, vacancy listings, applications and interview schedule.",
  lecturer: "Lecturer self-service — dashboard, profile, attendance submission and bills.",
};

// Icons handy for login screen
export { Shield, Building2, GraduationCap, Users, UserCircle2, LifeBuoy, Bell };
