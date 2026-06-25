import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User as UserIcon, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type Msg = { role: "bot" | "user"; text: string };

const QUICK = [
  "How do I apply for a CHB vacancy?",
  "When will my bill be paid?",
  "How to mark attendance?",
  "Reset my password",
];

const CANNED: { match: RegExp; reply: string }[] = [
  { match: /apply|vacanc/i, reply: "Open Vacancy Listings → click any open vacancy → fill the application form (personal, education, marks, documents) → Submit. You can track status under My Applications." },
  { match: /bill|payment|paid/i, reply: "Bills follow: Lecturer → HOD → Principal → Regional → Accounts → Paid. Typical turnaround is 7–10 working days after Principal approval." },
  { match: /attendance/i, reply: "Go to Attendance Submission, choose date, subject and class, enter hours, then submit. HOD verifies before Principal approval." },
  { match: /password|otp|login|reset/i, reply: "Use 'Forgot password?' on the login screen or sign in with Aadhaar OTP. For account lockouts contact 1800-XXX-XXXX." },
  { match: /requirement|manpower/i, reply: "Principals can raise faculty requirements from Requirements → New Requirement. The form captures department, subject, lecturers and workload." },
  { match: /digilocker|aadhaar|kyc/i, reply: "DigiLocker and Aadhaar e-KYC are integrated for document verification. Link your DigiLocker from My Profile." },
];

function reply(text: string) {
  const hit = CANNED.find((c) => c.match.test(text));
  if (hit) return hit.reply;
  return "Thanks for your question. A support executive will get back within 24 hours. You can also call the toll-free helpdesk at 1800-XXX-XXXX.";
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "नमस्कार! I'm CHB Sahayak — your virtual assistant for the DTE CHB Portal. How may I help you today?" },
  ]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight;
  }, [msgs, open]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMsgs((m) => [...m, { role: "user", text: t }]);
    setInput("");
    setTimeout(() => {
      setMsgs((m) => [...m, { role: "bot", text: reply(t) }]);
    }, 500);
  };

  return (
    <>
      {/* Launcher */}
      <button
        aria-label="Open chat assistant"
        onClick={() => setOpen((s) => !s)}
        className={cn(
          "fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--info))] text-primary-foreground shadow-xl ring-4 ring-primary/20 transition-transform hover:scale-105",
          open && "scale-90 opacity-0 pointer-events-none",
        )}
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 animate-pulse rounded-full bg-accent ring-2 ring-background" />
      </button>

      {/* Panel */}
      <div
        className={cn(
          "fixed bottom-5 right-5 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl transition-all duration-200",
          "h-[540px] max-h-[calc(100vh-2rem)]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-gradient-to-br from-primary to-[hsl(var(--info))] px-4 py-3 text-primary-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 ring-1 ring-inset ring-white/20">
            <Bot className="h-4.5 w-4.5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              CHB Sahayak <Sparkles className="h-3 w-3 text-accent" />
            </p>
            <p className="text-[11px] text-primary-foreground/80">AI Assistant · Online</p>
          </div>
          <button onClick={() => setOpen(false)} className="rounded-md p-1 hover:bg-white/10" aria-label="Close chat">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-muted/30 px-3 py-4">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex gap-2", m.role === "user" && "flex-row-reverse")}>
              <div className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                m.role === "bot" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
              )}>
                {m.role === "bot" ? <Bot className="h-3.5 w-3.5" /> : <UserIcon className="h-3.5 w-3.5" />}
              </div>
              <div className={cn(
                "max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-sm",
                m.role === "bot"
                  ? "rounded-tl-sm bg-card text-foreground"
                  : "rounded-tr-sm bg-primary text-primary-foreground",
              )}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Quick replies */}
        {msgs.length <= 1 && (
          <div className="flex flex-wrap gap-1.5 border-t border-border bg-card px-3 py-2">
            {QUICK.map((q) => (
              <button
                key={q}
                onClick={() => send(q)}
                className="rounded-full border border-border bg-muted/40 px-2.5 py-1 text-[11px] text-muted-foreground hover:bg-primary-soft hover:text-primary"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Composer */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 border-t border-border bg-card p-2.5"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about vacancies, bills, attendance…"
            className="h-9 flex-1 text-xs"
          />
          <Button type="submit" size="icon" className="h-9 w-9 shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}
