import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, FileText, BarChart3, Users, Banknote, Calendar, ScrollText, Building2 } from "lucide-react";

export const Route = createFileRoute("/app/reports")({
  component: Reports,
});

const REPORTS = [
  { icon: Building2, title: "Vacancy Report", desc: "Department-wise open and closed vacancies across all institutes.", lastRun: "2 hrs ago" },
  { icon: Users, title: "Recruitment Report", desc: "Application, shortlist and selection counts with region breakdown.", lastRun: "Today, 9:14 AM" },
  { icon: Calendar, title: "Attendance Report", desc: "Lecturer-wise lecture hours, leaves and AI anomaly summary.", lastRun: "Yesterday" },
  { icon: BarChart3, title: "Lecturer Performance", desc: "Workload coverage, attendance %, student feedback aggregates.", lastRun: "3 days ago" },
  { icon: FileText, title: "Bill Report", desc: "Bills generated, approved and rejected with workflow turnaround times.", lastRun: "1 hr ago" },
  { icon: Banknote, title: "Payment Report", desc: "UTR-wise disbursement, pending and failed payment ledger.", lastRun: "Today, 11:02 AM" },
  { icon: ScrollText, title: "Audit Report", desc: "Approval logs, action trails and exception events.", lastRun: "5 hrs ago" },
  { icon: BarChart3, title: "Regional Analytics", desc: "Region-wise utilisation, expenditure and recruitment heat-map.", lastRun: "Yesterday" },
];

function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports & Analytics"
        subtitle="Pre-built reports — export to PDF or Excel · scheduled email delivery available"
        breadcrumbs={[{ label: "Insights" }, { label: "Reports & Analytics" }]}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {REPORTS.map((r) => (
          <Card key={r.title} className="kpi-card border-0 shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-soft text-primary">
                  <r.icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] text-muted-foreground">Last run: {r.lastRun}</span>
              </div>
              <CardTitle className="mt-3 text-base">{r.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{r.desc}</p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1"><FileSpreadsheet className="mr-1.5 h-4 w-4" />Excel</Button>
                <Button size="sm" className="flex-1"><FileText className="mr-1.5 h-4 w-4" />PDF</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
