import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { REQUIREMENTS, DEPARTMENTS } from "@/lib/mock-data";
import { WorkflowSteps } from "@/components/workflow-steps";
import { Plus, Download, Filter, Search, Eye, ClipboardList, CheckCircle2 } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export const Route = createFileRoute("/app/requirements")({
  component: Requirements,
});

const SUBJECT_SPECIALISATIONS = [
  {
    value: "data-structures",
    label: "Data Structures & Algorithms",
    jobDescription:
      "Deliver theory and lab sessions for Data Structures & Algorithms, prepare lesson plans, conduct practical evaluations, mentor students on problem-solving assignments, maintain attendance records, and coordinate assessment activities as per DTE academic norms.",
  },
  {
    value: "dbms",
    label: "Database Management Systems",
    jobDescription:
      "Teach relational database concepts, SQL programming, normalization, transaction management and database design labs. Support students in practical assignments, evaluate lab records, and assist the department in curriculum-aligned assessment work.",
  },
  {
    value: "operating-systems",
    label: "Operating Systems",
    jobDescription:
      "Conduct lectures and practicals on process management, memory management, file systems, shell scripting and OS concepts. Prepare course material, evaluate practical submissions, and support academic monitoring for assigned classes.",
  },
  {
    value: "web-technologies",
    label: "Web Technologies",
    jobDescription:
      "Handle classroom and lab sessions covering HTML, CSS, JavaScript, web application fundamentals and deployment practices. Guide students through practical projects, evaluate submissions and maintain course progress documentation.",
  },
  {
    value: "thermodynamics",
    label: "Thermodynamics",
    jobDescription:
      "Deliver lectures and tutorials in Engineering Thermodynamics, support lab demonstrations, prepare assignments, evaluate student performance and coordinate workload completion for Mechanical Engineering classes.",
  },
  {
    value: "structural-analysis",
    label: "Structural Analysis",
    jobDescription:
      "Teach structural analysis concepts, conduct problem-solving sessions, guide students on analysis methods, evaluate assignments and support academic delivery for Civil Engineering divisions.",
  },
];

function Requirements() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <PageHeader
        title="Faculty Requirements"
        subtitle="Department-wise subject and workload requirements for CHB recruitment"
        breadcrumbs={[{ label: "Recruitment" }, { label: "Faculty Requirements" }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Export</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setOpen(true)}>
              <Plus className="mr-1.5 h-4 w-4" />New Requirement
            </Button>
          </>
        }
      />

      <Card className="mb-4">
        <CardContent className="p-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Approval Workflow
          </p>
          <WorkflowSteps
            steps={[
              { label: "HOD Draft", state: "done" },
              { label: "Principal Approval", state: "done" },
              { label: "Regional Approval", state: "current" },
              { label: "Approved", state: "pending" },
            ]}
          />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="h-9 w-64 pl-8" placeholder="Search requirement ID, department..." />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-40"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-44"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="pending">Pending Approval</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="ml-auto"><Filter className="mr-1.5 h-4 w-4" />More Filters</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Requirement ID</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead className="text-right">Lecturers</TableHead>
                <TableHead className="text-right">Workload (hrs)</TableHead>
                <TableHead>Raised By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {REQUIREMENTS.map((r) => (
                <TableRow key={r.id} className="hover:bg-muted/40">
                  <TableCell className="font-mono text-xs font-medium">{r.id}</TableCell>
                  <TableCell>{r.dept}</TableCell>
                  <TableCell className="text-muted-foreground">{r.institute}</TableCell>
                  <TableCell className="text-right font-semibold">{r.lecturers}</TableCell>
                  <TableCell className="text-right">{r.workload}</TableCell>
                  <TableCell className="text-muted-foreground">{r.raisedBy}</TableCell>
                  <TableCell className="text-muted-foreground">{r.date}</TableCell>
                  <TableCell><StatusBadge status={r.status} /></TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" asChild>
                      <Link to="/app/requirements"><Eye className="h-4 w-4" /></Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
            <p>Showing 1–{REQUIREMENTS.length} of {REQUIREMENTS.length} requirements</p>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <NewRequirementDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}

function NewRequirementDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [subject, setSubject] = useState(SUBJECT_SPECIALISATIONS[0].value);
  const selectedSubject = SUBJECT_SPECIALISATIONS.find((item) => item.value === subject) ?? SUBJECT_SPECIALISATIONS[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-primary" /> Raise Manpower Requirement
          </DialogTitle>
          <DialogDescription>
            Capture department-wise CHB lecturer requirements. Workflow: HOD Draft → Principal → Regional approval.
          </DialogDescription>
        </DialogHeader>

        <form
          id="req-form"
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const dept = (fd.get("dept") as string) || "Department";
            const count = fd.get("lecturers") || 0;
            onOpenChange(false);
            toast.success("Requirement raised", {
              description: `Draft created for ${dept} (${count} lecturer${Number(count) === 1 ? "" : "s"}). Sent for Principal review.`,
            });
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Academic Year *</Label>
              <Select defaultValue="2025-26" name="ay">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2025-26">2025-26</SelectItem>
                  <SelectItem value="2026-27">2026-27</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Semester *</Label>
              <Select defaultValue="odd" name="sem">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="odd">Odd (Jul – Dec)</SelectItem>
                  <SelectItem value="even">Even (Jan – Jun)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs">Department *</Label>
              <Select defaultValue={DEPARTMENTS[0]} name="dept">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs">Subjects / Specialisations *</Label>
              <Select value={subject} onValueChange={setSubject} name="subjects">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SUBJECT_SPECIALISATIONS.map((item) => (
                    <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs">No. of Lecturers Required *</Label>
              <Input name="lecturers" required type="number" min={1} defaultValue={2} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Total Weekly Workload (hrs) *</Label>
              <Input name="workload" required type="number" min={1} defaultValue={28} className="mt-1" />
            </div>

            <div>
              <Label className="text-xs">Classes / Divisions *</Label>
              <Input name="classes" required className="mt-1" placeholder="TY-CSE-A, SY-CSE-B" />
            </div>
            <div>
              <Label className="text-xs">Min. Qualification *</Label>
              <Input name="qual" required className="mt-1" defaultValue="M.Tech / M.E. (relevant)" />
            </div>

            <div>
              <Label className="text-xs">Proposed Rate (₹ / hr) *</Label>
              <Input name="rate" required type="number" defaultValue={750} className="mt-1" />
            </div>
            <div>
              <Label className="text-xs">Engagement Start *</Label>
              <Input name="start" required type="date" className="mt-1" />
            </div>

            <div className="sm:col-span-2">
              <Label className="text-xs">Job Description *</Label>
              <Textarea
                key={subject}
                name="jobDescription"
                required
                rows={4}
                className="mt-1"
                defaultValue={selectedSubject.jobDescription}
              />
            </div>
          </div>

          <div className="rounded-md border border-border bg-muted/40 p-3 text-xs text-muted-foreground">
            On submit, this requirement is created in <b>Draft</b> status and routed to the HOD for verification before Principal approval.
          </div>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button type="submit" form="req-form" className="gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Raise Requirement
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
