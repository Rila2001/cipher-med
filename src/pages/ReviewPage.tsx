import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle2,
  XCircle,
  Edit3,
  MessageSquare,
  Search,
  Filter,
  ChevronDown,
  Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeResult {
  id: string;
  diagnosis: string;
  codes: {
    type: "ICD-10" | "CPT" | "HCPCS";
    code: string;
    description: string;
    confidence: number;
    status: "pending" | "accepted" | "rejected" | "overridden";
  }[];
  documentName: string;
}

const MOCK_RESULTS: CodeResult[] = [
  {
    id: "1",
    diagnosis: "Type 2 Diabetes Mellitus with diabetic chronic kidney disease",
    documentName: "Cardiology_Note_0412.pdf",
    codes: [
      { type: "ICD-10", code: "E11.22", description: "Type 2 DM with diabetic CKD", confidence: 96, status: "pending" },
      { type: "ICD-10", code: "N18.3", description: "Chronic kidney disease, stage 3", confidence: 92, status: "pending" },
      { type: "CPT", code: "99214", description: "Office visit, established patient", confidence: 88, status: "pending" },
    ],
  },
  {
    id: "2",
    diagnosis: "Acute myocardial infarction of anterior wall",
    documentName: "ER_Discharge_0411.docx",
    codes: [
      { type: "ICD-10", code: "I21.09", description: "AMI of anterior wall, unspecified", confidence: 97, status: "accepted" },
      { type: "CPT", code: "93000", description: "Electrocardiogram, complete", confidence: 94, status: "pending" },
      { type: "HCPCS", code: "A0427", description: "Ambulance service, ALS emergency", confidence: 85, status: "pending" },
    ],
  },
  {
    id: "3",
    diagnosis: "Essential hypertension with heart failure",
    documentName: "Lab_Results_0410.pdf",
    codes: [
      { type: "ICD-10", code: "I11.0", description: "Hypertensive heart disease with HF", confidence: 93, status: "pending" },
      { type: "CPT", code: "93306", description: "Echocardiography, complete", confidence: 90, status: "pending" },
    ],
  },
];

export default function ReviewPage() {
  const [results, setResults] = useState(MOCK_RESULTS);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>("1");

  const updateCodeStatus = (resultId: string, codeIdx: number, status: "accepted" | "rejected") => {
    setResults((prev) =>
      prev.map((r) =>
        r.id === resultId
          ? {
              ...r,
              codes: r.codes.map((c, i) => (i === codeIdx ? { ...c, status } : c)),
            }
          : r
      )
    );
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-success";
    if (confidence >= 85) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Code Review</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Review AI-generated medical codes and approve or override suggestions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search diagnoses..."
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

      {/* Results */}
      <div className="space-y-4">
        {results
          .filter((r) => r.diagnosis.toLowerCase().includes(search.toLowerCase()))
          .map((result) => (
            <div
              key={result.id}
              className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-md transition-all"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(expandedId === result.id ? null : result.id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center shrink-0">
                    <Brain className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{result.diagnosis}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{result.documentName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    {result.codes.map((c) => (
                      <Badge
                        key={c.code}
                        variant={
                          c.status === "accepted"
                            ? "default"
                            : c.status === "rejected"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {c.type}
                      </Badge>
                    ))}
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 text-muted-foreground transition-transform",
                      expandedId === result.id && "rotate-180"
                    )}
                  />
                </div>
              </button>

              {/* Expanded content */}
              {expandedId === result.id && (
                <div className="border-t border-border p-5 bg-muted/20 animate-slide-up">
                  <div className="space-y-3">
                    {result.codes.map((code, idx) => (
                      <div
                        key={code.code}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-lg border transition-all",
                          code.status === "accepted"
                            ? "border-success/30 bg-success/5"
                            : code.status === "rejected"
                            ? "border-destructive/30 bg-destructive/5"
                            : "border-border bg-card"
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs font-mono">
                                {code.type}
                              </Badge>
                              <span className="text-sm font-bold text-card-foreground font-mono">
                                {code.code}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{code.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {/* Confidence */}
                          <div className="text-right">
                            <p className="text-[10px] text-muted-foreground">Confidence</p>
                            <p className={cn("text-sm font-bold", getConfidenceColor(code.confidence))}>
                              {code.confidence}%
                            </p>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1.5">
                            <Button
                              size="icon"
                              variant={code.status === "accepted" ? "default" : "outline"}
                              className="h-8 w-8"
                              onClick={() => updateCodeStatus(result.id, idx, "accepted")}
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="icon"
                              variant={code.status === "rejected" ? "destructive" : "outline"}
                              className="h-8 w-8"
                              onClick={() => updateCodeStatus(result.id, idx, "rejected")}
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <Edit3 className="h-3.5 w-3.5" />
                            </Button>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <MessageSquare className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
