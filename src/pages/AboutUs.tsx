import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Shield, Award, Microscope, Leaf, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const values = [
    {
      icon: Microscope,
      title: "Science-Backed",
      description: "Every product is based on real research and clinical studies—not marketing hype.",
    },
    {
      icon: Shield,
      title: "Quality First",
      description: "Third-party tested for purity, potency, and safety. We don't compromise.",
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      description: "No artificial rubbish, fillers, or harmful substances. Just what works.",
    },
    {
      icon: Heart,
      title: "Customer-Focused",
      description: "Your wellness journey matters to us. We're here to support you every step of the way.",
    },
  ];

  const standards = [
    "Third-party tested for purity and potency",
    "GMP certified manufacturing facilities",
    "Sustainable and ethical sourcing",
    "Transparent ingredient labeling",
    "NSF Certified for Sport",
    "Informed-Sport certified products",
  ];

  const team = [
    {
      name: "Sage",
      role: "Founder & CEO",
      image: "/src/assets/expert-2.jpg",
      bio: "Serial entrepreneur with sports science background. Founded NeuroState® to make elite performance tools accessible to everyone.",
    },
    {
      name: "Dr. Sarah Mitchell",
      role: "Chief Scientific Officer",
      image: "/src/assets/expert-1.jpg",
      bio: "PhD in Nutritional Biochemistry with 15+ years researching human performance optimization.",
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Head of Product Development",
      image: "/src/assets/expert-3.jpg",
      bio: "Integrative medicine specialist focused on evidence-based supplementation and recovery protocols.",
    },
    {
      name: "James Thompson",
      role: "Director of Quality Assurance",
      image: "/src/assets/expert-4.jpg",
      bio: "20+ years ensuring product safety and efficacy in the nutraceutical industry.",
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 border-b border-mist">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-[2.25rem] md:text-[3rem] font-normal tracking-tight text-carbon" style={{ lineHeight: '1.2' }}>
                Making elite performance accessible to everyone
              </h1>
              <p className="text-[1rem] text-ash">
                Science-backed supplements and recovery tools that actually work
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-[1.5rem] font-normal text-carbon mb-8">Our mission</h2>
              <p className="text-[0.9375rem] text-ash leading-relaxed mb-6">
                At NeuroState, the best performance tools and supplements shouldn't just
                be for elite athletes or wealthy people—they should be available to everyone, everywhere.
                Our mission is simple: make the world's best recovery technologies and supplements accessible
                and affordable for anyone who wants to feel and perform better.
              </p>
              <p className="text-[0.9375rem] text-ash leading-relaxed">
                Transparency and quality. Every product we offer is carefully chosen,
                properly tested, and made available to anyone looking to improve their physical and mental
                wellbeing.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-[1.875rem] font-semibold text-center mb-12" style={{ lineHeight: '1.3' }}>Our Story</h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  NeuroState was founded in 2025 by Sage, a serial entrepreneur with a sports science
                  background. For years, Sage struggled with burnout, chronic fatigue, and low energy.
                  Then Sage discovered advanced recovery tools and proper supplements—and everything changed.
                </p>
                
                <p>
                  But here's the problem: finding these solutions was incredibly difficult. The best recovery
                  technologies and quality supplements were expensive, complicated, and often only available
                  to professional athletes or people with deep pockets. That didn't seem right.
                </p>
                
                <p>
                  That's why NeuroState exists. We've partnered with leading scientists and manufacturers
                  to make these tools accessible to everyone. No gatekeeping. No exclusive clubs. Just
                  quality products at fair prices, available to anyone who wants to feel better and perform
                  at their best.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 bg-ivory border-t border-b border-mist">
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-[1.5rem] font-normal text-carbon text-center mb-12 md:mb-16">Our core values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
              {values.map((value, index) => {
                return (
                  <div key={index} className="text-center">
                    <h3 className="text-[1.125rem] font-normal text-carbon mb-3">{value.title}</h3>
                    <p className="text-[0.875rem] text-ash">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 lg:py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Award className="h-8 w-8 text-primary" />
                <h2 className="text-[1.875rem] font-semibold" style={{ lineHeight: '1.3' }}>The NeuroState® Standard</h2>
              </div>
              <p className="text-lg text-muted-foreground text-center mb-10">
                We hold ourselves to the highest standards. Here's what that means for every product we offer:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {standards.map((standard, index) => (
                  <div key={index} className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-light">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-[1.875rem] font-semibold" style={{ lineHeight: '1.3' }}>Ready to feel your best?</h2>
              
              <p className="text-lg text-muted-foreground">
                Join thousands of people who trust NeuroState for their supplements and recovery
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop products
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn more
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
