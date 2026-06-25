import { createFileRoute } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { INTERVIEWS, VACANCIES } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { BriefcaseBusiness, Check, FileSignature, Plus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/interviews")({
  component: Interviews,
});

type Interview = (typeof INTERVIEWS)[number];

const OFFER_STORAGE_KEY = "chb_created_offers";

const PARAMETERS = [
  { key: "subject", label: "Subject knowledge", max: 30 },
  { key: "teaching", label: "Teaching demonstration", max: 25 },
  { key: "communication", label: "Communication clarity", max: 20 },
  { key: "experience", label: "Relevant experience", max: 15 },
  { key: "fit", label: "Institute fit", max: 10 },
] as const;

type ParameterKey = (typeof PARAMETERS)[number]["key"];

const DEFAULT_SCORES: Record<ParameterKey, number> = {
  subject: 24,
  teaching: 20,
  communication: 16,
  experience: 12,
  fit: 8,
};

function Interviews() {
  const navigate = useNavigate();
  const { role } = useRole();
  const isCandidate = role === "candidate";
  const [selected, setSelected] = useState<Interview | null>(null);
  const [scores, setScores] = useState(DEFAULT_SCORES);
  const [results, setResults] = useState<Record<string, "Selected" | "Rejected" | "Offer Created">>({});

  const total = useMemo(
    () => PARAMETERS.reduce((sum, param) => sum + Number(scores[param.key] || 0), 0),
    [scores],
  );
  const getVacancy = (interview: Interview) => VACANCIES.find((vacancy) => vacancy.id === interview.vacancy);

  const setResult = (interview: Interview, result: "Selected" | "Rejected") => {
    setResults((current) => ({ ...current, [interview.id]: result }));
    toast(result === "Selected" ? "Candidate selected" : "Candidate rejected", {
      description: `${interview.candidate} received a final interview score of ${total}/100.`,
    });
  };

  const createOffer = (interview: Interview) => {
    const offer = {
      id: `APT-2025-${Math.floor(700 + Math.random() * 200)}`,
      name: interview.candidate,
      subject: interview.vacancy.replace("VAC-2025-", "Vacancy "),
      institute: "Govt. Polytechnic, Pune",
      date: "2025-07-01",
      status: "Offer Created",
      sourceInterview: interview.id,
      score: total,
    };
    try {
      const stored = JSON.parse(localStorage.getItem(OFFER_STORAGE_KEY) || "[]");
      localStorage.setItem(OFFER_STORAGE_KEY, JSON.stringify([offer, ...stored.filter((item: any) => item.sourceInterview !== interview.id)]));
    } catch {}
    setResults((current) => ({ ...current, [interview.id]: "Offer Created" }));
    toast.success("Offer created", {
      description: `${interview.candidate} will now appear in Appointments.`,
    });
    navigate({ to: "/app/appointments" });
  };

  return (
    <div>
      <PageHeader
        title={isCandidate ? "Interview Schedule" : "Interviews"}
        subtitle={isCandidate ? "View your scheduled interview details" : "Scheduled interviews, evaluation scoring and selection decisions"}
        breadcrumbs={[{ label: "Onboarding" }, { label: "Interviews" }]}
        actions={!isCandidate && (
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Plus className="mr-1.5 h-4 w-4" />Schedule Interview
          </Button>
        )}
      />

      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Scheduled Interviews</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{isCandidate ? "College" : "Candidate"}</TableHead>
                {isCandidate && <TableHead>Department</TableHead>}
                {isCandidate && <TableHead>Job Role</TableHead>}
                <TableHead>Vacancy</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Status</TableHead>
                {!isCandidate && <TableHead className="text-right">Action</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {INTERVIEWS.map((i) => {
                const status = results[i.id] ?? i.status;
                const vacancy = getVacancy(i);
                return (
                  <TableRow key={i.id}>
                    <TableCell className="font-mono text-xs">{i.id}</TableCell>
                    <TableCell className="font-medium">{isCandidate ? vacancy?.institute ?? "—" : i.candidate}</TableCell>
                    {isCandidate && <TableCell className="text-muted-foreground">{vacancy?.dept ?? "—"}</TableCell>}
                    {isCandidate && <TableCell>{vacancy?.title.replace("CHB Lecturer — ", "") ?? "CHB Lecturer"}</TableCell>}
                    <TableCell className="font-mono text-xs text-muted-foreground">{i.vacancy}</TableCell>
                    <TableCell className="text-sm"><div>{i.date}</div><div className="text-xs text-muted-foreground">{i.time}</div></TableCell>
                    <TableCell><StatusBadge status={status} /></TableCell>
                    {!isCandidate && (
                      <TableCell>
                        <div className="flex justify-end gap-1.5">
                          {i.status === "Completed" && (
                            <Button size="sm" variant="ghost" onClick={() => setSelected(i)}>Details</Button>
                          )}
                          {results[i.id] === "Selected" && (
                            <Button size="sm" onClick={() => createOffer(i)}>
                              <FileSignature className="mr-1.5 h-3.5 w-3.5" />Create Offer
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
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>{selected.candidate}</SheetTitle>
                <SheetDescription>{selected.id} · {selected.vacancy} · {selected.date}, {selected.time}</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Final Score</p>
                      <p className="mt-1 text-3xl font-bold">{total}/100</p>
                    </div>
                    <StatusBadge status={results[selected.id] ?? selected.status} />
                  </div>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p>Panel: <span className="text-foreground">{selected.panel}</span></p>
                    <p>Candidate vacancy: <span className="text-foreground">{selected.vacancy}</span></p>
                  </div>
                </div>

                <div>
                  <p className="mb-3 flex items-center gap-2 text-sm font-semibold">
                    <BriefcaseBusiness className="h-4 w-4" />Evaluation Form
                  </p>
                  <div className="space-y-3">
                    {PARAMETERS.map((param) => (
                      <div key={param.key} className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1fr_120px] sm:items-center">
                        <div>
                          <Label>{param.label}</Label>
                          <p className="text-xs text-muted-foreground">Maximum score: {param.max}</p>
                        </div>
                        <Input
                          type="number"
                          min={0}
                          max={param.max}
                          value={scores[param.key]}
                          onChange={(event) => {
                            const value = Math.max(0, Math.min(param.max, Number(event.target.value)));
                            setScores((current) => ({ ...current, [param.key]: value }));
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    className="bg-success text-success-foreground hover:bg-success/90"
                    onClick={() => setResult(selected, "Selected")}
                    disabled={results[selected.id] === "Selected" || results[selected.id] === "Offer Created"}
                  >
                    <Check className="mr-1.5 h-4 w-4" />Select Candidate
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setResult(selected, "Rejected")}
                    disabled={results[selected.id] === "Rejected" || results[selected.id] === "Offer Created"}
                  >
                    <X className="mr-1.5 h-4 w-4" />Reject Candidate
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
