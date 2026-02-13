import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Upload,
  Database,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MedicalCode {
  id: string;
  code: string;
  description: string;
  category: string;
  synonyms: string[];
}

const MOCK_ICD10: MedicalCode[] = [
  { id: "1", code: "E11.22", description: "Type 2 DM with diabetic CKD", category: "Endocrine", synonyms: ["diabetes", "DM"] },
  { id: "2", code: "I21.09", description: "AMI of anterior wall, unspecified", category: "Circulatory", synonyms: ["heart attack", "MI"] },
  { id: "3", code: "I11.0", description: "Hypertensive heart disease with HF", category: "Circulatory", synonyms: ["HTN", "high BP"] },
  { id: "4", code: "J18.9", description: "Pneumonia, unspecified organism", category: "Respiratory", synonyms: ["lung infection"] },
  { id: "5", code: "N18.3", description: "Chronic kidney disease, stage 3", category: "Genitourinary", synonyms: ["CKD", "renal"] },
];

const MOCK_CPT: MedicalCode[] = [
  { id: "1", code: "99214", description: "Office visit, established patient, moderate", category: "E&M", synonyms: ["office visit"] },
  { id: "2", code: "93000", description: "Electrocardiogram, complete", category: "Cardiology", synonyms: ["ECG", "EKG"] },
  { id: "3", code: "93306", description: "Echocardiography, complete", category: "Cardiology", synonyms: ["echo"] },
];

const MOCK_HCPCS: MedicalCode[] = [
  { id: "1", code: "A0427", description: "Ambulance service, ALS emergency", category: "Transport", synonyms: ["ambulance"] },
  { id: "2", code: "J7030", description: "Normal saline solution infusion", category: "Drugs", synonyms: ["saline", "NS"] },
];

function CodeTable({ codes, search }: { codes: MedicalCode[]; search: string }) {
  const filtered = codes.filter(
    (c) =>
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/30">
            <TableHead className="text-xs font-semibold">Code</TableHead>
            <TableHead className="text-xs font-semibold">Description</TableHead>
            <TableHead className="text-xs font-semibold">Category</TableHead>
            <TableHead className="text-xs font-semibold">Synonyms</TableHead>
            <TableHead className="text-xs font-semibold text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((code) => (
            <TableRow key={code.id} className="hover:bg-muted/20 transition-colors">
              <TableCell className="font-mono font-bold text-sm text-primary">{code.code}</TableCell>
              <TableCell className="text-sm text-card-foreground">{code.description}</TableCell>
              <TableCell>
                <Badge variant="secondary" className="text-xs">{code.category}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 flex-wrap">
                  {code.synonyms.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded-full bg-muted text-[10px] text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button size="icon" variant="ghost" className="h-7 w-7">
                    <Edit3 className="h-3.5 w-3.5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function CodesPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Database className="h-6 w-6 text-primary" />
            Code Master Database
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Manage ICD-10, CPT, and HCPCS code datasets</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5">
            <Upload className="h-3.5 w-3.5" />
            Bulk Import
          </Button>
          <Button size="sm" className="gap-1.5 gradient-primary text-primary-foreground shadow-glow">
            <Plus className="h-3.5 w-3.5" />
            Add Code
          </Button>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search codes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 bg-background"
        />
      </div>

      <Tabs defaultValue="icd10">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="icd10">ICD-10 ({MOCK_ICD10.length})</TabsTrigger>
          <TabsTrigger value="cpt">CPT ({MOCK_CPT.length})</TabsTrigger>
          <TabsTrigger value="hcpcs">HCPCS ({MOCK_HCPCS.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="icd10" className="mt-4">
          <CodeTable codes={MOCK_ICD10} search={search} />
        </TabsContent>
        <TabsContent value="cpt" className="mt-4">
          <CodeTable codes={MOCK_CPT} search={search} />
        </TabsContent>
        <TabsContent value="hcpcs" className="mt-4">
          <CodeTable codes={MOCK_HCPCS} search={search} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
