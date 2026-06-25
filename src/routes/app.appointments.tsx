import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { WorkflowSteps } from "@/components/workflow-steps";
import { StatusBadge } from "@/components/status-badge";
import {
  Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { FileText, MailCheck, PenLine, Send } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/app/appointments")({
  component: Appointments,
});

const APPTS = [
  { id: "APT-2025-441", name: "Vivek S. Joshi", subject: "Web Technologies", institute: "GP Nagpur", date: "2025-06-14", status: "Approved" },
  { id: "APT-2025-442", name: "Rahul M. Deshpande", subject: "DSA", institute: "GP Pune", date: "2025-06-20", status: "Principal Approved" },
  { id: "APT-2025-443", name: "Priya S. Sawant", subject: "DSA", institute: "GP Pune", date: "2025-06-22", status: "HOD Approved" },
];

const OFFER_STORAGE_KEY = "chb_created_offers";
type Appointment = (typeof APPTS)[number] & { score?: number; sourceInterview?: string };

function Appointments() {
  const [offers, setOffers] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);

  useEffect(() => {
    try {
      setOffers(JSON.parse(localStorage.getItem(OFFER_STORAGE_KEY) || "[]"));
    } catch {
      setOffers([]);
    }
  }, []);

  const appointments = [...offers, ...APPTS];

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="Generate orders, joining letters and digital contracts"
        breadcrumbs={[{ label: "Onboarding" }, { label: "Appointments" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {appointments.map((a) => (
          <Card key={a.id} className="kpi-card border-0 shadow-none">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-base">{a.name}</CardTitle>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.id} · {a.subject}</p>
                </div>
                <StatusBadge status={a.status} />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs text-muted-foreground">
                <p>Institute: <span className="text-foreground">{a.institute}</span></p>
                <p>Joining Date: <span className="text-foreground">{a.date}</span></p>
                <p>Engagement: <span className="text-foreground">Clock Hour Basis — AY 2025-26</span></p>
                {a.score && <p>Interview Score: <span className="text-foreground">{a.score}/100</span></p>}
              </div>
              <WorkflowSteps
                steps={[
                  { label: "HOD", state: "done" },
                  { label: "Principal", state: a.status === "HOD Approved" ? "current" : "done" },
                  { label: "Regional", state: a.status === "Approved" ? "done" : a.status === "Principal Approved" ? "current" : "pending" },
                  { label: "Active", state: a.status === "Approved" ? "done" : "pending" },
                ]}
              />
              <Button size="sm" className="w-full" onClick={() => setSelected(a)}>
                <PenLine className="mr-1.5 h-4 w-4" />Create Offer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Sheet open={!!selected} onOpenChange={(open) => { if (!open) setSelected(null); }}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle>Create Offer</SheetTitle>
                <SheetDescription>
                  {selected.name} · {selected.id} · {selected.subject}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="mb-2 text-sm font-semibold">Offer Email</p>
                  <div
                    contentEditable
                    suppressContentEditableWarning
                    className="min-h-56 rounded-lg border border-input bg-background px-4 py-3 text-sm leading-relaxed shadow-sm outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  >
                    <p>Subject: Offer Letter for CHB Lecturer Engagement - {selected.subject}</p>
                    <p><br /></p>
                    <p>Dear {selected.name},</p>
                    <p><br /></p>
                    <p>
                      We are pleased to offer you the position of Clock Hour Basis Lecturer for {selected.subject}
                      at {selected.institute} for Academic Year 2025-26.
                    </p>
                    <p><br /></p>
                    <p>
                      Your joining date is {selected.date}. Please review the attached offer letter PDF and confirm
                      your acceptance by replying to this email.
                    </p>
                    <p><br /></p>
                    <p>Regards,</p>
                    <p>Institute Principal</p>
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold">PDF Preview</p>
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <div className="mx-auto max-w-md rounded-md border border-border bg-white p-5 text-slate-950 shadow-sm">
                      <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Directorate of Technical Education</p>
                          <h3 className="mt-1 text-lg font-bold">Offer Letter</h3>
                        </div>
                        <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-600 text-xs font-bold text-white">
                          PDF
                        </div>
                      </div>

                      <div className="mt-4 space-y-2 text-sm">
                        <p><span className="font-semibold">Candidate:</span> {selected.name}</p>
                        <p><span className="font-semibold">Role:</span> CHB Lecturer - {selected.subject}</p>
                        <p><span className="font-semibold">Institute:</span> {selected.institute}</p>
                        <p><span className="font-semibold">Joining Date:</span> {selected.date}</p>
                        <p><span className="font-semibold">Engagement:</span> Clock Hour Basis - AY 2025-26</p>
                        {selected.score && <p><span className="font-semibold">Interview Score:</span> {selected.score}/100</p>}
                      </div>

                      <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-3 text-xs leading-relaxed text-slate-700">
                        This offer is subject to document verification, institute workload approval, and applicable DTE norms.
                      </div>

                      <div className="mt-8 flex items-end justify-between">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <FileText className="h-4 w-4 text-red-600" />
                          Attached offer_letter.pdf
                        </div>
                        <div className="text-right">
                          <div className="mb-1 h-8 w-28 border-b border-slate-500 font-serif text-lg italic text-slate-700">
                            Principal
                          </div>
                          <p className="text-[10px] uppercase tracking-wider text-slate-500">Digital Signature</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SheetFooter className="mt-6">
                <Button
                  className="w-full sm:w-auto"
                  onClick={() => {
                    toast.success("Offer sent to candidate", {
                      description: `${selected.name} will receive the email and PDF offer letter.`,
                      icon: <MailCheck className="h-4 w-4" />,
                    });
                    setSelected(null);
                  }}
                >
                  <Send className="mr-1.5 h-4 w-4" />Send to Candidate
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
