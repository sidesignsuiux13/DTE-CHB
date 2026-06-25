import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Bot, FileScan, ListChecks, Trophy, Calculator, AlertTriangle } from "lucide-react";
import { AI_INSIGHTS } from "@/lib/mock-data";

export const Route = createFileRoute("/app/ai-center")({
  component: AiCenter,
});

const MODULES = [
  { icon: Bot, title: "AI Chatbot", desc: "Portal guidance, FAQs and recruitment process help in English & मराठी.", status: "Active" },
  { icon: FileScan, title: "OCR Engine", desc: "Reads Aadhaar, PAN, degree certificates — auto-populates lecturer profile.", status: "Active" },
  { icon: ListChecks, title: "Eligibility Validator", desc: "Validates qualification, experience and category against vacancy norms.", status: "Active" },
  { icon: Trophy, title: "Merit Ranking Engine", desc: "Composite score from qualification, experience and interview marks.", status: "Active" },
  { icon: AlertTriangle, title: "Attendance Anomaly Detection", desc: "Flags duplicates, excess workload and missing entries.", status: "Active" },
  { icon: Calculator, title: "Bill Validation Engine", desc: "Checks computation, rate norms and missing approvals before payout.", status: "Active" },
];

function AiCenter() {
  return (
    <div>
      <PageHeader
        title="AI Intelligence Center"
        subtitle="Decision-support layer powering recruitment, attendance and bill workflows"
        breadcrumbs={[{ label: "Insights" }, { label: "AI Intelligence Center" }]}
        actions={
          <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Sparkles className="mr-1.5 h-4 w-4" />Rule Engine
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">AI Modules</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {MODULES.map((m) => (
              <div key={m.title} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <m.icon className="h-4.5 w-4.5" />
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />{m.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold">{m.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="flex items-center gap-2 text-base"><Bot className="h-4 w-4" />Ask Portal AI</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border bg-muted/40 p-3">
              <div className="space-y-3 text-sm">
                <div className="rounded-lg bg-primary-soft p-2.5 text-foreground">
                  <p className="text-[11px] font-semibold text-primary">YOU</p>
                  <p>How do I submit my May attendance for verification?</p>
                </div>
                <div className="rounded-lg bg-card p-2.5">
                  <p className="text-[11px] font-semibold text-accent">PORTAL AI</p>
                  <p>Go to <b>Attendance</b> → click <b>Mark Attendance</b> → enter date, subject, class and hours. Once saved, HOD will see it under "Pending Verification".</p>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <Input placeholder="Ask anything..." />
              <Button size="icon"><Send className="h-4 w-4" /></Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Live AI Alerts</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {AI_INSIGHTS.map((a, i) => (
            <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
              <span className={`mt-0.5 inline-flex h-7 shrink-0 items-center rounded-md px-2 text-[10px] font-bold uppercase tracking-wide ${
                a.severity === "high" ? "bg-destructive/10 text-destructive" :
                a.severity === "medium" ? "bg-warning/15 text-warning-foreground" :
                "bg-info/10 text-info"
              }`}>{a.kind}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-xs text-muted-foreground">{a.detail}</p>
              </div>
              <Button size="sm" variant="ghost">Investigate</Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
