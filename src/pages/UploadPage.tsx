import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  Image,
  File,
  X,
  Brain,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: "uploading" | "processing" | "completed" | "error";
  progress: number;
}

const STEPS = ["Upload", "OCR Extraction", "NLP Analysis", "Code Mapping", "Complete"];

export default function UploadPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [processingStep, setProcessingStep] = useState(-1);
  const { toast } = useToast();

  const simulateProcessing = useCallback(
    (fileId: string) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setFiles((prev) =>
            prev.map((f) =>
              f.id === fileId ? { ...f, progress: 100, status: "processing" } : f
            )
          );

          // Simulate AI processing steps
          let step = 0;
          setProcessingStep(0);
          const stepInterval = setInterval(() => {
            step++;
            if (step >= STEPS.length - 1) {
              clearInterval(stepInterval);
              setFiles((prev) =>
                prev.map((f) =>
                  f.id === fileId ? { ...f, status: "completed" } : f
                )
              );
              setProcessingStep(STEPS.length - 1);
              toast({
                title: "Processing Complete",
                description: "Document has been analyzed and codes generated.",
              });
            }
            setProcessingStep(step);
          }, 1500);
        } else {
          setFiles((prev) =>
            prev.map((f) => (f.id === fileId ? { ...f, progress } : f))
          );
        }
      }, 200);
    },
    [toast]
  );

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      id: crypto.randomUUID(),
      name: f.name,
      size: f.size,
      type: f.type,
      status: "uploading" as const,
      progress: 0,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => simulateProcessing(f.id));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return <FileText className="h-5 w-5 text-destructive" />;
    if (type.includes("image")) return <Image className="h-5 w-5 text-info" />;
    return <File className="h-5 w-5 text-primary" />;
  };

  const hasProcessing = files.some((f) => f.status === "processing");

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Upload Documents</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Upload charge sheets, doctor notes, or clinical documents for AI-powered code extraction
        </p>
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          "border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer",
          dragOver
            ? "border-primary bg-primary/5 shadow-glow"
            : "border-border hover:border-primary/50 hover:bg-muted/30"
        )}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
        <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
          <Upload className="h-7 w-7 text-primary-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Drop files here or click to browse</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Supports PDF, DOC, DOCX, JPG, PNG — Max 50MB per file
        </p>
        <div className="flex justify-center gap-2 mt-4">
          {["PDF", "DOC", "IMG"].map((fmt) => (
            <span key={fmt} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
              {fmt}
            </span>
          ))}
        </div>
      </div>

      {/* Processing steps */}
      {hasProcessing && processingStep >= 0 && (
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4 flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary animate-pulse" />
            AI Processing Pipeline
          </h3>
          <div className="flex items-center gap-2">
            {STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-2 flex-1">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-500",
                    i < processingStep
                      ? "bg-success text-success-foreground"
                      : i === processingStep
                      ? "gradient-primary text-primary-foreground animate-pulse-glow shadow-glow"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {i < processingStep ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : i === processingStep ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    i + 1
                  )}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 rounded transition-colors duration-500",
                      i < processingStep ? "bg-success" : "bg-muted"
                    )}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 px-1">
            {STEPS.map((step, i) => (
              <span
                key={step}
                className={cn(
                  "text-[10px] font-medium",
                  i <= processingStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                {step}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Uploaded Files</h3>
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-all"
            >
              {getFileIcon(file.type)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-card-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {file.status === "uploading" && (
                  <Progress value={file.progress} className="h-1.5 mt-2" />
                )}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium",
                    file.status === "completed"
                      ? "bg-success/10 text-success"
                      : file.status === "processing"
                      ? "bg-info/10 text-info"
                      : file.status === "error"
                      ? "bg-destructive/10 text-destructive"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {file.status === "uploading"
                    ? "Uploading..."
                    : file.status === "processing"
                    ? "AI Processing..."
                    : file.status === "completed"
                    ? "Complete"
                    : "Error"}
                </span>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-muted-foreground hover:text-destructive transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
