import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Server, Database, Cpu, Shield, Layers } from "lucide-react";

interface StackLayer {
  name: string;
  icon: any;
  components: {
    label: string;
    tech: string;
    description: string;
  }[];
}

const architecture: StackLayer[] = [
  {
    name: "Frontend Stack",
    icon: Layers,
    components: [
      {
        label: "INTERFACE",
        tech: "React Native (iOS/Android/Web)",
        description: "Cross-platform native experience"
      },
      {
        label: "STATE MANAGEMENT",
        tech: "Redux + RTK Query",
        description: "Predictable state with optimistic updates"
      },
      {
        label: "VISUALIZATION",
        tech: "D3.js + Custom SVG",
        description: "Real-time biometric rendering"
      },
      {
        label: "REAL-TIME",
        tech: "WebSocket + Server-Sent Events",
        description: "<100ms data updates"
      }
    ]
  },
  {
    name: "Backend Stack",
    icon: Server,
    components: [
      {
        label: "API GATEWAY",
        tech: "GraphQL Federation",
        description: "Unified API across microservices"
      },
      {
        label: "ORCHESTRATION",
        tech: "Kubernetes + Istio",
        description: "Auto-scaling ML inference"
      },
      {
        label: "DATABASE",
        tech: "PostgreSQL + TimescaleDB",
        description: "Relational + time-series data"
      },
      {
        label: "CACHING",
        tech: "Redis Cluster",
        description: "Sub-millisecond data access"
      },
      {
        label: "QUEUE",
        tech: "Apache Kafka",
        description: "Real-time event streaming"
      },
      {
        label: "SEARCH",
        tech: "Elasticsearch",
        description: "Research paper indexing"
      }
    ]
  },
  {
    name: "ML Stack",
    icon: Cpu,
    components: [
      {
        label: "TRAINING",
        tech: "PyTorch + Ray",
        description: "Distributed model training"
      },
      {
        label: "SERVING",
        tech: "TorchServe + NVIDIA Triton",
        description: "GPU-accelerated inference"
      },
      {
        label: "PIPELINE",
        tech: "Kubeflow + MLflow",
        description: "ML lifecycle management"
      },
      {
        label: "FEATURE STORE",
        tech: "Feast",
        description: "Centralized feature management"
      },
      {
        label: "MONITORING",
        tech: "Prometheus + Grafana",
        description: "Model performance tracking"
      }
    ]
  },
  {
    name: "Data Stack",
    icon: Database,
    components: [
      {
        label: "INGESTION",
        tech: "Apache Flink",
        description: "Stream processing"
      },
      {
        label: "WAREHOUSE",
        tech: "Snowflake",
        description: "Analytics and BI"
      },
      {
        label: "LAKE",
        tech: "S3 + Parquet",
        description: "Long-term storage"
      },
      {
        label: "CDC",
        tech: "Debezium",
        description: "Change data capture"
      }
    ]
  },
  {
    name: "Security Stack",
    icon: Shield,
    components: [
      {
        label: "ENCRYPTION",
        tech: "AES-256 + TLS 1.3",
        description: "Data at rest and in transit"
      },
      {
        label: "AUTH",
        tech: "OAuth 2.0 + JWT",
        description: "Secure authentication"
      },
      {
        label: "PRIVACY",
        tech: "Differential Privacy + Federated Learning",
        description: "Privacy-preserving ML"
      },
      {
        label: "COMPLIANCE",
        tech: "HIPAA + GDPR + SOC 2",
        description: "Healthcare compliance"
      }
    ]
  }
];

export function TechnicalArchitecture() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-[2rem] font-bold text-carbon tracking-tight mb-2">
          Technical Architecture
        </h2>
        <p className="text-body text-ash mb-4">
          Enterprise-grade infrastructure powering Nova
        </p>
        <Badge className="bg-accent text-white">
          <Server className="w-3 h-3 mr-1" />
          Production-Ready Stack
        </Badge>
      </div>

      <div className="space-y-6">
        {architecture.map((stack, index) => (
          <Card key={index} className="border-mist/30 hover:shadow-xl transition-all">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                  <stack.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-[1.5rem] font-semibold text-carbon tracking-tight">
                  {stack.name}
                </h3>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stack.components.map((component, compIndex) => (
                  <div 
                    key={compIndex}
                    className="p-4 bg-gradient-to-br from-pearl/50 to-mist/30 rounded-xl"
                  >
                    <div className="text-caption font-bold text-accent uppercase tracking-wider mb-2">
                      {component.label}
                    </div>
                    <div className="text-sm font-semibold text-carbon mb-2">
                      {component.tech}
                    </div>
                    <div className="text-xs text-ash">
                      {component.description}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-carbon/10 bg-gradient-to-br from-carbon to-slate text-ivory">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-ivory flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold mb-2">Enterprise Security & Compliance</p>
              <p className="text-sm text-pearl/90 leading-relaxed">
                All infrastructure components are designed with security-first principles, meeting HIPAA, GDPR, and SOC 2 compliance standards. Data encryption, privacy-preserving machine learning, and secure authentication ensure your health data remains protected at all times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
