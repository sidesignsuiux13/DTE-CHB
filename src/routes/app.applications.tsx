import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { APPLICATIONS, VACANCIES } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import {
  CalendarDays, Check, Download, FileCheck2, FileText, GraduationCap, X,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/applications")({
  component: Applications,
});

type Application = (typeof APPLICATIONS)[number];

const DOCS = [
  "Resume / CV",
  "SSC marksheet",
  "HSC / Diploma marksheet",
  "Degree passing certificate",
  "Post-graduation marksheets",
  "Experience certificates",
];

function Applications() {
  const { role } = useRole();
  const isCandidate = role === "candidate";
  const [selected, setSelected] = useState<Application | null>(null);
  const [scheduleFor, setScheduleFor] = useState<Application | null>(null);
  const [decisions, setDecisions] = useState<Record<string, "Approved" | "Rejected">>({});
  const [scheduled, setScheduled] = useState<Record<string, string>>({});
  const [subjectFilter, setSubjectFilter] = useState("all");

  const subjectOptions = Array.from(new Set(APPLICATIONS.map((application) => application.subject)));
  const filteredApplications = subjectFilter === "all"
    ? APPLICATIONS
    : APPLICATIONS.filter((application) => application.subject === subjectFilter);
  const getVacancy = (application: Application) => VACANCIES.find((vacancy) => vacancy.id === application.vacancy);

  const decide = (application: Application, decision: "Approved" | "Rejected") => {
    setDecisions((current) => ({ ...current, [application.id]: decision }));
    toast(decision === "Approved" ? "Candidate approved" : "Candidate rejected", {
      description: `${application.candidate} has been marked ${decision.toLowerCase()}.`,
    });
  };

  const scheduleInterview = () => {
    if (!scheduleFor) return;
    setScheduled((current) => ({ ...current, [scheduleFor.id]: "Interview Scheduled" }));
    toast.success("Interview scheduled", {
      description: `${scheduleFor.candidate} has been moved to interview scheduling.`,
    });
    setScheduleFor(null);
  };

  return (
    <div>
      <PageHeader
        title={isCandidate ? "My Applications" : "Candidates"}
        subtitle={isCandidate ? "Track your submitted applications and interview status" : "Applicant tracking with eligibility review and onboarding actions"}
        breadcrumbs={isCandidate ? undefined : [{ label: "Onboarding" }, { label: "Candidates" }]}
        actions={<Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Export Excel</Button>}
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2 border-b border-border p-4 sm:max-w-sm">
            <Label className="text-xs">Subjects / Specialisations *</Label>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects / Specialisations</SelectItem>
                {subjectOptions.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>App ID</TableHead>
                <TableHead>{isCandidate ? "College" : "Candidate"}</TableHead>
                <TableHead>Vacancy</TableHead>
                <TableHead>{isCandidate ? "Department" : "Qualification"}</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead className="text-right">AI Score</TableHead>
                <TableHead>Status</TableHead>
                {!isCandidate && <TableHead className="text-right">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((a) => {
                const status = scheduled[a.id] ?? decisions[a.id] ?? a.status;
                const canSchedule = decisions[a.id] === "Approved" && !scheduled[a.id];
                const vacancy = getVacancy(a);
                return (
                  <TableRow key={a.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono text-xs">{a.id}</TableCell>
                    <TableCell className="font-medium">{isCandidate ? vacancy?.institute ?? "—" : a.candidate}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{a.vacancy}</TableCell>
                    <TableCell className="text-sm">{isCandidate ? vacancy?.dept ?? a.subject : a.qual}</TableCell>
                    <TableCell className="text-muted-foreground">{a.exp}</TableCell>
                    <TableCell className="text-right">
                      <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold ${
                        a.score >= 85 ? "bg-success/10 text-success" :
                        a.score >= 70 ? "bg-info/10 text-info" : "bg-warning/15 text-warning-foreground"
                      }`}>{a.score}</span>
                    </TableCell>
                    <TableCell><StatusBadge status={status} /></TableCell>
                    {!isCandidate && (
                      <TableCell>
                        <div className="flex justify-end gap-1.5">
                          <Button size="sm" variant="ghost" onClick={() => setSelected(a)}>Details</Button>
                          {canSchedule && (
                            <Button size="sm" onClick={() => setScheduleFor(a)}>
                              <CalendarDays className="mr-1.5 h-3.5 w-3.5" />Schedule Interview
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.candidate}</SheetTitle>
                <SheetDescription>{selected.id} · {selected.vacancy} · {selected.subject}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Candidate Score</p>
                      <p className="mt-1 text-3xl font-bold">{selected.score}</p>
                    </div>
                    <StatusBadge status={decisions[selected.id] ?? selected.status} />
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <Info label="Qualification" value={selected.qual} />
                    <Info label="Experience" value={selected.exp} />
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold">Supporting Documents</p>
                  <div className="space-y-2">
                    {DOCS.map((doc) => (
                      <div key={doc} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div className="flex items-center gap-2 text-sm">
                          <FileCheck2 className="h-4 w-4 text-success" />
                          <span>{doc}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <FileText className="mr-1.5 h-3.5 w-3.5" />View
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    className="bg-success text-success-foreground hover:bg-success/90"
                    onClick={() => decide(selected, "Approved")}
                    disabled={decisions[selected.id] === "Approved"}
                  >
                    <Check className="mr-1.5 h-4 w-4" />Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => decide(selected, "Rejected")}
                    disabled={decisions[selected.id] === "Rejected"}
                  >
                    <X className="mr-1.5 h-4 w-4" />Reject
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={!!scheduleFor} onOpenChange={(open) => { if (!open) setScheduleFor(null); }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              {scheduleFor?.candidate} · {scheduleFor?.vacancy}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Date</Label>
              <Input type="date" defaultValue="2025-06-28" />
            </div>
            <div className="space-y-2">
              <Label>Time</Label>
              <Input type="time" defaultValue="11:00" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Meeting Link</Label>
              <Input type="url" placeholder="https://meet.google.com/abc-defg-hij" />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Panel</Label>
              <Textarea defaultValue="Principal, HOD, Subject Expert" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setScheduleFor(null)}>Cancel</Button>
            <Button onClick={scheduleInterview}>
              <GraduationCap className="mr-1.5 h-4 w-4" />Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-semibold text-foreground">{value}</p>
    </div>
  );
}
