import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TICKETS } from "@/lib/mock-data";
import { KpiCard } from "@/components/kpi-card";
import { LifeBuoy, CheckCircle2, AlertTriangle, Clock, Plus } from "lucide-react";

export const Route = createFileRoute("/app/helpdesk")({
  component: Helpdesk,
});

function Helpdesk() {
  return (
    <div>
      <PageHeader
        title="Helpdesk"
        subtitle="Grievance management, ticketing and escalation tracking"
        breadcrumbs={[{ label: "Administration" }, { label: "Helpdesk" }]}
        actions={<Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="mr-1.5 h-4 w-4" />New Ticket</Button>}
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard icon={LifeBuoy} label="Open Tickets" value="42" tone="warning" />
        <KpiCard icon={Clock} label="In Progress" value="18" tone="info" />
        <KpiCard icon={CheckCircle2} label="Resolved (today)" value="18" tone="success" trend={{ value: "+6", up: true }} />
        <KpiCard icon={AlertTriangle} label="Escalated" value="5" tone="accent" />
      </div>

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket ID</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Raised By</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Assigned</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {TICKETS.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="font-mono text-xs">{t.id}</TableCell>
                  <TableCell className="font-medium">{t.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{t.raisedBy}</TableCell>
                  <TableCell>
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${
                      t.priority === "High" ? "bg-destructive/10 text-destructive" :
                      t.priority === "Medium" ? "bg-warning/15 text-warning-foreground" :
                      "bg-muted text-muted-foreground"
                    }`}>{t.priority}</span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{t.assigned}</TableCell>
                  <TableCell><StatusBadge status={t.status} /></TableCell>
                  <TableCell><Button size="sm" variant="ghost">Open</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
