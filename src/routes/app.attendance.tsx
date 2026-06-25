import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { ATTENDANCE } from "@/lib/mock-data";
import { KpiCard } from "@/components/kpi-card";
import { Calendar, CheckCircle2, AlertTriangle, Clock, Plus, XCircle } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/attendance")({
  component: Attendance,
});

type AttendanceItem = (typeof ATTENDANCE)[number];

function Attendance() {
  const [selected, setSelected] = useState<AttendanceItem | null>(null);
  const [decisions, setDecisions] = useState<Record<string, "Verified" | "Rejected">>({});

  const closeDrawer = () => setSelected(null);

  const decide = (attendance: AttendanceItem, decision: "Verified" | "Rejected") => {
    setDecisions((current) => ({ ...current, [attendance.id]: decision }));
    toast(decision === "Verified" ? "Attendance approved" : "Attendance rejected", {
      description: `${attendance.id} for ${attendance.lecturer} has been marked ${decision.toLowerCase()}.`,
    });
    closeDrawer();
  };

  return (
    <div>
      <PageHeader
        title="Attendance Management"
        subtitle="Mark lectures, verify entries and approve workload"
        breadcrumbs={[{ label: "Operations" }, { label: "Attendance" }]}
        actions={
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-1.5 h-4 w-4" />Mark Attendance
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard icon={Calendar} label="Submitted This Week" value="284" tone="primary" />
        <KpiCard icon={Clock} label="Pending Verification" value="46" tone="warning" />
        <KpiCard icon={CheckCircle2} label="Approved" value="218" tone="success" trend={{ value: "+12", up: true }} />
        <KpiCard icon={AlertTriangle} label="AI Flags" value="7" tone="accent" />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ATTENDANCE.map((a) => {
                const status = decisions[a.id] ?? a.status;
                return (
                  <TableRow key={a.id}>
                    <TableCell className="font-mono text-xs">{a.id}</TableCell>
                    <TableCell className="font-medium">{a.lecturer}</TableCell>
                    <TableCell className="text-muted-foreground">{a.date}</TableCell>
                    <TableCell>{a.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{a.class}</TableCell>
                    <TableCell className="text-right font-semibold">{a.hours}</TableCell>
                    <TableCell><StatusBadge status={status} /></TableCell>
                    <TableCell>
                      {status === "Pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" onClick={() => setSelected(a)}>Verify</Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) closeDrawer(); }}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>Verify Attendance</SheetTitle>
                <SheetDescription>{selected.id} · {selected.lecturer}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Attendance Report</p>
                      <p className="mt-1 text-lg font-bold">{selected.subject}</p>
                    </div>
                    <StatusBadge status={decisions[selected.id] ?? selected.status} />
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <Detail label="Lecturer" value={selected.lecturer} />
                    <Detail label="Date" value={selected.date} />
                    <Detail label="Class" value={selected.class} />
                    <Detail label="Hours" value={`${selected.hours} hr${selected.hours === 1 ? "" : "s"}`} />
                  </div>
                </div>

                <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
                  <p className="font-semibold">Verification Notes</p>
                  <p className="mt-1 text-muted-foreground">
                    Confirm the lecture entry against timetable, class register and submitted workload before approving.
                  </p>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    className="bg-success text-success-foreground hover:bg-success/90"
                    onClick={() => decide(selected, "Verified")}
                  >
                    <CheckCircle2 className="mr-1.5 h-4 w-4" />Approve
                  </Button>
                  <Button variant="destructive" onClick={() => decide(selected, "Rejected")}>
                    <XCircle className="mr-1.5 h-4 w-4" />Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold text-foreground">{value}</p>
    </div>
  );
}
