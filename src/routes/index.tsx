import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRole } from "@/lib/role-context";
import { ROLES, type Role, ROLE_USERS, ANNOUNCEMENTS, VACANCIES } from "@/lib/mock-data";
import { ROLE_PURPOSE } from "@/lib/rbac";
import {
  Shield, Building2, GraduationCap, Users, UserCircle2, Wallet, LifeBuoy,
  ArrowRight, ShieldCheck, Lock, Sparkles, CheckCircle2, Award, FileCheck2,
  TrendingUp, Fingerprint, KeyRound, Megaphone, Bell, Calendar, Briefcase, MapPin,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Login — CHB Lecturer Management Portal · DTE Maharashtra" },
      { name: "description", content: "Role-based sign-in for the CHB Lecturer Management Portal, Directorate of Technical Education, Government of Maharashtra." },
    ],
  }),
  component: Login,
});

const ROLE_ICON: Record<Role, any> = {
  super_admin: Shield,
  regional: Building2,
  principal: GraduationCap,
  candidate: UserCircle2,
  lecturer: UserCircle2,
};

const ROLE_TONE: Record<Role, string> = {
  super_admin: "from-primary to-info",
  regional: "from-info to-primary",
  principal: "from-accent to-warning",
  candidate: "from-primary to-accent",
  lecturer: "from-primary to-accent",
};

const STATS = [
  { label: "Government Institutes", value: "412", icon: Building2 },
  { label: "Active CHB Lecturers", value: "18,640", icon: GraduationCap },
  { label: "Bills Processed FY24", value: "₹ 284 Cr", icon: Wallet },
  { label: "Approval Turnaround", value: "↓ 62%", icon: TrendingUp },
];

const TRUST = [
  { icon: ShieldCheck, label: "STQC Certified" },
  { icon: Lock, label: "WCAG 2.1 AA" },
  { icon: Fingerprint, label: "Aadhaar e-KYC" },
  { icon: KeyRound, label: "DigiLocker" },
];

function Login() {
  const navigate = useNavigate();
  const { setRole } = useRole();

  const signIn = (r: Role) => {
    setRole(r);
    navigate({ to: "/app/dashboard" });
  };

  return (
    <div className="min-h-dvh bg-background">
      {/* Top govt strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-[11px] sm:px-6">
          <p>भारत सरकार · Government of India · महाराष्ट्र शासन · Government of Maharashtra</p>
          <p className="hidden sm:block">Skip to main content · Screen reader · A+ A A−</p>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground text-xl font-bold shadow-sm">
            म
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              महाराष्ट्र शासन · Government of Maharashtra
            </p>
            <h1 className="truncate text-base font-bold text-foreground sm:text-lg">
              Directorate of Technical Education
            </h1>
            <p className="truncate text-xs text-muted-foreground">
              तंत्र शिक्षण संचालनालय · CHB Lecturer Management Portal
            </p>
          </div>
          <span className="hidden items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium text-muted-foreground sm:inline-flex">
            <ShieldCheck className="h-3.5 w-3.5 text-success" /> Secure · NIC Cloud · TLS 1.3
          </span>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-primary via-primary to-[hsl(var(--info))] text-primary-foreground">
        {/* Decorative ashoka-chakra style rings */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-[260px] w-[260px] rounded-full border border-white/15" />
        <div className="pointer-events-none absolute right-12 top-12 h-[120px] w-[120px] rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.6)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.6)_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground ring-1 ring-inset ring-white/20 backdrop-blur">
                <Sparkles className="h-3 w-3 text-accent" />
                Unified CHB Lifecycle · Recruitment to Payment
              </span>
              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.6rem]">
                One portal for every <span className="text-accent">CHB lecturer</span><br className="hidden sm:block" />
                across Maharashtra's technical institutes.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-primary-foreground/85 sm:text-base">
                Workload verification, attendance, AI-assisted screening, multi-level approvals
                and bill generation — orchestrated end-to-end for DTE, Regional Offices,
                Principals, HODs, Accounts and Lecturers.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {TRUST.map((t) => (
                  <span
                    key={t.label}
                    className="inline-flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1 text-[11px] font-medium text-primary-foreground/90 ring-1 ring-inset ring-white/15 backdrop-blur"
                  >
                    <t.icon className="h-3 w-3" /> {t.label}
                  </span>
                ))}
              </div>

              <ul className="mt-6 grid max-w-xl gap-2 text-sm text-primary-foreground/90 sm:grid-cols-2">
                {[
                  "Role-based dashboards & approval queues",
                  "AI merit screening & anomaly detection",
                  "Auto-generated bills with TDS computation",
                  "DigiLocker · Aadhaar · DBT-ready payouts",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hero credential card */}
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-accent/30 blur-2xl" />
              <Card className="relative border-white/10 bg-card/95 shadow-2xl backdrop-blur">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Lock className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-foreground">Secure Sign-in</p>
                      <p className="text-[11px] text-muted-foreground">DTE credentials or Aadhaar OTP</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="uid" className="text-xs">User ID / Email</Label>
                      <Input id="uid" placeholder="name@dtemaharashtra.gov.in" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="pwd" className="text-xs">Password</Label>
                      <Input id="pwd" type="password" placeholder="••••••••" className="mt-1" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked /> Remember me
                      </label>
                      <a className="text-primary hover:underline" href="#">Forgot password?</a>
                    </div>
                    <Button
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => signIn("super_admin")}
                    >
                      Sign in <ArrowRight className="ml-1.5 h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <div className="h-px flex-1 bg-border" />
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">or</span>
                      <div className="h-px flex-1 bg-border" />
                    </div>
                    <Button variant="outline" className="w-full gap-2">
                      <Fingerprint className="h-4 w-4" /> Sign in with Aadhaar OTP
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <p className="mt-3 text-center text-[11px] text-primary-foreground/70">
                <ShieldCheck className="mr-1 inline h-3 w-3" />
                Protected by NIC SOC · End-to-end TLS 1.3 encryption
              </p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-white/10 bg-black/10 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-white/10 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-3 px-4 py-4 sm:px-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10 text-accent ring-1 ring-inset ring-white/15">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-bold leading-tight">{s.value}</p>
                  <p className="truncate text-[11px] text-primary-foreground/75">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ ANNOUNCEMENTS + ACTIVE VACANCIES ============ */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:py-14">
          {/* Announcements */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3 py-1 text-[11px] font-semibold text-accent">
                  <Megaphone className="h-3 w-3" /> What's New
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">Latest Announcements</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Circulars, recruitment drives and system updates</p>
              </div>
              <a href="#" className="hidden text-xs font-medium text-primary hover:underline sm:inline">
                View all →
              </a>
            </div>

            <div className="space-y-3">
              {ANNOUNCEMENTS.map((a) => (
                <Card key={a.id} className="group overflow-hidden transition-shadow hover:shadow-md">
                  <CardContent className="flex items-start gap-3 p-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${a.urgent ? "bg-destructive/10 text-destructive" : "bg-primary-soft text-primary"}`}>
                      {a.urgent ? <Bell className="h-5 w-5" /> : <Megaphone className="h-5 w-5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${a.urgent ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"}`}>
                          {a.tag}
                        </span>
                        {a.urgent && (
                          <span className="rounded-md bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                            Urgent
                          </span>
                        )}
                        <span className="ml-auto text-[11px] text-muted-foreground">
                          <Calendar className="mr-1 inline h-3 w-3" />{a.date}
                        </span>
                      </div>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                        {a.title}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Active Vacancies */}
          <div>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-[11px] font-semibold text-success">
                  <Briefcase className="h-3 w-3" /> Open Now
                </span>
                <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">Active Vacancies</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">Apply directly after signing in as <b>CHB Lecturer</b></p>
              </div>
              <button
                onClick={() => signIn("lecturer")}
                className="hidden items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 sm:inline-flex"
              >
                Sign in to apply <ArrowRight className="h-3 w-3" />
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {VACANCIES.filter((v) => v.status === "Applications Open").map((v) => (
                <button
                  key={v.id}
                  onClick={() => signIn("lecturer")}
                  className="group relative overflow-hidden rounded-xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-info to-accent" />
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-mono text-[10px] font-semibold text-muted-foreground">{v.id}</p>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                      {v.openings} opening{v.openings === 1 ? "" : "s"}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-2 text-sm font-bold leading-snug text-foreground group-hover:text-primary">
                    {v.title}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><GraduationCap className="h-3 w-3" />{v.dept}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{v.institute}</span>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-2.5 text-[11px]">
                    <span className="text-muted-foreground">
                      <Calendar className="mr-1 inline h-3 w-3" />Closes {v.deadline}
                    </span>
                    <span className="font-semibold text-muted-foreground">{v.applied} applied</span>
                  </div>
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-md bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    Apply <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ ROLE SELECTION ============ */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">

        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <section>
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-soft px-3 py-1 text-[11px] font-semibold text-primary">
                  <Lock className="h-3 w-3" /> Role-based access control
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
                  Sign in by your role
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                  Every persona experiences a completely different application — distinct dashboard,
                  navigation, approval queues, reports and permissions.
                </p>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-md border border-border bg-muted/40 px-2.5 py-1.5 text-[11px] text-muted-foreground md:inline-flex">
                <Award className="h-3.5 w-3.5 text-accent" /> 7 personas · Live demo
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {ROLES.map((r) => {
                const Icon = ROLE_ICON[r.value];
                const u = ROLE_USERS[r.value];
                return (
                  <button
                    key={r.value}
                    onClick={() => signIn(r.value)}
                    className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                  >
                    <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${ROLE_TONE[r.value]}`} />
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary-soft/60 opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="relative flex items-start gap-3">
                      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${ROLE_TONE[r.value]} text-white shadow-sm`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-foreground">{r.label}</p>
                        <p className="truncate text-[11px] text-muted-foreground">{r.org}</p>
                      </div>
                    </div>
                    <p className="relative mt-3 line-clamp-2 text-xs text-muted-foreground">
                      {ROLE_PURPOSE[r.value]}
                    </p>
                    <div className="relative mt-4 flex items-center justify-between border-t border-border pt-3">
                      <div className="min-w-0">
                        <p className="truncate text-[11px] font-medium text-foreground">{u.name}</p>
                        <p className="truncate text-[10px] text-muted-foreground">{u.email}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        Enter <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* RIGHT — approval hierarchy & info */}
          <aside className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border bg-gradient-to-br from-primary-soft to-card p-5">
              <div className="flex items-center gap-2">
                <FileCheck2 className="h-5 w-5 text-primary" />
                <p className="text-sm font-bold text-foreground">Approval Hierarchy</p>
              </div>
              <ul className="mt-4 space-y-3 text-xs text-muted-foreground">
                {[
                  { k: "Vacancy", v: "HOD → Principal → Regional" },
                  { k: "Appointment", v: "Panel → Principal → Regional" },
                  { k: "Attendance", v: "Lecturer → HOD → Principal" },
                  { k: "Bill", v: "Lecturer → HOD → Principal → Regional → Accounts" },
                ].map((h) => (
                  <li key={h.k} className="rounded-md border border-border bg-card px-3 py-2">
                    <p className="font-semibold text-foreground">{h.k}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed">{h.v}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-dashed border-border bg-muted/40 p-4 text-xs text-muted-foreground">
              <p className="mb-1 font-semibold text-foreground">Demo prototype</p>
              Pick any persona to enter that role's portal. Sidebars, dashboards and
              approval queues change per role.
            </div>

            <div className="rounded-xl border border-border bg-card p-4 text-xs text-muted-foreground">
              <p className="mb-2 font-semibold text-foreground">Helpdesk</p>
              <p>Toll-free 1800-XXX-XXXX · helpdesk@dtemaharashtra.gov.in</p>
              <p className="mt-1">Mon–Sat · 09:00 – 18:00 IST</p>
            </div>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <p className="mx-auto max-w-7xl px-4 py-4 text-center text-[11px] text-primary-foreground/70 sm:px-6">
          © 2025 Directorate of Technical Education, Government of Maharashtra ·
          WCAG 2.1 AA · STQC Certified · Hosted on NIC Cloud (MeitY)
        </p>
      </footer>
    </div>
  );
}
