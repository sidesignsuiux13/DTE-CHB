import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ATTENDANCE } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { KpiCard } from "@/components/kpi-card";
import { Calendar, CheckCircle2, AlertTriangle, Clock, Plus, XCircle, Camera, MapPin, Eye } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/attendance")({
  component: Attendance,
});

type AttendanceItem = (typeof ATTENDANCE)[number];
type LecturerEntry = AttendanceItem & { time: string; department: string; attachment: string; location: string };
type DayLog = {
  date: string;
  status: string;
  totalHours: number;
  departments: string[];
  lectures: LecturerEntry[];
};

function Attendance() {
  const { role, user } = useRole();
  const isLecturer = role === "lecturer";
  const [selected, setSelected] = useState<AttendanceItem | null>(null);
  const [selectedDay, setSelectedDay] = useState<DayLog | null>(null);
  const [markOpen, setMarkOpen] = useState(false);
  const [decisions, setDecisions] = useState<Record<string, "Verified" | "Rejected">>({});
  const [lecturerEntries, setLecturerEntries] = useState<LecturerEntry[]>(() => (
    ATTENDANCE
      .filter((item) => item.lecturer === user.name)
      .map((item, index) => ({
        ...item,
        time: index === 0 ? "10:00 AM" : "12:00 PM",
        department: item.class.includes("CSE") ? "Computer Engineering" : "Information Technology",
        attachment: `${item.id}-classroom-geotag.jpg`,
        location: "18.5204° N, 73.8567° E",
      }))
  ));
  const [markForm, setMarkForm] = useState({
    date: "2025-06-13",
    time: "10:00",
    department: "Computer Engineering",
    subject: "DBMS",
    className: "SY-CSE-B",
    hours: "2",
    attachment: "",
  });

  const closeDrawer = () => setSelected(null);

  const decide = (attendance: AttendanceItem, decision: "Verified" | "Rejected") => {
    setDecisions((current) => ({ ...current, [attendance.id]: decision }));
    toast(decision === "Verified" ? "Attendance approved" : "Attendance rejected", {
      description: `${attendance.id} for ${attendance.lecturer} has been marked ${decision.toLowerCase()}.`,
    });
    closeDrawer();
  };

  const dayLogs = lecturerEntries.reduce<DayLog[]>((logs, entry) => {
    const existing = logs.find((log) => log.date === entry.date);
    if (existing) {
      existing.lectures.push(entry);
      existing.totalHours += entry.hours;
      if (!existing.departments.includes(entry.department)) existing.departments.push(entry.department);
      if (entry.status === "Pending") existing.status = "Pending";
      return logs;
    }
    return [
      ...logs,
      {
        date: entry.date,
        status: entry.status,
        totalHours: entry.hours,
        departments: [entry.department],
        lectures: [entry],
      },
    ];
  }, []).sort((a, b) => b.date.localeCompare(a.date));

  const addLecturerEntry = () => {
    const nextId = `ATT-${9900 + lecturerEntries.length + 1}`;
    const entry: LecturerEntry = {
      id: nextId,
      lecturer: user.name,
      date: markForm.date,
      subject: markForm.subject,
      class: markForm.className,
      hours: Number(markForm.hours) || 1,
      status: "Pending",
      time: markForm.time,
      department: markForm.department,
      attachment: markForm.attachment || `${nextId}-classroom-geotag.jpg`,
      location: "18.5204° N, 73.8567° E",
    };
    setLecturerEntries((current) => [entry, ...current]);
    setMarkOpen(false);
    toast.success("Attendance marked", {
      description: `${entry.subject} on ${entry.date} has been added to your daily log.`,
    });
  };

  if (isLecturer) {
    const totalHours = lecturerEntries.reduce((sum, entry) => sum + entry.hours, 0);
    const pending = lecturerEntries.filter((entry) => entry.status === "Pending").length;
    const approved = lecturerEntries.filter((entry) => entry.status === "Approved" || entry.status === "Verified").length;

    return (
      <div>
        <PageHeader
          title="Attendance Submission"
          subtitle="Track your lecture-wise attendance and daily submissions"
          actions={
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setMarkOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" />Mark Attendance
            </Button>
          }
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard icon={Calendar} label="Days Submitted" value={String(dayLogs.length)} tone="primary" />
          <KpiCard icon={Clock} label="Total Hours" value={`${totalHours} hrs`} tone="accent" />
          <KpiCard icon={CheckCircle2} label="Verified / Approved" value={String(approved)} tone="success" />
          <KpiCard icon={AlertTriangle} label="Pending" value={String(pending)} tone="warning" />
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Lectures</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dayLogs.map((log) => (
                  <TableRow key={log.date}>
                    <TableCell className="font-medium">{log.date}</TableCell>
                    <TableCell className="text-muted-foreground">{log.departments.join(", ")}</TableCell>
                    <TableCell className="text-right">{log.lectures.length}</TableCell>
                    <TableCell className="text-right font-semibold">{log.totalHours}</TableCell>
                    <TableCell><StatusBadge status={log.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSelectedDay(log)}>
                        <Eye className="mr-1.5 h-4 w-4" />Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={markOpen} onOpenChange={setMarkOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
              <DialogDescription>Add lecture details with a geo-tagged classroom attachment.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date"><Input type="date" value={markForm.date} onChange={(e) => setMarkForm((f) => ({ ...f, date: e.target.value }))} /></Field>
              <Field label="Time"><Input type="time" value={markForm.time} onChange={(e) => setMarkForm((f) => ({ ...f, time: e.target.value }))} /></Field>
              <Field label="Department">
                <Select value={markForm.department} onValueChange={(department) => setMarkForm((f) => ({ ...f, department }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Computer Engineering">Computer Engineering</SelectItem>
                    <SelectItem value="Information Technology">Information Technology</SelectItem>
                    <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                    <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Subject"><Input value={markForm.subject} onChange={(e) => setMarkForm((f) => ({ ...f, subject: e.target.value }))} /></Field>
              <Field label="Class"><Input value={markForm.className} onChange={(e) => setMarkForm((f) => ({ ...f, className: e.target.value }))} /></Field>
              <Field label="Hours"><Input type="number" min="1" value={markForm.hours} onChange={(e) => setMarkForm((f) => ({ ...f, hours: e.target.value }))} /></Field>
              <div className="sm:col-span-2">
                <Field label="Geo-tagged classroom photo">
                  <Input type="file" accept="image/*" onChange={(e) => setMarkForm((f) => ({ ...f, attachment: e.target.files?.[0]?.name ?? "" }))} />
                </Field>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setMarkOpen(false)}>Cancel</Button>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={addLecturerEntry}>
                Submit Attendance
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Sheet open={!!selectedDay} onOpenChange={(open) => { if (!open) setSelectedDay(null); }}>
          <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
            {selectedDay && (
              <>
                <SheetHeader>
                  <SheetTitle>Attendance Details</SheetTitle>
                  <SheetDescription>{selectedDay.date} · {selectedDay.totalHours} submitted hours</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-3">
                  {selectedDay.lectures.map((lecture) => (
                    <div key={lecture.id} className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-bold">{lecture.subject}</p>
                          <p className="text-xs text-muted-foreground">{lecture.class} · {lecture.time} · {lecture.hours} hrs</p>
                        </div>
                        <StatusBadge status={lecture.status} />
                      </div>
                      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                        <Detail label="Department" value={lecture.department} />
                        <Detail label="Attendance ID" value={lecture.id} />
                        <Detail label="Location" value={lecture.location} />
                        <Detail label="Attachment" value={lecture.attachment} />
                      </div>
                      <div className="mt-4 flex items-center gap-2 rounded-md border border-dashed border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                        <Camera className="h-4 w-4 text-primary" />
                        Geo-tagged classroom photo attached
                        <MapPin className="ml-auto h-4 w-4 text-accent" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    );
  }

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
                const status = (decisions[a.id] ?? a.status) as string;
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      {children}
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
