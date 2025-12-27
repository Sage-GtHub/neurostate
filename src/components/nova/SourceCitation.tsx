import { cn } from "@/lib/utils";
import { ExternalLink, FileText, Beaker, BookOpen } from "lucide-react";

interface Source {
  title: string;
  url?: string;
  type?: "study" | "article" | "book" | "data";
  confidence?: "high" | "medium" | "low";
}

interface SourceCitationProps {
  sources: Source[];
  className?: string;
}

const typeIcons = {
  study: Beaker,
  article: FileText,
  book: BookOpen,
  data: FileText,
};

const confidenceColors = {
  high: "bg-green-500/10 text-green-500 border-green-500/20",
  medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  low: "bg-muted text-muted-foreground border-border",
};

export function SourceCitation({ sources, className }: SourceCitationProps) {
  if (!sources.length) return null;

  return (
    <div className={cn("space-y-2", className)}>
      <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
        Sources ({sources.length})
      </p>
      
      <div className="flex flex-wrap gap-2">
        {sources.map((source, i) => {
          const Icon = typeIcons[source.type || "article"];
          const confidence = source.confidence || "high";
          
          return (
            <a
              key={i}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs",
                "border transition-all duration-200",
                confidenceColors[confidence],
                source.url && "hover:bg-accent/20 hover:border-accent/40 cursor-pointer"
              )}
            >
              <Icon className="w-3 h-3" />
              <span className="max-w-[150px] truncate">{source.title}</span>
              {source.url && (
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}