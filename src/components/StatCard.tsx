import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-card-foreground mt-1">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-2",
                trend.positive ? "text-success" : "text-destructive"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground shadow-glow">
          {icon}
        </div>
      </div>
    </div>
  );
}
