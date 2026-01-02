import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Microscope, Brain, Clock, Target, Lightbulb, Users, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Research & Life Sciences",
  slug: "research-life-sciences",
  headline: "Cognitive infrastructure for discovery teams.",
  subheadline: "Breakthrough research requires sustained deep thinking. NeuroState helps R&D teams protect the cognitive conditions that enable innovation.",
  heroStats: [
    { value: "16%", label: "Average turnover" },
    { value: "18%", label: "Productivity loss" },
    { value: "2.6x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "The cognitive conditions for discovery",
    paragraphs: [
      "Research and discovery require a specific cognitive state that modern work environments systematically undermine. Breakthrough insights emerge from sustained concentration, incubation periods, and the mental space to connect disparate ideas. Grant deadlines, publication pressure, and administrative burden fragment attention and deplete the cognitive resources innovation requires.",
      "Laboratory environments add physical demands to cognitive load. Long hours standing, precise motor control, and sustained vigilance for safety create compound fatigue that desk-based wellness programmes do not address.",
      "The principal investigator model creates particular cognitive risks. Senior researchers simultaneously manage teams, pursue funding, teach, and conduct their own research. This cognitive fragmentation prevents the sustained focus their expertise makes most valuable."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Academic wellness ignores research-specific cognitive demands",
    failures: [
      { point: "Deep work is not protected", explanation: "Generic programmes do not address the specific need for extended uninterrupted concentration that complex research requires." },
      { point: "Grant cycle cognitive burden is invisible", explanation: "The intense cognitive demands of funding cycles are treated as inevitable rather than manageable." },
      { point: "Laboratory physical demands are overlooked", explanation: "Wellness programmes designed for desk work miss the physical-cognitive compound load of lab environments." },
      { point: "Academic culture discourages wellness engagement", explanation: "Research cultures that valorise overwork create stigma around cognitive support." }
    ]
  },
  howNeuroStateApplies: {
    title: "Protecting the cognitive conditions for breakthrough",
    paragraphs: [
      "NeuroState provides infrastructure specifically designed for research environments. Deep work protection, grant cycle preparation, and laboratory-specific protocols address the actual patterns of research work.",
      "The system helps research leaders balance competing demands: teaching, administration, mentoring, and their own scholarship. By making cognitive trade-offs visible, it enables better decisions about where to invest limited attention."
    ],
    workflows: [
      { title: "Grant submission preparation", description: "Build cognitive reserves ahead of funding deadlines. Protect the concentration required for compelling proposals." },
      { title: "Laboratory scheduling optimisation", description: "Align cognitively demanding protocols with peak performance windows." },
      { title: "Thesis completion support", description: "Sustain doctoral candidates through intensive writing and defence periods." }
    ]
  },
  relevantSignals: [
    { name: "Deep focus availability", description: "Tracks presence and duration of uninterrupted concentration blocks.", importance: "Complex research requires extended focus. Fragmented time cannot substitute." },
    { name: "Grant cycle stress patterns", description: "Monitors cognitive impact of funding deadlines.", importance: "Grant stress creates predictable cognitive peaks that can be managed." },
    { name: "Laboratory fatigue markers", description: "Tracks compound physical-cognitive load from lab work.", importance: "Lab environments create unique depletion patterns." }
  ],
  executiveOutcomes: [
    { title: "Research output consistency", description: "Protect the cognitive conditions that enable sustained high-quality research output." },
    { title: "Senior researcher retention", description: "Principal investigators represent irreplaceable expertise. Protecting their cognitive sustainability protects institutional capability." },
    { title: "Graduate student completion rates", description: "Doctoral attrition often reflects cognitive unsustainability. Support improves completion." }
  ],
  challenges: [
    { title: "Deep work fragmentation", description: "Complex research problems require extended concentration that modern work environments systematically interrupt." },
    { title: "Publication and grant pressure", description: "Deadline-driven cycles create cognitive peaks that erode long-term research quality." },
    { title: "Experiment fatigue", description: "Laboratory work combines cognitive, physical, and emotional demands in patterns unique to research." }
  ],
  capabilities: [
    { icon: Brain, title: "Deep work optimisation", description: "Identify and protect optimal windows for complex cognitive tasks across research teams." },
    { icon: Clock, title: "Experiment scheduling", description: "Align cognitively demanding protocols with peak performance windows." },
    { icon: Target, title: "Grant cycle preparation", description: "Build cognitive reserves ahead of predictable high-intensity submission periods." },
    { icon: Lightbulb, title: "Innovation capacity tracking", description: "Monitor the cognitive conditions that correlate with creative breakthrough." }
  ],
  outcomes: [
    { metric: "29%", label: "More focus time" },
    { metric: "22%", label: "Better output" },
    { metric: "35%", label: "Reduced burnout" },
    { metric: "2.6x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Clinical trial coordination", description: "Maintain team cognitive performance across multi-year trial cycles." },
    { title: "Lab team scheduling", description: "Optimise rotation and coverage for 24/7 experimental monitoring requirements." },
    { title: "Thesis completion support", description: "Protect doctoral candidates during intensive writing and defence periods." },
    { title: "PI resilience", description: "Sustain principal investigator performance across teaching, research, and administrative demands." }
  ],
  defaultIndustry: "healthcare" as const,
};

export default function ResearchLifeSciences() {
  return <IndustryPageTemplate industry={industryData} />;
}