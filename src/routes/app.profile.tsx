import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/lib/role-context";
import { ROLES } from "@/lib/mock-data";
import { CheckCircle2, FileUp, UserCircle2, GraduationCap, Briefcase, Landmark, IdCard } from "lucide-react";

export const Route = createFileRoute("/app/profile")({
  component: Profile,
});

const DOCS = [
  { label: "Aadhaar Card", uploaded: true },
  { label: "PAN Card", uploaded: true },
  { label: "M.Tech / M.E. Degree", uploaded: true },
  { label: "B.E. / B.Tech Degree", uploaded: true },
  { label: "NET/SET/PhD Certificate", uploaded: true },
  { label: "Experience Certificates", uploaded: true },
  { label: "Caste Certificate", uploaded: false },
  { label: "Photo & Signature", uploaded: true },
];

function Profile() {
  const { user, role } = useRole();
  const roleLabel = ROLES.find((r) => r.value === role)!.label;
  const completed = DOCS.filter((d) => d.uploaded).length;
  const score = Math.round((completed / DOCS.length) * 100);

  return (
    <div>
      <PageHeader title="My Profile" subtitle={`${roleLabel} · ${user.email}`} breadcrumbs={[{ label: "Profile" }]} />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Personal Details</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-start gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
                {user.name.split(" ").slice(-1)[0][0]}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.designation}</p>
                <div className="mt-3 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                  <Detail icon={IdCard} label="Employee/CHB ID" value="CHB-2025-58231" />
                  <Detail icon={GraduationCap} label="Highest Qualification" value="M.Tech (Computer), NET" />
                  <Detail icon={Briefcase} label="Total Experience" value="3.5 years" />
                  <Detail icon={Landmark} label="Bank A/c (verified)" value="HDFC ••• 4521" />
                </div>
              </div>
              <Button size="sm" variant="outline">Edit</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Profile Completion</CardTitle></CardHeader>
          <CardContent>
            <p className="text-3xl font-extrabold text-primary">{score}%</p>
            <Progress value={score} className="mt-2 h-2" />
            <p className="mt-3 text-xs text-muted-foreground">{completed} of {DOCS.length} documents uploaded · 1 pending</p>
            <Button className="mt-4 w-full bg-accent text-accent-foreground hover:bg-accent/90"><FileUp className="mr-1.5 h-4 w-4" />Complete Profile</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader className="pb-2"><CardTitle className="text-base">Document Vault</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {DOCS.map((d) => (
            <div key={d.label} className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${d.uploaded ? "border-success/30 bg-success/5" : "border-warning/40 bg-warning/5"}`}>
              {d.uploaded ? <CheckCircle2 className="h-4 w-4 shrink-0 text-success" /> : <FileUp className="h-4 w-4 shrink-0 text-warning-foreground" />}
              <span className="truncate">{d.label}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function Detail({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate font-medium">{value}</p>
      </div>
    </div>
  );
}
