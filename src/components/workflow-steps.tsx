import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = { label: string; state: "done" | "current" | "pending" | "rejected" };

export function WorkflowSteps({ steps }: { steps: Step[] }) {
  return (
    <div className="flex w-full items-center overflow-x-auto">
      {steps.map((s, i) => {
        const isLast = i === steps.length - 1;
        const tone =
          s.state === "done"
            ? "bg-success text-success-foreground border-success"
            : s.state === "current"
            ? "bg-info text-info-foreground border-info animate-pulse"
            : s.state === "rejected"
            ? "bg-destructive text-destructive-foreground border-destructive"
            : "bg-card text-muted-foreground border-border";
        const lineTone = s.state === "done" ? "bg-success" : "bg-border";
        return (
          <div key={i} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold", tone)}>
                {s.state === "done" ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className="max-w-[100px] text-center text-[11px] font-medium leading-tight text-foreground">{s.label}</span>
            </div>
            {!isLast && <div className={cn("mx-2 h-0.5 flex-1", lineTone)} />}
          </div>
        );
      })}
    </div>
  );
}
