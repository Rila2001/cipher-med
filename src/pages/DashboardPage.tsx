import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/StatCard";
import {
  FileText,
  Code2,
  Clock,
  Target,
  Brain,
  TrendingUp,
  BarChart3,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const trendData = [
  { name: "Mon", docs: 45, codes: 128 },
  { name: "Tue", docs: 52, codes: 156 },
  { name: "Wed", docs: 38, codes: 110 },
  { name: "Thu", docs: 65, codes: 195 },
  { name: "Fri", docs: 58, codes: 170 },
  { name: "Sat", docs: 30, codes: 85 },
  { name: "Sun", docs: 22, codes: 62 },
];

const categoryData = [
  { name: "ICD-10", value: 45 },
  { name: "CPT", value: 35 },
  { name: "HCPCS", value: 20 },
];

const CHART_COLORS = [
  "hsl(174, 72%, 40%)",
  "hsl(199, 89%, 48%)",
  "hsl(152, 69%, 41%)",
];

const accuracyData = [
  { name: "Week 1", accuracy: 92 },
  { name: "Week 2", accuracy: 94 },
  { name: "Week 3", accuracy: 95 },
  { name: "Week 4", accuracy: 97 },
];

const recentDocs = [
  { id: 1, name: "Cardiology_Note_0412.pdf", status: "Completed", codes: 5, confidence: 96 },
  { id: 2, name: "ER_Discharge_0411.docx", status: "In Review", codes: 3, confidence: 88 },
  { id: 3, name: "Lab_Results_0410.pdf", status: "Completed", codes: 7, confidence: 94 },
  { id: 4, name: "Surgery_Report_0409.pdf", status: "Pending", codes: 0, confidence: 0 },
];

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's an overview of your medical coding activity
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Documents Processed"
          value="1,247"
          icon={<FileText className="h-5 w-5" />}
          trend={{ value: "12% this week", positive: true }}
        />
        <StatCard
          title="Codes Generated"
          value="3,891"
          icon={<Code2 className="h-5 w-5" />}
          trend={{ value: "8% this week", positive: true }}
        />
        <StatCard
          title="Pending Reviews"
          value="23"
          icon={<Clock className="h-5 w-5" />}
          trend={{ value: "5 less", positive: true }}
        />
        <StatCard
          title="Accuracy Rate"
          value="96.8%"
          icon={<Target className="h-5 w-5" />}
          trend={{ value: "1.2% improvement", positive: true }}
        />
        <StatCard
          title="AI Confidence Avg"
          value="94.2%"
          icon={<Brain className="h-5 w-5" />}
          trend={{ value: "0.5% up", positive: true }}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Volume Trend */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Coding Volume Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={trendData}>
              <defs>
                <linearGradient id="colorDocs" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(174, 72%, 40%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorCodes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(210, 15%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(210, 15%, 46%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(210, 25%, 90%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area type="monotone" dataKey="docs" stroke="hsl(174, 72%, 40%)" fill="url(#colorDocs)" strokeWidth={2} />
              <Area type="monotone" dataKey="codes" stroke="hsl(199, 89%, 48%)" fill="url(#colorCodes)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Code Categories
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={categoryData}
                innerRadius={55}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {categoryData.map((cat, idx) => (
              <div key={cat.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <div className="h-2.5 w-2.5 rounded-full" style={{ background: CHART_COLORS[idx] }} />
                {cat.name} ({cat.value}%)
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accuracy + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Accuracy */}
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Activity className="h-4 w-4 text-primary" />
            AI Accuracy Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 25%, 90%)" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(210, 15%, 46%)" />
              <YAxis domain={[85, 100]} tick={{ fontSize: 11 }} stroke="hsl(210, 15%, 46%)" />
              <Tooltip />
              <Bar dataKey="accuracy" fill="hsl(174, 72%, 40%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Documents */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Documents</h3>
          <div className="space-y-3">
            {recentDocs.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-card-foreground">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.codes} codes generated</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {doc.confidence > 0 && (
                    <span className="text-xs font-medium text-primary">{doc.confidence}%</span>
                  )}
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      doc.status === "Completed"
                        ? "bg-success/10 text-success"
                        : doc.status === "In Review"
                        ? "bg-warning/10 text-warning"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {doc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
