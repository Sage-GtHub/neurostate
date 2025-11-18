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
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                About NeuroState®
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Making Elite Performance Accessible to Everyone
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're here to help you perform at your best with science-backed supplements and recovery
                tools that actually work—without the ridiculous price tags.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Target className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed text-center mb-6">
                At NeuroState®, we believe that the best performance tools and supplements shouldn't just
                be for elite athletes or wealthy people—they should be available to everyone, everywhere.
                Our mission is simple: make the world's best recovery technologies and supplements accessible
                and affordable for anyone who wants to feel and perform better.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                We're all about transparency and quality. Every product we offer is carefully chosen,
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
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Story</h2>
              
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  NeuroState® was founded in 2025 by Sage, a serial entrepreneur with a sports science
                  background. For years, Sage struggled with burnout, chronic fatigue, and low energy.
                  It wasn't easy. Then Sage discovered advanced recovery tools and proper supplements—
                  and everything changed.
                </p>
                
                <p>
                  But here's the problem: finding these solutions was incredibly difficult. The best recovery
                  technologies and quality supplements were expensive, complicated, and often only available
                  to professional athletes or people with deep pockets. That didn't seem right.
                </p>
                
                <p>
                  That's why NeuroState® exists. We've partnered with leading scientists and manufacturers
                  to make these tools accessible to everyone. No gatekeeping. No exclusive clubs. Just
                  quality products at fair prices, available to anyone who wants to feel better and perform
                  at their best.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="text-center p-6">
                    <div className="flex justify-center">
                      <div className="p-3 rounded-full bg-accent/10">
                        <Icon className="h-8 w-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mt-4 mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground font-light">{value.description}</p>
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
                <h2 className="text-3xl md:text-4xl font-bold">The NeuroState® Standard</h2>
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
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Feel Your Best?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of people who trust NeuroState® for their supplements and recovery needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/">
                  <Button size="lg" className="w-full sm:w-auto">
                    Shop Products
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Learn More
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
