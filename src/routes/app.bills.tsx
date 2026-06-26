import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import { BILLS } from "@/lib/mock-data";
import { useRole } from "@/lib/role-context";
import { KpiCard } from "@/components/kpi-card";
import {
  Receipt, IndianRupee, Clock, CheckCircle2, Download, Plus, XCircle, Check, X,
  Building2, CalendarDays, UserRound,
} from "lucide-react";
import { WorkflowSteps } from "@/components/workflow-steps";
import { toast } from "sonner";

export const Route = createFileRoute("/app/bills")({
  component: Bills,
});

type Bill = (typeof BILLS)[number];
type Decision = "approve" | "reject";

function Bills() {
  const { role } = useRole();
  const isPrincipal = role === "principal";
  const isRegional = role === "regional";
  const isLecturer = role === "lecturer";

  const [decisions, setDecisions] = useState<Record<string, "Approved by Principal" | "Approved" | "Rejected">>({});
  const [pending, setPending] = useState<{ bill: Bill; decision: Decision } | null>(null);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const [receiptBill, setReceiptBill] = useState<Bill | null>(null);
  const [reason, setReason] = useState("");
  const visibleBills = isPrincipal
    ? BILLS.filter((bill) => bill.status !== "HOD Approved")
    : BILLS;
  const lecturerBills: Bill[] = [
    ...BILLS.filter((bill) => bill.lecturer === "Rahul M. Deshpande"),
    {
      id: "BIL-2025-2197",
      college: "Govt. Polytechnic, Mumbai",
      lecturer: "Rahul M. Deshpande",
      month: "Apr 2025",
      hours: 44,
      rate: 800,
      amount: 35200,
      status: "Paid",
      submitted: "2025-05-04",
    },
  ].map((bill) => ({
    ...bill,
    status: bill.status === "Paid" ? "Paid" : "Pending",
  }));
  const canActFromDrawer = (bill: Bill) => {
    const status = (decisions[bill.id] ?? bill.status) as string;
    if (decisions[bill.id] || status === "Rejected" || status === "Paid" || status === "Payment Processing") return false;
    if (isRegional) return bill.status === "Sent by Principal";
    return isPrincipal;
  };

  const apply = () => {
    if (!pending) return;
    const { bill, decision } = pending;
    const approvedStatus = isRegional ? "Approved" : "Approved by Principal";
    setDecisions((d) => ({
      ...d,
      [bill.id]: decision === "approve" ? approvedStatus : "Rejected",
    }));
    if (decision === "approve") {
      toast.success("Bill approved", {
        description: isRegional
          ? `${bill.id} from ${bill.college} is now approved.`
          : `${bill.id} from ${bill.college} (₹${bill.amount.toLocaleString()}) forwarded to Regional approval.`,
        icon: <CheckCircle2 className="h-4 w-4" />,
      });
    } else {
      toast.error("Bill rejected", {
        description: `${bill.id} from ${bill.college} has been returned with remarks.`,
        icon: <XCircle className="h-4 w-4" />,
      });
    }
    setPending(null);
    setReason("");
  };

  if (isLecturer) {
    const paidBills = lecturerBills.filter((bill) => bill.status === "Paid");
    const pendingBills = lecturerBills.filter((bill) => bill.status === "Pending");
    const paidValue = paidBills.reduce((sum, bill) => sum + bill.amount, 0);
    const pendingValue = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

    return (
      <div>
        <PageHeader
          title="My Bills"
          subtitle="Track submitted CHB bills and download paid receipts"
          actions={<Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Export</Button>}
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <KpiCard icon={Receipt} label="Bills Submitted" value={String(lecturerBills.length)} tone="primary" />
          <KpiCard icon={CheckCircle2} label="Paid" value={String(paidBills.length)} tone="success" />
          <KpiCard icon={Clock} label="Pending" value={String(pendingBills.length)} tone="warning" />
          <KpiCard icon={IndianRupee} label="Paid Value" value={`₹${paidValue.toLocaleString()}`} tone="accent" />
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">Pending Amount</p>
            <p className="mt-1 text-xl font-bold">₹{pendingValue.toLocaleString()}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">Last Paid Bill</p>
            <p className="mt-1 text-xl font-bold">{paidBills[0]?.month ?? "—"}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs font-medium text-muted-foreground">Receipt Availability</p>
            <p className="mt-1 text-xl font-bold">{paidBills.length} ready</p>
          </div>
        </div>

        <Card className="mt-4">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Month</TableHead>
                  <TableHead className="text-right">Hours</TableHead>
                  <TableHead className="text-right">Rate</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lecturerBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-mono text-xs">{bill.id}</TableCell>
                    <TableCell>{bill.month}</TableCell>
                    <TableCell className="text-right">{bill.hours}</TableCell>
                    <TableCell className="text-right">₹{bill.rate}</TableCell>
                    <TableCell className="text-right font-semibold">₹{bill.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{bill.submitted}</TableCell>
                    <TableCell><StatusBadge status={bill.status} /></TableCell>
                    <TableCell className="text-right">
                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={bill.status !== "Paid"}
                        onClick={() => setReceiptBill(bill)}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Dialog open={!!receiptBill} onOpenChange={(open) => { if (!open) setReceiptBill(null); }}>
          <DialogContent className="max-w-lg">
            {receiptBill && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5 text-primary" /> Payment Receipt
                  </DialogTitle>
                  <DialogDescription>{receiptBill.id} · {receiptBill.month}</DialogDescription>
                </DialogHeader>
                <div className="rounded-lg border border-border bg-card p-5">
                  <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DTE Maharashtra</p>
                      <p className="mt-1 text-lg font-bold">CHB Lecturer Payment Receipt</p>
                    </div>
                    <StatusBadge status="Paid" />
                  </div>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                    <DetailTile icon={UserRound} label="Lecturer" value={receiptBill.lecturer} />
                    <DetailTile icon={CalendarDays} label="Payment Date" value="2025-05-12" />
                    <DetailTile icon={Clock} label="Hours" value={`${receiptBill.hours} hrs`} />
                    <DetailTile icon={IndianRupee} label="Amount Paid" value={`₹${receiptBill.amount.toLocaleString()}`} />
                  </div>
                  <div className="mt-4 rounded-md bg-muted/40 p-3 text-sm">
                    <p><span className="font-semibold">UTR:</span> HDFC0234198721</p>
                    <p><span className="font-semibold">Rate:</span> ₹{receiptBill.rate}/hr</p>
                    <p><span className="font-semibold">Status:</span> Paid and reconciled</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setReceiptBill(null)}>Close</Button>
                  <Button
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => toast.success("Receipt PDF export started")}
                  >
                    <Download className="mr-1.5 h-4 w-4" />Export PDF
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Bills"
        subtitle="Auto-generated from approved attendance × CHB rates"
        breadcrumbs={[{ label: "Billing & Payments" }, { label: "Bills" }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <KpiCard icon={Receipt} label="Total Bills (May)" value="412" tone="primary" />
        <KpiCard icon={Clock} label="Pending" value="89" tone="warning" />
        <KpiCard icon={CheckCircle2} label="Approved" value="287" tone="success" trend={{ value: "+34", up: true }} />
        <KpiCard icon={IndianRupee} label="Total Value" value="₹1.42 Cr" tone="accent" />
      </div>

      <Card className="mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Bill Approval Workflow</CardTitle></CardHeader>
        <CardContent>
          <WorkflowSteps
            steps={[
              { label: "Lecturer Submit", state: "done" },
              { label: "HOD Verify", state: "done" },
              { label: "Principal Approve", state: "current" },
              { label: "Regional Approve", state: "pending" },
              { label: "Accounts", state: "pending" },
              { label: "Paid", state: "pending" },
            ]}
          />
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill ID</TableHead>
                <TableHead>{isPrincipal ? "Lecturers" : "College"}</TableHead>
                <TableHead>Month</TableHead>
                <TableHead className="text-right">Hours</TableHead>
                <TableHead className="text-right">Rate</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleBills.map((b) => {
                const effectiveStatus = decisions[b.id] ?? b.status;
                const actionable = isPrincipal && !decisions[b.id] && b.status === "HOD Approved";
                const regionalActionable = isRegional && !decisions[b.id] && b.status === "Sent by Principal";
                return (
                  <TableRow key={b.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono text-xs">{b.id}</TableCell>
                    <TableCell className="font-medium">{isPrincipal ? b.lecturer : b.college}</TableCell>
                    <TableCell>{b.month}</TableCell>
                    <TableCell className="text-right">{b.hours}</TableCell>
                    <TableCell className="text-right">₹{b.rate}</TableCell>
                    <TableCell className="text-right font-semibold">₹{b.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-muted-foreground">{b.submitted}</TableCell>
                    <TableCell><StatusBadge status={effectiveStatus} /></TableCell>
                    <TableCell className="text-right">
                      {isPrincipal ? (
                        actionable ? (
                          <div className="flex justify-end gap-1.5">
                            <Button
                              size="sm"
                              className="h-8 gap-1 bg-success text-success-foreground hover:bg-success/90"
                              onClick={() => setPending({ bill: b, decision: "approve" })}
                            >
                              <Check className="h-3.5 w-3.5" /> Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="h-8 gap-1"
                              onClick={() => setPending({ bill: b, decision: "reject" })}
                            >
                              <X className="h-3.5 w-3.5" /> Reject
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" variant="ghost" onClick={() => setSelectedBill(b)}>Details</Button>
                        )
                      ) : isRegional ? (
                        <div className="flex justify-end gap-1.5">
                          {regionalActionable && (
                            <Button
                              size="sm"
                              className="h-8 gap-1 bg-success text-success-foreground hover:bg-success/90"
                              onClick={() => setPending({ bill: b, decision: "approve" })}
                            >
                              <Check className="h-3.5 w-3.5" /> Approve
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => setSelectedBill(b)}>Details</Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={() => setSelectedBill(b)}>Details</Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Sheet open={!!selectedBill} onOpenChange={(open) => { if (!open) setSelectedBill(null); }}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
          {selectedBill && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedBill.id}</SheetTitle>
                <SheetDescription>
                  {selectedBill.month} bill summary and approval trail
                </SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-5">
                <div className="rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Payable Amount</p>
                      <p className="mt-1 text-3xl font-bold">₹{selectedBill.amount.toLocaleString()}</p>
                    </div>
                    <StatusBadge status={decisions[selectedBill.id] ?? selectedBill.status} />
                  </div>
                  <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    <Plus className="mr-1.5 h-4 w-4" />Generate Bill
                  </Button>
                </div>

                {canActFromDrawer(selectedBill) && (
                  <div className="grid gap-2 sm:grid-cols-2">
                    <Button
                      className="bg-success text-success-foreground hover:bg-success/90"
                      onClick={() => setPending({ bill: selectedBill, decision: "approve" })}
                    >
                      <Check className="mr-1.5 h-4 w-4" />Approve
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setPending({ bill: selectedBill, decision: "reject" })}
                    >
                      <X className="mr-1.5 h-4 w-4" />Reject
                    </Button>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  <DetailTile icon={Building2} label="College" value={selectedBill.college} />
                  <DetailTile icon={UserRound} label="Lecturer" value={selectedBill.lecturer} />
                  <DetailTile icon={CalendarDays} label="Submitted" value={selectedBill.submitted} />
                  <DetailTile icon={Clock} label="Month" value={selectedBill.month} />
                </div>

                <div className="rounded-lg border border-border">
                  <div className="grid grid-cols-3 divide-x divide-border text-center">
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">Hours</p>
                      <p className="mt-1 text-lg font-semibold">{selectedBill.hours}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">Rate</p>
                      <p className="mt-1 text-lg font-semibold">₹{selectedBill.rate}</p>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground">Total</p>
                      <p className="mt-1 text-lg font-semibold">₹{selectedBill.amount.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-sm font-semibold">Approval Trail</p>
                  <WorkflowSteps
                    steps={[
                      { label: "Lecturer Submit", state: "done" },
                      { label: "HOD Verify", state: "done" },
                      { label: "Principal Send", state: selectedBill.status === "Submitted" || selectedBill.status === "HOD Approved" ? "pending" : "done" },
                      { label: "Regional Approve", state: (decisions[selectedBill.id] ?? selectedBill.status) === "Approved" ? "done" : "current" },
                      { label: "Accounts", state: "pending" },
                      { label: "Paid", state: selectedBill.status === "Paid" ? "done" : "pending" },
                    ]}
                  />
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={!!pending} onOpenChange={(o) => { if (!o) { setPending(null); setReason(""); } }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {pending?.decision === "approve" ? (
                <><CheckCircle2 className="h-5 w-5 text-success" /> Approve Bill</>
              ) : (
                <><XCircle className="h-5 w-5 text-destructive" /> Reject Bill</>
              )}
            </DialogTitle>
            <DialogDescription>
              {pending?.bill.id} · {pending?.bill.college} · ₹{pending?.bill.amount.toLocaleString()} ({pending?.bill.hours} hrs × ₹{pending?.bill.rate})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="text-xs">
              {pending?.decision === "approve" ? "Remarks (optional)" : "Reason for rejection *"}
            </Label>
            <Textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder={pending?.decision === "approve"
                ? "Verified attendance, workload matches approved norm…"
                : "e.g. Rate mismatch, attendance discrepancy on 10 May…"}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setPending(null); setReason(""); }}>Cancel</Button>
            <Button
              onClick={apply}
              className={pending?.decision === "approve"
                ? "bg-success text-success-foreground hover:bg-success/90"
                : "bg-destructive text-destructive-foreground hover:bg-destructive/90"}
              disabled={pending?.decision === "reject" && !reason.trim()}
            >
              Confirm {pending?.decision === "approve" ? "Approval" : "Rejection"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DetailTile({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/25 p-3">
      <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
