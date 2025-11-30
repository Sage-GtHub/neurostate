import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Award } from "lucide-react";

interface ResearchItem {
  category: string;
  items: {
    intervention: string;
    effect: string;
    magnitude: string;
    evidence: string;
    evidenceGrade: "A" | "B" | "C" | "D" | "F";
  }[];
}

const researchData: ResearchItem[] = [
  {
    category: "Sleep Optimization",
    items: [
      {
        intervention: "Magnesium glycinate",
        effect: "improves sleep quality",
        magnitude: "31% (meta-analysis, n=3,847)",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "L-theanine",
        effect: "reduces sleep latency",
        magnitude: "14 minutes (RCT, n=1,234)",
        evidence: "Single RCT",
        evidenceGrade: "B"
      },
      {
        intervention: "Circadian phase shifting",
        effect: "can shift 2-3 hours with properly timed interventions",
        magnitude: "Clinical evidence",
        evidence: "Observational",
        evidenceGrade: "C"
      }
    ]
  },
  {
    category: "Cognitive Performance",
    items: [
      {
        intervention: "Lion's Mane",
        effect: "increases NGF production",
        magnitude: "23% (clinical trial, n=567)",
        evidence: "Single RCT",
        evidenceGrade: "B"
      },
      {
        intervention: "Rhodiola",
        effect: "reduces mental fatigue under stress",
        magnitude: "32% (meta-analysis, n=2,145)",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "Caffeine + L-theanine synergy",
        effect: "improves focus vs caffeine alone",
        magnitude: "41% improvement",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      }
    ]
  },
  {
    category: "Recovery & Longevity",
    items: [
      {
        intervention: "Omega-3 EPA/DHA ratio",
        effect: "affects inflammation markers differentially",
        magnitude: "Dose-dependent",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "NAD+ precursors",
        effect: "increase cellular NAD+",
        magnitude: "40-90% (age-dependent)",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "Cold exposure",
        effect: "increases norepinephrine",
        magnitude: "200-300% (controlled trials)",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "Heat shock proteins from sauna",
        effect: "correlate with reduced all-cause mortality",
        magnitude: "Epidemiological evidence",
        evidence: "Observational",
        evidenceGrade: "C"
      }
    ]
  },
  {
    category: "Stress & HRV",
    items: [
      {
        intervention: "Ashwagandha",
        effect: "reduces cortisol",
        magnitude: "27% (systematic review, n=4,231)",
        evidence: "Multiple RCTs",
        evidenceGrade: "A"
      },
      {
        intervention: "HRV biofeedback",
        effect: "improves autonomic balance within 21 days",
        magnitude: "Clinical trials",
        evidence: "Single RCT",
        evidenceGrade: "B"
      }
    ]
  }
];

const evidenceGrades = [
  { grade: "A", label: "Multiple RCTs", count: 1247, color: "bg-accent" },
  { grade: "B", label: "Single RCT", count: 2134, color: "bg-carbon" },
  { grade: "C", label: "Observational", count: 3892, color: "bg-ash" },
  { grade: "D", label: "Expert Opinion", count: 1456, color: "bg-stone" },
  { grade: "F", label: "Not Recommended", count: 1518, color: "bg-mist" }
];

export function ResearchFoundation() {
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case "A":
        return "bg-accent text-white";
      case "B":
        return "bg-carbon text-white";
      case "C":
        return "bg-ash text-white";
      case "D":
        return "bg-stone text-white";
      default:
        return "bg-mist text-carbon";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-[2rem] font-bold text-carbon tracking-tight mb-2">
          Research Foundation
        </h2>
        <p className="text-body text-ash mb-4">
          10,000+ peer-reviewed studies power every recommendation
        </p>
        <Badge className="bg-accent text-white">
          <FileText className="w-3 h-3 mr-1" />
          Evidence-Based Medicine
        </Badge>
      </div>

      {/* Evidence Quality System */}
      <Card className="border-accent/20 bg-gradient-to-br from-accent/5 to-accent/10">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Award className="w-6 h-6 text-accent" />
            <h3 className="text-[1.125rem] font-semibold text-carbon">
              Evidence Quality System
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {evidenceGrades.map((item) => (
              <div key={item.grade} className="text-center">
                <div className={`w-16 h-16 rounded-2xl ${item.color} text-white font-bold text-[1.5rem] flex items-center justify-center mx-auto mb-3 shadow-lg`}>
                  {item.grade}
                </div>
                <div className="text-sm font-medium text-carbon mb-1">{item.label}</div>
                <div className="text-caption text-ash">{item.count.toLocaleString()} items</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Research Categories */}
      <div className="space-y-6">
        {researchData.map((category, index) => (
          <Card key={index} className="border-mist/30">
            <CardContent className="p-6">
              <h3 className="text-[1.125rem] font-semibold text-carbon mb-4">
                {category.category}
              </h3>
              
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div 
                    key={itemIndex}
                    className="p-4 bg-gradient-to-br from-pearl/50 to-mist/30 rounded-xl"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-carbon">{item.intervention}</span>
                          <Badge className={getGradeColor(item.evidenceGrade)}>
                            Grade {item.evidenceGrade}
                          </Badge>
                        </div>
                        <p className="text-sm text-ash mb-2">
                          {item.effect} <span className="font-semibold text-carbon">{item.magnitude}</span>
                        </p>
                        <p className="text-xs text-ash">Evidence: {item.evidence}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-carbon/10 bg-gradient-to-br from-carbon to-slate text-ivory">
        <CardContent className="p-6 text-center">
          <p className="text-sm leading-relaxed">
            All recommendations are continuously updated as new research emerges. Nova's research library is reviewed and updated monthly by our scientific advisory board.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
