import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { VACANCIES } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { Plus, Download, ExternalLink, Upload, CheckCircle2, FileText, Send } from "lucide-react";
import { KpiCard } from "@/components/kpi-card";
import { Briefcase, Users, Calendar } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/vacancies")({
  component: Vacancies,
});

type Vacancy = (typeof VACANCIES)[number];

function Vacancies() {
  const { role } = useRole();
  const isCandidate = role === "candidate";
  const [selected, setSelected] = useState<Vacancy | null>(null);
  const [roleFilter, setRoleFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [instituteFilter, setInstituteFilter] = useState("all");
  const jobRoles = Array.from(new Set(VACANCIES.map((vacancy) => vacancy.title.replace("CHB Lecturer — ", ""))));
  const departments = Array.from(new Set(VACANCIES.map((vacancy) => vacancy.dept)));
  const institutes = Array.from(new Set(VACANCIES.map((vacancy) => vacancy.institute)));
  const filteredVacancies = VACANCIES.filter((vacancy) => (
    (roleFilter === "all" || vacancy.title.replace("CHB Lecturer — ", "") === roleFilter) &&
    (departmentFilter === "all" || vacancy.dept === departmentFilter) &&
    (instituteFilter === "all" || vacancy.institute === instituteFilter)
  ));

  return (
    <div>
      <PageHeader
        title="Vacancy Management"
        subtitle={isCandidate ? "Browse and apply to open CHB lecturer vacancies" : "Publish, monitor and close CHB lecturer vacancies"}
        breadcrumbs={[{ label: "Recruitment" }, { label: "Vacancies" }]}
        actions={
          !isCandidate && (
            <>
              <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Advert PDF</Button>
              <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Plus className="mr-1.5 h-4 w-4" />Create Vacancy
              </Button>
            </>
          )
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard icon={Briefcase} label="Total Vacancies" value="32" tone="primary" />
        <KpiCard icon={FileText} label="Applications" value="847" tone="info" trend={{ value: "+128", up: true }} />
        <KpiCard icon={Users} label="Shortlisted" value="186" tone="accent" />
        <KpiCard icon={Calendar} label="Closing This Week" value="6" tone="warning" />
      </div>

      {isCandidate && (
        <Card className="mt-4">
          <CardContent className="grid gap-3 p-4 md:grid-cols-3">
            <div>
              <Label className="text-xs">Job Role Type</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Roles</SelectItem>
                  {jobRoles.map((jobRole) => (
                    <SelectItem key={jobRole} value={jobRole}>{jobRole}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Department</Label>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>{department}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Institute</Label>
              <Select value={instituteFilter} onValueChange={setInstituteFilter}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Institutes</SelectItem>
                  {institutes.map((institute) => (
                    <SelectItem key={institute} value={institute}>{institute}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vacancy ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Institute</TableHead>
                <TableHead className="text-right">Openings</TableHead>
                <TableHead className="text-right">Applied</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVacancies.map((v) => {
                const canApply = isCandidate && ["Applications Open", "Draft"].includes(v.status);
                return (
                  <TableRow
                    key={v.id}
                    className="hover:bg-muted/40"
                  >
                    <TableCell className="font-mono text-xs font-medium">{v.id}</TableCell>
                    <TableCell className="max-w-xs"><p className="truncate font-medium">{v.title}</p></TableCell>
                    <TableCell className="text-muted-foreground">{v.dept}</TableCell>
                    <TableCell className="text-muted-foreground">{v.institute}</TableCell>
                    <TableCell className="text-right font-semibold">{v.openings}</TableCell>
                    <TableCell className="text-right">{v.applied}</TableCell>
                    <TableCell className="text-muted-foreground">{v.deadline}</TableCell>
                    <TableCell><StatusBadge status={v.status} /></TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      {isCandidate ? (
                        canApply ? (
                          <Button
                            size="sm"
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={() => setSelected(v)}
                          >
                            Apply
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">—</span>
                        )
                      ) : (
                        <Button size="sm" variant="ghost"><ExternalLink className="h-4 w-4" /></Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {isCandidate && (
        <ApplyDialog
          vacancy={selected}
          onClose={() => setSelected(null)}
          onSubmitted={(v) => {
            setSelected(null);
            toast.success("Application submitted successfully", {
              description: `Your application for ${v.id} — ${v.title} has been received. Track status under My Applications.`,
            });
          }}
        />
      )}
    </div>
  );
}

function ApplyDialog({
  vacancy, onClose, onSubmitted,
}: { vacancy: Vacancy | null; onClose: () => void; onSubmitted: (v: Vacancy) => void }) {
  return (
    <Dialog open={!!vacancy} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            Apply — {vacancy?.title}
          </DialogTitle>
          <DialogDescription>
            {vacancy?.id} · {vacancy?.dept} · {vacancy?.institute} · Closes {vacancy?.deadline}
          </DialogDescription>
        </DialogHeader>

        <form
          id="apply-form"
          onSubmit={(e) => { e.preventDefault(); if (vacancy) onSubmitted(vacancy); }}
          className="space-y-5"
        >
          <Section title="Personal Details">
            <Field label="Full Name *"><Input required defaultValue="Priya S. Sawant" /></Field>
            <Field label="Date of Birth *"><Input type="date" required defaultValue="1995-04-12" /></Field>
            <Field label="Mobile *"><Input required defaultValue="+91 98765 43210" /></Field>
            <Field label="Email *"><Input type="email" required defaultValue="priya.sawant@chb.dte.gov.in" /></Field>
            <Field label="Aadhaar Number *"><Input required placeholder="XXXX-XXXX-XXXX" /></Field>
            <Field label="PAN Number *"><Input required placeholder="ABCDE1234F" /></Field>
            <Field label="Category">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
              </select>
            </Field>
          </Section>

          <Section title="10th (SSC) Details">
            <Field label="Board *"><Input required placeholder="Maharashtra State Board" /></Field>
            <Field label="Year *"><Input required type="number" placeholder="2010" /></Field>
            <Field label="Marks Obtained *"><Input required type="number" placeholder="540" /></Field>
            <Field label="Out of *"><Input required type="number" placeholder="600" /></Field>
            <Field label="Percentage *"><Input required type="number" step="0.01" placeholder="90.00" /></Field>
          </Section>

          <Section title="12th (HSC) Details">
            <Field label="Board *"><Input required placeholder="Maharashtra State Board" /></Field>
            <Field label="Year *"><Input required type="number" placeholder="2012" /></Field>
            <Field label="Stream *">
              <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                <option>Science</option><option>Commerce</option><option>Diploma</option>
              </select>
            </Field>
            <Field label="Marks Obtained *"><Input required type="number" placeholder="520" /></Field>
            <Field label="Out of *"><Input required type="number" placeholder="600" /></Field>
            <Field label="Percentage *"><Input required type="number" step="0.01" placeholder="86.67" /></Field>
          </Section>

          <Section title="Graduation & Higher Education">
            <Field label="UG Degree *"><Input required placeholder="B.E. Computer Engineering" /></Field>
            <Field label="University *"><Input required placeholder="Savitribai Phule Pune University" /></Field>
            <Field label="Year of Passing *"><Input required type="number" placeholder="2016" /></Field>
            <Field label="CGPA / % *"><Input required placeholder="8.4 CGPA" /></Field>
            <Field label="PG Degree"><Input placeholder="M.Tech (CSE)" /></Field>
            <Field label="PG University"><Input placeholder="COEP Technological University" /></Field>
            <Field label="NET / SET / PhD"><Input placeholder="NET qualified (2020)" /></Field>
            <Field label="Total Teaching Experience"><Input placeholder="3.5 years" /></Field>
          </Section>

          <Section title="Supporting Documents" cols={1}>
            <UploadRow label="Resume / CV (PDF) *" />
            <UploadRow label="10th / 12th Marksheets (PDF) *" />
            <UploadRow label="Graduation Marksheets (PDF) *" />
            <UploadRow label="Graduation Certifications / Degree Certificate (PDF) *" />
            <UploadRow label="Post-graduation / NET / SET Certificates (PDF)" />
            <UploadRow label="Aadhaar Card (PDF / JPG) *" />
            <UploadRow label="PAN Card (PDF / JPG) *" />
            <UploadRow label="Experience Letters (PDF)" />
          </Section>

          <div className="rounded-lg border border-border bg-muted/40 p-3">
            <Field cols={1} label="Cover note (optional)">
              <Textarea rows={3} placeholder="Anything else you'd like the panel to know…" />
            </Field>
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" required className="mt-0.5" />
            <span>I hereby declare that all the information provided above is true to the best of my knowledge. I understand that any false information may result in disqualification.</span>
          </label>
        </form>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" form="apply-form" className="gap-1.5">
            <CheckCircle2 className="h-4 w-4" /> Submit Application
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Section({ title, children, cols = 2 }: { title: string; children: React.ReactNode; cols?: 1 | 2 }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
      <div className={cols === 1 ? "space-y-2" : "grid grid-cols-1 gap-3 sm:grid-cols-2"}>{children}</div>
    </div>
  );
}

function Field({ label, children, cols }: { label: string; children: React.ReactNode; cols?: 1 }) {
  return (
    <div className={cols === 1 ? "sm:col-span-2" : ""}>
      <Label className="text-xs">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function UploadRow({ label }: { label: string }) {
  const [name, setName] = useState<string>("");
  return (
    <label className="flex items-center justify-between gap-3 rounded-md border border-dashed border-border bg-card px-3 py-2.5 text-xs hover:border-primary/50 cursor-pointer">
      <span className="flex items-center gap-2 min-w-0">
        <Upload className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="truncate font-medium text-foreground">{label}</span>
      </span>
      <span className="shrink-0 text-muted-foreground">{name || "Choose file"}</span>
      <input
        type="file"
        className="hidden"
        onChange={(e) => setName(e.target.files?.[0]?.name ?? "")}
      />
    </label>
  );
}
