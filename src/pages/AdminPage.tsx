import { StatCard } from "@/components/StatCard";
import {
  Users,
  Brain,
  Database,
  ScrollText,
  Settings,
  Sliders,
  Clock,
  Shield,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const USERS = [
  { id: "1", name: "Dr. Sarah Chen", email: "admin@medcode.ai", role: "Admin", status: "Active", lastLogin: "2026-02-13" },
  { id: "2", name: "James Wilson", email: "user@medcode.ai", role: "User", status: "Active", lastLogin: "2026-02-13" },
  { id: "3", name: "Maria Garcia", email: "maria@medcode.ai", role: "User", status: "Inactive", lastLogin: "2026-02-10" },
];

export default function AdminPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-primary" />
          Admin Control Panel
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Manage users, AI settings, and system configuration</p>
      </div>

      {/* Admin Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Users" value="12" icon={<Users className="h-5 w-5" />} />
        <StatCard title="AI Accuracy" value="96.8%" icon={<Brain className="h-5 w-5" />} />
        <StatCard title="Code Records" value="24,891" icon={<Database className="h-5 w-5" />} />
        <StatCard title="Avg Processing" value="3.2s" icon={<Clock className="h-5 w-5" />} />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="ai">AI Settings</TabsTrigger>
          <TabsTrigger value="system">System Config</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="text-xs font-semibold">Name</TableHead>
                  <TableHead className="text-xs font-semibold">Email</TableHead>
                  <TableHead className="text-xs font-semibold">Role</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Last Login</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {USERS.map((u) => (
                  <TableRow key={u.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell className="font-medium text-card-foreground">{u.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.email}</TableCell>
                    <TableCell>
                      <Badge variant={u.role === "Admin" ? "default" : "secondary"} className="text-xs">
                        {u.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs ${u.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}`}
                        variant="secondary"
                      >
                        {u.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{u.lastLogin}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Sliders className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">AI Processing Thresholds</h3>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-sm">Minimum Confidence Threshold: 85%</Label>
                <Slider defaultValue={[85]} max={100} min={50} step={1} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Codes below this threshold require manual review</p>
              </div>
              <div>
                <Label className="text-sm">Auto-Accept Threshold: 95%</Label>
                <Slider defaultValue={[95]} max={100} min={70} step={1} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">Codes above this threshold are automatically accepted</p>
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Enable NLP Synonym Matching</p>
                  <p className="text-xs text-muted-foreground">Map medical abbreviations and synonyms</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium text-card-foreground">Multi-Diagnosis Detection</p>
                  <p className="text-xs text-muted-foreground">Detect multiple diagnoses per document</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="system" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-card-foreground">Security & System</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Encryption</p>
                <p className="text-sm font-semibold text-card-foreground">AES-256</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Session Timeout</p>
                <p className="text-sm font-semibold text-card-foreground">30 minutes</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Max File Size</p>
                <p className="text-sm font-semibold text-card-foreground">50 MB</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30">
                <p className="text-xs text-muted-foreground">Compliance</p>
                <p className="text-sm font-semibold text-success">HIPAA Ready</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
