import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PAYMENTS } from "@/lib/mock-data";
import { KpiCard } from "@/components/kpi-card";
import { Banknote, Clock, CheckCircle2, AlertCircle, Download, Play } from "lucide-react";

export const Route = createFileRoute("/app/payments")({
  component: Payments,
});

function Payments() {
  return (
    <div>
      <PageHeader
        title="Payment Processing"
        subtitle="Generate payment advice, push to bank gateway and reconcile UTRs"
        breadcrumbs={[{ label: "Billing & Payments" }, { label: "Payments" }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Bank File (NEFT)</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Play className="mr-1.5 h-4 w-4" />Process Batch
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard icon={Clock} label="Pending Payments" value="187" tone="warning" />
        <KpiCard icon={CheckCircle2} label="Processed (MTD)" value="1,204" tone="success" trend={{ value: "+8.2%", up: true }} />
        <KpiCard icon={Banknote} label="Total Disbursed" value="₹4.82 Cr" tone="primary" />
        <KpiCard icon={AlertCircle} label="Failed" value="6" tone="accent" />
      </div>

      <Card className="mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Payment Register</CardTitle></CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Bill</TableHead>
                <TableHead>Lecturer</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>UTR / Bank Ref</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAYMENTS.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.bill}</TableCell>
                  <TableCell className="font-medium">{p.lecturer}</TableCell>
                  <TableCell className="text-right font-semibold">₹{p.amount.toLocaleString()}</TableCell>
                  <TableCell className="font-mono text-xs">{p.utr}</TableCell>
                  <TableCell className="text-muted-foreground">{p.date}</TableCell>
                  <TableCell><StatusBadge status={p.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
