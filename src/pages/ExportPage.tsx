import { Button } from "@/components/ui/button";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const EXPORT_DATA = [
  { id: "DOC-1247", patient: "John Doe", codes: "E11.22, N18.3, 99214", confidence: 94, reviewer: "Dr. Sarah Chen", status: "Finalized" },
  { id: "DOC-1245", patient: "Jane Smith", codes: "I21.09, 93000, A0427", confidence: 92, reviewer: "James Wilson", status: "Finalized" },
  { id: "DOC-1243", patient: "Robert Brown", codes: "I11.0, 93306", confidence: 91, reviewer: "Dr. Sarah Chen", status: "Finalized" },
  { id: "DOC-1240", patient: "Emily Davis", codes: "J18.9, 99213", confidence: 88, reviewer: "James Wilson", status: "In Review" },
];

export default function ExportPage() {
  const { toast } = useToast();

  const handleExport = (format: string) => {
    toast({
      title: `Export Started`,
      description: `Generating ${format.toUpperCase()} export file...`,
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Download className="h-6 w-6 text-primary" />
            Export Data
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Export finalized coding data in various formats</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport("excel")}>
            <FileSpreadsheet className="h-3.5 w-3.5 text-success" />
            Export Excel
          </Button>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={() => handleExport("pdf")}>
            <FileText className="h-3.5 w-3.5 text-destructive" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30">
              <TableHead className="text-xs font-semibold">Document ID</TableHead>
              <TableHead className="text-xs font-semibold">Patient</TableHead>
              <TableHead className="text-xs font-semibold">Final Codes</TableHead>
              <TableHead className="text-xs font-semibold">Confidence</TableHead>
              <TableHead className="text-xs font-semibold">Reviewer</TableHead>
              <TableHead className="text-xs font-semibold">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {EXPORT_DATA.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/20 transition-colors">
                <TableCell className="font-mono text-sm font-bold text-primary">{row.id}</TableCell>
                <TableCell className="text-sm text-card-foreground">{row.patient}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">{row.codes}</TableCell>
                <TableCell>
                  <span className="text-sm font-semibold text-success">{row.confidence}%</span>
                </TableCell>
                <TableCell className="text-sm text-card-foreground">{row.reviewer}</TableCell>
                <TableCell>
                  <Badge
                    variant={row.status === "Finalized" ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
