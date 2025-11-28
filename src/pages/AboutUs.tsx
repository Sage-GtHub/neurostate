import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Shield, Award, Microscope, Leaf, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AboutUs = () => {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: missionRef, isVisible: missionVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: valuesRef, isVisible: valuesVisible } = useScrollAnimation({ threshold: 0.2 });
  
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
      <div className="min-h-screen bg-white">
        <section ref={heroRef} className={`py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 border-b border-mist transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-[2.25rem] md:text-[3rem] font-light tracking-tight text-carbon" style={{ lineHeight: '1.2' }}>
                Peak performance for everyone
              </h1>
              <p className="text-[1rem] text-ash font-light">
                Proper recovery tech and supplements shouldn't just be for pros. We're making them accessible.
              </p>
            </div>
          </div>
        </section>

        <section ref={missionRef} className={`py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 transition-all duration-1000 ${missionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-[1.5rem] font-light text-carbon mb-8">What we're about</h2>
              <p className="text-[0.9375rem] text-ash font-light leading-relaxed mb-6">
                Elite recovery tools and proper supplements have been gatekept for too long. They're expensive, hard to find, and mostly reserved for pros or people with money. That's rubbish.
              </p>
              <p className="text-[0.9375rem] text-ash font-light leading-relaxed">
                We're fixing that. Transparent pricing, proper testing, quality products—available to anyone who wants to perform better and feel good doing it.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-20 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-[1.875rem] font-light text-center mb-12 text-carbon" style={{ lineHeight: '1.3' }}>How it started</h2>
              
              <div className="space-y-6 text-lg text-ash font-light leading-relaxed">
                <p>
                  Sage started NeuroState in 2025 after years of battling burnout and chronic fatigue. Sports science background, serial entrepreneur, but none of that mattered when energy tanked.
                </p>
                
                <p>
                  Then came the breakthrough—proper recovery tools and quality supplements. Game-changer. But finding them? Nightmare. Overpriced, hidden behind paywalls, only for pros or people with deep pockets.
                </p>
                
                <p>
                  So we built NeuroState. Partnered with scientists and manufacturers to make these tools accessible. No gatekeeping. No exclusive clubs. Just quality gear at fair prices for anyone who wants to feel better.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={valuesRef} className={`py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 bg-white border-t border-b border-mist transition-all duration-1000 ${valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <h2 className="text-[1.5rem] font-light text-carbon text-center mb-12 md:mb-16">What matters to us</h2>
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
        <section className="py-16 lg:py-20 bg-pearl">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Award className="h-8 w-8 text-carbon" />
                <h2 className="text-[1.875rem] font-light text-carbon" style={{ lineHeight: '1.3' }}>The NeuroState Standard</h2>
              </div>
              <p className="text-lg text-ash font-light text-center mb-10">
                Every product meets these standards. No exceptions.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {standards.map((standard, index) => (
                  <div key={index} className="flex items-start gap-3 p-4">
                    <CheckCircle2 className="h-5 w-5 text-carbon flex-shrink-0 mt-0.5" />
                    <span className="text-ash font-light">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-[1.875rem] font-light text-carbon" style={{ lineHeight: '1.3' }}>Ready to feel better?</h2>
              
              <p className="text-lg text-ash font-light">
                Join thousands using NeuroState for proper recovery and performance
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
