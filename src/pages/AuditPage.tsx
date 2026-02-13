import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, ScrollText, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const MOCK_LOGS = [
  { id: "1", timestamp: "2026-02-13 10:45:23", user: "Dr. Sarah Chen", action: "Code Accepted", detail: "ICD-10 E11.22 accepted for Doc #1247", type: "accept" },
  { id: "2", timestamp: "2026-02-13 10:42:11", user: "James Wilson", action: "Code Override", detail: "Changed CPT 99213 → 99214 for Doc #1245", type: "override" },
  { id: "3", timestamp: "2026-02-13 10:38:05", user: "AI System", action: "Auto-Coding", detail: "Generated 5 codes for Cardiology_Note_0412.pdf", type: "ai" },
  { id: "4", timestamp: "2026-02-13 10:35:00", user: "Dr. Sarah Chen", action: "Document Upload", detail: "Uploaded ER_Discharge_0411.docx", type: "upload" },
  { id: "5", timestamp: "2026-02-13 10:30:12", user: "James Wilson", action: "Code Rejected", detail: "Rejected HCPCS A0427 for Doc #1243", type: "reject" },
  { id: "6", timestamp: "2026-02-13 10:25:33", user: "AI System", action: "OCR Processing", detail: "Extracted text from Lab_Results_0410.pdf", type: "ai" },
  { id: "7", timestamp: "2026-02-13 10:20:45", user: "Dr. Sarah Chen", action: "Comment Added", detail: "Added review note to Doc #1240", type: "comment" },
  { id: "8", timestamp: "2026-02-13 10:15:00", user: "System", action: "User Login", detail: "Dr. Sarah Chen logged in", type: "system" },
];

const actionColors: Record<string, string> = {
  accept: "bg-success/10 text-success",
  override: "bg-warning/10 text-warning",
  reject: "bg-destructive/10 text-destructive",
  ai: "bg-primary/10 text-primary",
  upload: "bg-info/10 text-info",
  comment: "bg-muted text-muted-foreground",
  system: "bg-muted text-muted-foreground",
};

export default function AuditPage() {
  const [search, setSearch] = useState("");

  const filtered = MOCK_LOGS.filter(
    (log) =>
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.detail.toLowerCase().includes(search.toLowerCase()) ||
      log.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <ScrollText className="h-6 w-6 text-primary" />
            Audit Trail & Logs
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Track all coding changes, overrides, and system events</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 w-64 h-9 bg-background"
            />
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="text-xs font-semibold">Timestamp</TableHead>
              <TableHead className="text-xs font-semibold">User</TableHead>
              <TableHead className="text-xs font-semibold">Action</TableHead>
              <TableHead className="text-xs font-semibold">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((log) => (
              <TableRow key={log.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="text-xs text-muted-foreground font-mono">{log.timestamp}</TableCell>
                <TableCell className="text-sm text-card-foreground font-medium">{log.user}</TableCell>
                <TableCell>
                  <Badge className={`text-xs ${actionColors[log.type]}`} variant="secondary">
                    {log.action}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{log.detail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
