import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Academic year, CHB norms, rate masters and workflow configuration"
        breadcrumbs={[{ label: "Administration" }, { label: "Settings" }]}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Academic Year</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label>Current AY</Label>
              <Select defaultValue="2025-26">
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024-25">2024-25</SelectItem>
                  <SelectItem value="2025-26">2025-26</SelectItem>
                  <SelectItem value="2026-27">2026-27</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Term Start</Label><Input className="mt-1" defaultValue="2025-07-01" /></div>
              <div><Label>Term End</Label><Input className="mt-1" defaultValue="2026-04-30" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">CHB Rate Master</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-3 gap-3">
              <div><Label>FY Year</Label><Input className="mt-1" defaultValue="₹/hour" disabled /></div>
              <div><Label>UG Class</Label><Input className="mt-1" defaultValue="750" /></div>
              <div><Label>PG Class</Label><Input className="mt-1" defaultValue="900" /></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>SY Class</Label><Input className="mt-1" defaultValue="720" /></div>
              <div><Label>TY Class</Label><Input className="mt-1" defaultValue="780" /></div>
              <div><Label>Final Year</Label><Input className="mt-1" defaultValue="820" /></div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Eligibility Norms</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Toggle label="Require NET/SET/PhD for diploma colleges" defaultChecked={false} />
            <Toggle label="Mandate minimum 55% in PG for general category" defaultChecked={true} />
            <Toggle label="Accept Aadhaar OTP for lecturer registration" defaultChecked={true} />
            <Toggle label="Auto-publish approved vacancies on public portal" defaultChecked={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Approval Workflow</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <Toggle label="Bills above ₹50,000 require Regional approval" defaultChecked={true} />
            <Toggle label="Attendance verification mandatory by HOD" defaultChecked={true} />
            <Toggle label="Enable AI bill validation before payment" defaultChecked={true} />
            <Toggle label="Send email notifications on every state change" defaultChecked={true} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <Button variant="outline">Reset</Button>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
      </div>
    </div>
  );
}

function Toggle({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
      <span>{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
