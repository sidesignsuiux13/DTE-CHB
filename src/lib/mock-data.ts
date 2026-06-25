export type Role =
  | "super_admin"
  | "regional"
  | "principal"
  | "candidate"
  | "lecturer"
  | "accounts";

export const ROLES: { value: Role; label: string; org: string }[] = [
  { value: "super_admin", label: "Super Admin", org: "DTE Head Office, Mumbai" },
  { value: "regional", label: "Regional Joint Director", org: "Regional Office, Pune" },
  { value: "principal", label: "Institute Principal", org: "Govt. Polytechnic, Pune" },
  { value: "candidate", label: "Candidate", org: "Applicant / Faculty" },
  { value: "lecturer", label: "CHB Lecturer", org: "Teaching Faculty" },
  { value: "accounts", label: "Accounts Officer", org: "Finance Cell, DTE" },
];

export const ROLE_USERS: Record<Role, { name: string; email: string; designation: string }> = {
  super_admin: { name: "Dr. R. M. Deshmukh", email: "director@dtemaharashtra.gov.in", designation: "Director, DTE" },
  regional: { name: "Smt. A. P. Kulkarni", email: "rjd.pune@dtemaharashtra.gov.in", designation: "Joint Director (Pune Region)" },
  principal: { name: "Dr. S. V. Patil", email: "principal.gppune@dte.gov.in", designation: "Principal, GP Pune" },
  candidate: { name: "Ms. Priya S. Sawant", email: "priya.sawant@applicant.dte.gov.in", designation: "CHB Candidate" },
  lecturer: { name: "Rahul M. Deshpande", email: "rahul.deshpande@chb.dte.gov.in", designation: "CHB Lecturer" },
  accounts: { name: "Shri. V. K. More", email: "accounts@dtemaharashtra.gov.in", designation: "Accounts Officer" },
};

export const ANNOUNCEMENTS = [
  { id: "ANN-001", tag: "Recruitment", title: "CHB Recruitment Drive 2025-26 — Phase II opens 22 June", date: "2025-06-15", urgent: true },
  { id: "ANN-002", tag: "Circular", title: "Revised CHB hourly rates notified for FY 2025-26 (GR 12/05/2025)", date: "2025-05-12", urgent: false },
  { id: "ANN-003", tag: "Training", title: "Mandatory Faculty Induction Programme — online, 28 June 2025", date: "2025-06-10", urgent: false },
  { id: "ANN-004", tag: "System", title: "DigiLocker integration is now live for document verification", date: "2025-06-05", urgent: false },
];

export const INSTITUTES = [
  "Govt. Polytechnic, Pune",
  "Govt. Polytechnic, Mumbai",
  "Govt. Polytechnic, Nagpur",
  "Govt. Polytechnic, Aurangabad",
  "COEP Technological University",
  "Govt. Engg. College, Amravati",
  "Govt. Polytechnic, Nashik",
  "Govt. Polytechnic, Solapur",
];

export const DEPARTMENTS = [
  "Computer Engineering",
  "Mechanical Engineering",
  "Civil Engineering",
  "Electrical Engineering",
  "Electronics & Telecom",
  "Information Technology",
  "Applied Sciences",
];

export const REGIONS = ["Mumbai", "Pune", "Nagpur", "Aurangabad", "Nashik", "Amravati"];

export const KPI_STATE = {
  totalInstitutes: 412,
  activeLecturers: 3847,
  openVacancies: 612,
  pendingApprovals: 89,
  monthlyExpenditure: 4.82,
  attendancePosted: 91.4,
};

export const RECRUITMENT_TREND = [
  { month: "Jul", applied: 420, selected: 78 },
  { month: "Aug", applied: 612, selected: 132 },
  { month: "Sep", applied: 894, selected: 201 },
  { month: "Oct", applied: 1240, selected: 286 },
  { month: "Nov", applied: 980, selected: 245 },
  { month: "Dec", applied: 760, selected: 198 },
];

export const EXPENDITURE_TREND = [
  { month: "Jul", amount: 3.4 },
  { month: "Aug", amount: 3.8 },
  { month: "Sep", amount: 4.1 },
  { month: "Oct", amount: 4.6 },
  { month: "Nov", amount: 4.7 },
  { month: "Dec", amount: 4.82 },
];

export const REGION_PERFORMANCE = REGIONS.map((r, i) => ({
  region: r,
  institutes: [86, 74, 68, 62, 64, 58][i],
  lecturers: [820, 712, 640, 540, 590, 545][i],
  utilization: [92, 88, 85, 79, 82, 77][i],
}));

export const SUBJECT_VACANCIES = [
  { subject: "Computer Engg.", count: 142 },
  { subject: "Mechanical", count: 118 },
  { subject: "Civil", count: 96 },
  { subject: "Electrical", count: 88 },
  { subject: "E&TC", count: 74 },
  { subject: "IT", count: 64 },
  { subject: "Applied Sci.", count: 30 },
];

export type StatusBadge = "Draft" | "Pending" | "Approved" | "Rejected" | "In Progress" | "Paid";

export const REQUIREMENTS = [
  { id: "REQ-2025-1042", dept: "Computer Engineering", institute: "GP Pune", lecturers: 4, workload: 56, status: "Regional Approval Pending", raisedBy: "Prof. N. R. Joshi", date: "2025-06-02" },
  { id: "REQ-2025-1043", dept: "Mechanical Engineering", institute: "GP Pune", lecturers: 3, workload: 42, status: "Principal Approval Pending", raisedBy: "Prof. R. D. Kale", date: "2025-06-04" },
  { id: "REQ-2025-1044", dept: "Civil Engineering", institute: "GP Nashik", lecturers: 2, workload: 28, status: "Approved", raisedBy: "Prof. M. S. Iyer", date: "2025-05-28" },
  { id: "REQ-2025-1045", dept: "Electronics & Telecom", institute: "GP Mumbai", lecturers: 5, workload: 70, status: "Draft", raisedBy: "Prof. A. K. Banerjee", date: "2025-06-06" },
  { id: "REQ-2025-1046", dept: "Information Technology", institute: "GP Nagpur", lecturers: 3, workload: 38, status: "Approved", raisedBy: "Prof. S. N. Verma", date: "2025-05-22" },
];

export const VACANCIES = [
  { id: "VAC-2025-088", title: "CHB Lecturer — Data Structures & Algorithms", dept: "Computer Engineering", institute: "GP Pune", openings: 2, applied: 47, status: "Applications Open", deadline: "2025-06-25" },
  { id: "VAC-2025-089", title: "CHB Lecturer — Thermodynamics", dept: "Mechanical Engineering", institute: "GP Pune", openings: 1, applied: 22, status: "Applications Open", deadline: "2025-06-28" },
  { id: "VAC-2025-090", title: "CHB Lecturer — Structural Analysis", dept: "Civil Engineering", institute: "GP Nashik", openings: 2, applied: 31, status: "Applications Closed", deadline: "2025-06-10" },
  { id: "VAC-2025-091", title: "CHB Lecturer — Digital Electronics", dept: "E&TC", institute: "GP Mumbai", openings: 3, applied: 0, status: "Draft", deadline: "—" },
  { id: "VAC-2025-092", title: "CHB Lecturer — Web Technologies", dept: "IT", institute: "GP Nagpur", openings: 2, applied: 64, status: "Applications Open", deadline: "2025-06-30" },
];

export const APPLICATIONS = [
  { id: "APP-58231", candidate: "Priya S. Sawant", vacancy: "VAC-2025-088", subject: "Data Structures", qual: "M.Tech (CSE), NET", exp: "3.5 yrs", score: 86, status: "Shortlisted" },
  { id: "APP-58232", candidate: "Rahul M. Deshpande", vacancy: "VAC-2025-088", subject: "Data Structures", qual: "M.E. (Comp), PhD pursuing", exp: "5 yrs", score: 91, status: "Interview Scheduled" },
  { id: "APP-58233", candidate: "Anjali B. Pawar", vacancy: "VAC-2025-089", subject: "Thermodynamics", qual: "M.Tech (Mech)", exp: "2 yrs", score: 74, status: "Eligible" },
  { id: "APP-58234", candidate: "Vivek S. Joshi", vacancy: "VAC-2025-092", subject: "Web Technologies", qual: "M.E. (IT), NET", exp: "4 yrs", score: 88, status: "Selected" },
  { id: "APP-58235", candidate: "Kavita R. Naik", vacancy: "VAC-2025-088", subject: "Data Structures", qual: "M.Sc. (CS)", exp: "1 yr", score: 58, status: "Rejected" },
  { id: "APP-58236", candidate: "Sandeep U. Kale", vacancy: "VAC-2025-092", subject: "Web Technologies", qual: "M.Tech (IT)", exp: "3 yrs", score: 79, status: "Under Scrutiny" },
];

export const INTERVIEWS = [
  { id: "INT-3201", candidate: "Rahul M. Deshpande", vacancy: "VAC-2025-088", date: "2025-06-18", time: "11:00 AM", panel: "Dr. S. V. Patil, Prof. N. R. Joshi, Dr. M. Karandikar", status: "Scheduled" },
  { id: "INT-3202", candidate: "Vivek S. Joshi", vacancy: "VAC-2025-092", date: "2025-06-15", time: "02:30 PM", panel: "Dr. P. Mishra, Prof. S. N. Verma, Dr. A. Rao", status: "Completed" },
  { id: "INT-3203", candidate: "Priya S. Sawant", vacancy: "VAC-2025-088", date: "2025-06-19", time: "10:00 AM", panel: "Dr. S. V. Patil, Prof. N. R. Joshi, Dr. M. Karandikar", status: "Scheduled" },
];

export const ATTENDANCE = [
  { id: "ATT-9821", lecturer: "Priya S. Sawant", date: "2025-06-10", subject: "DSA", class: "TY-CSE-A", hours: 2, status: "Approved" },
  { id: "ATT-9822", lecturer: "Priya S. Sawant", date: "2025-06-11", subject: "DSA Lab", class: "TY-CSE-A", hours: 2, status: "Approved" },
  { id: "ATT-9823", lecturer: "Rahul M. Deshpande", date: "2025-06-11", subject: "DBMS", class: "SY-CSE-B", hours: 1, status: "Verified" },
  { id: "ATT-9824", lecturer: "Vivek S. Joshi", date: "2025-06-12", subject: "Web Tech", class: "TY-IT-A", hours: 2, status: "Pending" },
  { id: "ATT-9825", lecturer: "Anjali B. Pawar", date: "2025-06-12", subject: "Thermodynamics", class: "SY-MECH-A", hours: 2, status: "Pending" },
  { id: "ATT-9826", lecturer: "Rahul M. Deshpande", date: "2025-06-12", subject: "DBMS Lab", class: "SY-CSE-B", hours: 2, status: "Approved" },
];

export const BILLS = [
  { id: "BIL-2025-2201", college: "Govt. Polytechnic, Pune", lecturer: "Priya S. Sawant", month: "May 2025", hours: 48, rate: 750, amount: 36000, status: "Sent by Principal", submitted: "2025-06-02" },
  { id: "BIL-2025-2202", college: "Govt. Polytechnic, Mumbai", lecturer: "Rahul M. Deshpande", month: "May 2025", hours: 52, rate: 800, amount: 41600, status: "Payment Processing", submitted: "2025-06-03" },
  { id: "BIL-2025-2203", college: "Govt. Polytechnic, Nagpur", lecturer: "Vivek S. Joshi", month: "May 2025", hours: 44, rate: 750, amount: 33000, status: "Sent by Principal", submitted: "2025-06-04" },
  { id: "BIL-2025-2204", college: "Govt. Polytechnic, Nashik", lecturer: "Anjali B. Pawar", month: "May 2025", hours: 40, rate: 750, amount: 30000, status: "HOD Approved", submitted: "2025-06-05" },
  { id: "BIL-2025-2205", college: "Govt. Polytechnic, Solapur", lecturer: "Sandeep U. Kale", month: "May 2025", hours: 38, rate: 750, amount: 28500, status: "Submitted", submitted: "2025-06-06" },
  { id: "BIL-2025-2206", college: "Govt. Engg. College, Amravati", lecturer: "Kavita R. Naik", month: "Apr 2025", hours: 46, rate: 750, amount: 34500, status: "Paid", submitted: "2025-05-04" },
];

export const PAYMENTS = [
  { id: "PAY-78921", bill: "BIL-2025-2206", lecturer: "Kavita R. Naik", amount: 34500, utr: "HDFC0234198721", date: "2025-05-12", status: "Paid" },
  { id: "PAY-78922", bill: "BIL-2025-2199", lecturer: "M. Inamdar", amount: 29250, utr: "SBIN0987654321", date: "2025-05-12", status: "Paid" },
  { id: "PAY-78923", bill: "BIL-2025-2202", lecturer: "Rahul M. Deshpande", amount: 41600, utr: "—", date: "—", status: "Processing" },
  { id: "PAY-78924", bill: "BIL-2025-2188", lecturer: "S. Khan", amount: 26000, utr: "—", date: "—", status: "Pending" },
];

export const NOTIFICATIONS = [
  { id: 1, type: "approval", title: "Vacancy REQ-2025-1042 awaits Regional approval", time: "12 min ago" },
  { id: 2, type: "bill", title: "Bill BIL-2025-2202 moved to Payment Processing", time: "1 hr ago" },
  { id: 3, type: "interview", title: "Interview INT-3201 scheduled for 18 Jun, 11:00 AM", time: "3 hrs ago" },
  { id: 4, type: "ai", title: "AI flagged duplicate attendance entry ATT-9824", time: "5 hrs ago" },
  { id: 5, type: "system", title: "Academic Year 2025-26 configuration updated", time: "Yesterday" },
];

export const AI_INSIGHTS = [
  { kind: "Anomaly", severity: "high", title: "Duplicate attendance suspected", detail: "Lecturer V. Joshi submitted overlapping lecture hours on 12 Jun (TY-IT-A & TY-IT-B)." },
  { kind: "Recommendation", severity: "medium", title: "Optimal faculty count for GP Mumbai (E&TC)", detail: "Based on 70 hr workload, system suggests 4 CHB lecturers instead of 5." },
  { kind: "Ranking", severity: "info", title: "Top 3 candidates for VAC-2025-088", detail: "Deshpande (91), Sawant (86), Kale (79) — by composite merit score." },
  { kind: "Bill Validation", severity: "medium", title: "Rate mismatch detected", detail: "BIL-2025-2204 uses ₹750/hr; HOD's approved norm for SY classes is ₹720/hr." },
  { kind: "Eligibility", severity: "info", title: "Auto-validated 124 applicants", detail: "OCR + rule engine validated qualifications for VAC-2025-092 applicants." },
];

export const AUDIT_LOGS = [
  { id: "LOG-90021", actor: "Dr. S. V. Patil", action: "Approved Requirement REQ-2025-1044", ip: "10.21.4.18", time: "2025-06-10 14:21" },
  { id: "LOG-90022", actor: "Prof. N. R. Joshi", action: "Verified Attendance ATT-9826", ip: "10.21.4.42", time: "2025-06-12 11:08" },
  { id: "LOG-90023", actor: "Shri. V. K. More", action: "Processed Payment PAY-78921", ip: "10.10.1.5", time: "2025-05-12 10:44" },
  { id: "LOG-90024", actor: "Smt. A. P. Kulkarni", action: "Approved Bill BIL-2025-2201", ip: "10.15.2.9", time: "2025-06-08 16:12" },
  { id: "LOG-90025", actor: "Dr. R. M. Deshmukh", action: "Updated CHB rate norms FY 2025-26", ip: "10.0.0.4", time: "2025-04-01 09:30" },
];

export const TICKETS = [
  { id: "TKT-4421", subject: "Unable to upload caste certificate", raisedBy: "A. Pawar", priority: "Medium", status: "Open", assigned: "Helpdesk-2" },
  { id: "TKT-4422", subject: "Bill amount mismatch for May", raisedBy: "R. Deshpande", priority: "High", status: "In Progress", assigned: "Helpdesk-1" },
  { id: "TKT-4423", subject: "OTP not received for login", raisedBy: "V. Joshi", priority: "Low", status: "Resolved", assigned: "Helpdesk-3" },
  { id: "TKT-4424", subject: "Appointment letter not generated", raisedBy: "K. Naik", priority: "High", status: "Escalated", assigned: "Helpdesk-1" },
];

export const STATUS_COLORS: Record<string, string> = {
  "Approved": "bg-success/10 text-success border-success/30",
  "Approved by Principal": "bg-success/10 text-success border-success/30",
  "Approved by Regional Joint Director": "bg-success/10 text-success border-success/30",
  "Paid": "bg-success/10 text-success border-success/30",
  "Selected": "bg-success/10 text-success border-success/30",
  "Offer Created": "bg-success/10 text-success border-success/30",
  "Completed": "bg-success/10 text-success border-success/30",
  "Resolved": "bg-success/10 text-success border-success/30",
  "Eligible": "bg-info/10 text-info border-info/30",
  "Verified": "bg-info/10 text-info border-info/30",
  "Scheduled": "bg-info/10 text-info border-info/30",
  "Interview Scheduled": "bg-info/10 text-info border-info/30",
  "In Progress": "bg-info/10 text-info border-info/30",
  "Shortlisted": "bg-accent/10 text-accent border-accent/30",
  "Applications Open": "bg-accent/10 text-accent border-accent/30",
  "Submitted": "bg-warning/15 text-warning-foreground border-warning/40",
  "Under Scrutiny": "bg-warning/15 text-warning-foreground border-warning/40",
  "Principal Approval Pending": "bg-warning/15 text-warning-foreground border-warning/40",
  "Regional Approval Pending": "bg-warning/15 text-warning-foreground border-warning/40",
  "HOD Approved": "bg-warning/15 text-warning-foreground border-warning/40",
  "Sent by Principal": "bg-warning/15 text-warning-foreground border-warning/40",
  "Principal Approved": "bg-warning/15 text-warning-foreground border-warning/40",
  "Regional Approved": "bg-warning/15 text-warning-foreground border-warning/40",
  "Payment Processing": "bg-warning/15 text-warning-foreground border-warning/40",
  "Pending": "bg-warning/15 text-warning-foreground border-warning/40",
  "Processing": "bg-info/10 text-info border-info/30",
  "Open": "bg-warning/15 text-warning-foreground border-warning/40",
  "Escalated": "bg-destructive/10 text-destructive border-destructive/30",
  "Rejected": "bg-destructive/10 text-destructive border-destructive/30",
  "Draft": "bg-muted text-muted-foreground border-border",
  "Applications Closed": "bg-muted text-muted-foreground border-border",
};
