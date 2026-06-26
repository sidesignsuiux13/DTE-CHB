import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { WorkflowSteps } from "@/components/workflow-steps";
import {
  Building2, Users, Briefcase, ClipboardCheck, Banknote, Calendar,
  TrendingUp, AlertTriangle, Sparkles, ArrowRight, FileText,
} from "lucide-react";
import {
  RECRUITMENT_TREND, EXPENDITURE_TREND, REGION_PERFORMANCE,
  SUBJECT_VACANCIES, KPI_STATE, REQUIREMENTS, BILLS, AI_INSIGHTS,
} from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const CHART_COLORS = ["#0F4C81", "#1E88E5", "#FF6F00", "#2E7D32", "#7B1FA2"];

function Dashboard() {
  const { role, user } = useRole();
  const greeting = `Welcome back, ${user.name.split(" ")[0]} ${user.name.split(" ").slice(-1)[0]}`;

  const kpis = (() => {
    switch (role) {
      case "lecturer":
        return [
          { icon: ClipboardCheck, label: "Profile Completion", value: "82%", tone: "info" as const, trend: { value: "+12%", up: true } },
          { icon: Briefcase, label: "Applied Vacancies", value: "3", tone: "primary" as const },
          { icon: Calendar, label: "Lectures (this month)", value: "48 hrs", tone: "accent" as const },
          { icon: Banknote, label: "Bill Status", value: "₹36,000", tone: "success" as const, trend: { value: "Approved", up: true } },
        ];
      case "principal":
        return [
          { icon: Briefcase, label: "Open Vacancies", value: "8", tone: "accent" as const },
          { icon: FileText, label: "Applications Received", value: "164", tone: "primary" as const, trend: { value: "+22", up: true } },
          { icon: Users, label: "Interviews Pending", value: "11", tone: "warning" as const },
          { icon: Banknote, label: "Bills to Approve", value: "23", tone: "info" as const },
        ];
      case "regional":
        return [
          { icon: Building2, label: "Institutes (Region)", value: "74", tone: "primary" as const },
          { icon: ClipboardCheck, label: "Pending Approvals", value: "31", tone: "warning" as const },
          { icon: Users, label: "Active Recruitments", value: "19", tone: "info" as const },
          { icon: Banknote, label: "Bills for Final Approval", value: "47", tone: "accent" as const },
        ];
      default:
        return [
          { icon: Building2, label: "Total Institutes", value: KPI_STATE.totalInstitutes.toString(), tone: "primary" as const },
          { icon: Users, label: "Active CHB Lecturers", value: KPI_STATE.activeLecturers.toLocaleString(), tone: "info" as const, trend: { value: "+124", up: true } },
          { icon: Briefcase, label: "Open Vacancies", value: KPI_STATE.openVacancies.toString(), tone: "accent" as const, trend: { value: "+38", up: true } },
          { icon: ClipboardCheck, label: "Pending Approvals", value: KPI_STATE.pendingApprovals.toString(), tone: "warning" as const },
          { icon: Banknote, label: "Monthly Expenditure", value: `₹${KPI_STATE.monthlyExpenditure} Cr`, tone: "success" as const, trend: { value: "+4.1%", up: true } },
          { icon: Calendar, label: "Attendance Posted", value: `${KPI_STATE.attendancePosted}%`, tone: "primary" as const, trend: { value: "+1.6%", up: true } },
        ];
    }
  })();

  return (
    <div>
      <PageHeader
        title={greeting}
        subtitle={`${user.designation} · Academic Year 2025-26`}
        breadcrumbs={[{ label: "Home", to: "/app/dashboard" }, { label: "Dashboard" }]}
        actions={
          <>
            <Button variant="outline" size="sm" asChild>
              <Link to="/app/reports">Generate Report</Link>
            </Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
              <Link to="/app/ai-center"><Sparkles className="mr-1.5 h-4 w-4" />AI Insights</Link>
            </Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {kpis.map((k, i) => <KpiCard key={i} {...k} />)}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="text-base">Recruitment Trends</CardTitle>
              <p className="text-xs text-muted-foreground">Applications vs. Selections · Last 6 months</p>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={RECRUITMENT_TREND}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0F4C81" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#0F4C81" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF6F00" stopOpacity={0.35}/>
                    <stop offset="95%" stopColor="#FF6F00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#eef0f3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Area type="monotone" dataKey="applied" stroke="#0F4C81" strokeWidth={2} fill="url(#g1)" />
                <Area type="monotone" dataKey="selected" stroke="#FF6F00" strokeWidth={2} fill="url(#g2)" />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Subject-wise Vacancies</CardTitle>
            <p className="text-xs text-muted-foreground">Open positions by department</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={SUBJECT_VACANCIES} dataKey="count" nameKey="subject" innerRadius={50} outerRadius={90} paddingAngle={2}>
                  {SUBJECT_VACANCIES.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-2 grid grid-cols-2 gap-1 text-[11px]">
              {SUBJECT_VACANCIES.map((s, i) => (
                <div key={s.subject} className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-sm" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
                  <span className="truncate text-muted-foreground">{s.subject}</span>
                  <span className="ml-auto font-semibold">{s.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Monthly Expenditure (₹ Cr)</CardTitle>
            <p className="text-xs text-muted-foreground">CHB lecturer payments — All institutes</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={EXPENDITURE_TREND}>
                <CartesianGrid stroke="#eef0f3" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#0F4C81" strokeWidth={2.5} dot={{ fill: "#FF6F00", r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regional Performance</CardTitle>
            <p className="text-xs text-muted-foreground">Utilisation % by region</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REGION_PERFORMANCE} layout="vertical">
                <CartesianGrid stroke="#eef0f3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis dataKey="region" type="category" tick={{ fontSize: 11 }} width={70} />
                <Tooltip />
                <Bar dataKey="utilization" fill="#1E88E5" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Workflow visualisation + approval queue + AI alerts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Bill Approval Workflow — Live Status</CardTitle>
            <p className="text-xs text-muted-foreground">Sample: BIL-2025-2202 · Rahul M. Deshpande · ₹41,600</p>
          </CardHeader>
          <CardContent className="pt-4">
            <WorkflowSteps
              steps={[
                { label: "Lecturer Submit", state: "done" },
                { label: "HOD Verify", state: "done" },
                { label: "Principal Approve", state: "done" },
                { label: "Regional Approve", state: "done" },
                { label: "Payment Processing", state: "current" },
                { label: "Paid", state: "pending" },
              ]}
            />
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <Legend2 color="bg-success" label="Approved" />
              <Legend2 color="bg-info" label="In Progress" />
              <Legend2 color="bg-warning" label="Pending" />
              <Legend2 color="bg-destructive" label="Rejected" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Approval Queue</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/requirements">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {REQUIREMENTS.slice(0, 4).map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3 hover:bg-muted/40">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{r.id} · {r.dept}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{r.institute} · {r.lecturers} lecturers</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* AI insights + recent bills */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle className="flex items-center gap-2 text-base"><Sparkles className="h-4 w-4 text-accent" />AI Intelligence Alerts</CardTitle>
              <p className="text-xs text-muted-foreground">Live anomalies and recommendations</p>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/ai-center">Open Center <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {AI_INSIGHTS.slice(0, 3).map((a, i) => (
              <div key={i} className="rounded-lg border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                    a.severity === "high" ? "bg-destructive/10 text-destructive" :
                    a.severity === "medium" ? "bg-warning/15 text-warning-foreground" :
                    "bg-info/10 text-info"
                  }`}>{a.kind}</span>
                  <p className="truncate text-sm font-medium">{a.title}</p>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{a.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base">Recent Bills</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/app/bills">View all <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link>
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="divide-y divide-border">
              {BILLS.slice(0, 5).map((b) => (
                <li key={b.id} className="flex items-center justify-between gap-3 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{b.lecturer}</p>
                    <p className="truncate text-xs text-muted-foreground">{b.id} · {b.month} · {b.hours} hrs</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <p className="text-sm font-semibold">₹{b.amount.toLocaleString()}</p>
                    <StatusBadge status={b.status} />
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Legend2({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}
