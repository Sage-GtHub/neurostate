import { IndustryPageTemplate } from "@/components/IndustryPageTemplate";
import { Microscope, Brain, Clock, Target, Lightbulb, Users, AlertTriangle } from "lucide-react";

const industryData = {
  name: "Research & Life Sciences",
  slug: "research-life-sciences",
  headline: "Protect the thinking time that drives discovery.",
  subheadline: "Breakthrough research needs sustained deep thinking. NeuroState helps R&D teams protect the conditions that make innovation possible.",
  heroStats: [
    { value: "16%", label: "Average turnover" },
    { value: "18%", label: "Productivity loss" },
    { value: "2.6x", label: "Typical ROI" },
  ],
  industryProblem: {
    title: "Modern work environments undermine the thinking research requires",
    paragraphs: [
      "Breakthrough insights come from sustained concentration, incubation time, and the mental space to connect ideas. Grant deadlines, publication pressure, and administrative burden fragment attention and drain the energy that innovation requires.",
      "Lab work adds physical demands on top of mental ones. Long hours standing, precise motor control, and constant safety vigilance create compound tiredness that desk-based wellness programmes do not address.",
      "Senior researchers face a particular problem. They simultaneously manage teams, chase funding, teach, and try to do their own research. This fragmentation prevents the sustained focus their expertise makes most valuable."
    ]
  },
  whyExistingSolutionsFail: {
    title: "Academic wellness ignores research realities",
    failures: [
      { point: "Deep thinking time is not protected", explanation: "Generic programmes do not address the specific need for extended, uninterrupted concentration that complex research demands." },
      { point: "Grant cycle pressure is treated as inevitable", explanation: "The intense demands of funding cycles are accepted rather than managed. They can be planned for and made less damaging." },
      { point: "Lab work is overlooked", explanation: "Wellness programmes designed for desk work miss the physical-mental compound tiredness of laboratory environments." },
      { point: "Academic culture stigmatises asking for help", explanation: "Research cultures that celebrate overwork create stigma around seeking support." }
    ]
  },
  howNeuroStateApplies: {
    title: "Protecting the conditions for breakthrough work",
    paragraphs: [
      "NeuroState provides tools specifically designed for research environments. Deep work protection, grant cycle preparation, and lab-specific recovery plans address the actual patterns of research work.",
      "The system helps research leaders balance competing demands — teaching, administration, mentoring, and their own scholarship. By making the trade-offs visible, it enables better decisions about where to invest limited energy."
    ],
    workflows: [
      { title: "Grant submission preparation", description: "Build energy reserves ahead of funding deadlines. Protect the concentration needed for compelling proposals." },
      { title: "Lab scheduling", description: "Schedule demanding experimental work when people are at their sharpest." },
      { title: "Thesis support", description: "Help doctoral candidates sustain their energy through intensive writing and defence periods." }
    ]
  },
  relevantSignals: [
    { name: "Deep focus availability", description: "How much uninterrupted concentration time researchers actually get.", importance: "Complex research needs extended focus. Fragmented time cannot substitute." },
    { name: "Grant cycle stress", description: "How funding deadlines affect energy and health.", importance: "Grant stress creates predictable peaks that can be managed proactively." },
    { name: "Lab fatigue", description: "The combined physical and mental load from laboratory work.", importance: "Lab environments create unique tiredness patterns that need specific recovery approaches." }
  ],
  executiveOutcomes: [
    { title: "Consistent research output", description: "Protect the conditions that enable sustained high-quality research." },
    { title: "Keep senior researchers", description: "Principal investigators represent irreplaceable expertise. Protecting their health protects institutional capability." },
    { title: "Better graduate completion rates", description: "Doctoral student attrition often reflects unsustainable demands. Support improves completion." }
  ],
  challenges: [
    { title: "Fragmented thinking time", description: "Complex research problems need extended concentration that modern work environments constantly interrupt." },
    { title: "Publication and grant pressure", description: "Deadline-driven cycles create intense peaks that erode long-term research quality." },
    { title: "Lab tiredness", description: "Laboratory work combines mental, physical, and emotional demands in patterns unique to research." }
  ],
  capabilities: [
    { icon: Brain, title: "Deep work protection", description: "Identify and protect the best windows for complex thinking across research teams." },
    { icon: Clock, title: "Experiment scheduling", description: "Schedule demanding work when people are at their sharpest." },
    { icon: Target, title: "Grant cycle preparation", description: "Build energy reserves ahead of predictable high-intensity submission periods." },
    { icon: Lightbulb, title: "Innovation conditions", description: "Track the health conditions that correlate with creative breakthrough." }
  ],
  outcomes: [
    { metric: "29%", label: "More focus time" },
    { metric: "22%", label: "Better output" },
    { metric: "35%", label: "Less burnout" },
    { metric: "2.6x", label: "ROI Year 1" },
  ],
  useCases: [
    { title: "Clinical trial coordination", description: "Keep team performance consistent across multi-year trial cycles." },
    { title: "Lab team scheduling", description: "Design rotation and coverage for 24/7 experimental monitoring." },
    { title: "Thesis completion support", description: "Support doctoral candidates during intensive writing and defence periods." },
    { title: "PI resilience", description: "Sustain principal investigator performance across teaching, research, and administrative demands." }
  ],
  defaultIndustry: "healthcare" as const,
};

export default function ResearchLifeSciences() {
  return <IndustryPageTemplate industry={industryData} />;
}
