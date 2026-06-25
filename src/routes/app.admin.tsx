import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ROLES, ROLE_USERS } from "@/lib/mock-data";
import { Plus, Search, Shield } from "lucide-react";

export const Route = createFileRoute("/app/admin")({
  component: Admin,
});

const USERS = [
  ...ROLES.map((r) => ({ ...ROLE_USERS[r.value], role: r.label, status: "Active", lastLogin: "2 hrs ago" })),
  { name: "Dr. P. Mishra", email: "principal.gpmumbai@dte.gov.in", designation: "Principal, GP Mumbai", role: "Institute Principal", status: "Active", lastLogin: "Yesterday" },
  { name: "Prof. M. Iyer", email: "hod.civil.gpnashik@dte.gov.in", designation: "HOD, Civil", role: "Department HOD", status: "Active", lastLogin: "1 hr ago" },
  { name: "Shri. K. Patil", email: "helpdesk2@dte.gov.in", designation: "Helpdesk Tier-2", role: "Helpdesk User", status: "Disabled", lastLogin: "3 days ago" },
];

function Admin() {
  return (
    <div>
      <PageHeader
        title="User Management"
        subtitle="Manage portal users, roles and permissions across all institutes"
        breadcrumbs={[{ label: "Administration" }, { label: "User Management" }]}
        actions={
          <>
            <Button variant="outline" size="sm"><Shield className="mr-1.5 h-4 w-4" />Roles & Permissions</Button>
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90"><Plus className="mr-1.5 h-4 w-4" />Add User</Button>
          </>
        }
      />

      <Card>
        <CardContent className="p-0">
          <div className="flex flex-wrap items-center gap-2 border-b border-border p-4">
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="h-9 w-72 pl-8" placeholder="Search by name, email or institute..." />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {USERS.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell className="font-mono text-xs">{u.email}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell className="text-muted-foreground">{u.designation}</TableCell>
                  <TableCell className="text-muted-foreground">{u.lastLogin}</TableCell>
                  <TableCell>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                      u.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
                    }`}>{u.status}</span>
                  </TableCell>
                  <TableCell><Button size="sm" variant="ghost">Edit</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
