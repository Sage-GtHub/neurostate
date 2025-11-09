import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Shield, Users, Award, Microscope, Leaf, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const values = [
    {
      icon: Microscope,
      title: "Science-Backed",
      description: "Every product is formulated based on peer-reviewed research and clinical studies.",
    },
    {
      icon: Shield,
      title: "Quality First",
      description: "Third-party tested for purity, potency, and safety. No compromises.",
    },
    {
      icon: Leaf,
      title: "Clean Ingredients",
      description: "Free from artificial additives, fillers, and harmful substances.",
    },
    {
      icon: Heart,
      title: "Customer-Centric",
      description: "Your wellness journey is our priority. We're here to support you every step.",
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
      name: "Dr. Sarah Mitchell",
      role: "Chief Scientific Officer",
      image: "/src/assets/expert-1.jpg",
      bio: "PhD in Nutritional Biochemistry with 15+ years researching human performance optimization.",
    },
    {
      name: "Marcus Chen",
      role: "Founder & CEO",
      image: "/src/assets/expert-2.jpg",
      bio: "Former professional athlete turned wellness entrepreneur, dedicated to making elite performance accessible.",
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
        <section className="relative bg-gradient-to-br from-primary/5 via-background to-accent/5 border-b">
          <div className="container mx-auto px-4 py-16 lg:py-24">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <Badge variant="secondary" className="mb-4">
                About NeuroState®
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Redefining Human Performance Through Science
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We're on a mission to help you unlock your full potential with evidence-based supplements
                and recovery tools trusted by elite athletes and health professionals worldwide.
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
                At NeuroState®, we believe that peak performance isn't reserved for elite athletes—it's
                achievable for everyone. Our mission is to bridge the gap between cutting-edge sports science
                and everyday wellness, making premium-quality supplements and recovery technologies accessible
                to all who seek to optimize their physical and mental performance.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed text-center">
                We're committed to transparency, quality, and your long-term health. Every product we create
                is backed by research, tested by experts, and trusted by those who demand excellence.
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
                  NeuroState® was founded in 2018 by Marcus Chen, a former professional triathlete who
                  experienced firsthand the transformative power of proper nutrition and recovery. After
                  struggling to find supplements that met his standards for quality and efficacy, Marcus
                  assembled a team of world-class scientists, physicians, and industry experts to create
                  something better.
                </p>
                
                <p>
                  What started in a small lab has grown into a movement. Today, NeuroState® products are
                  trusted by Olympic athletes, military personnel, healthcare professionals, and everyday
                  individuals committed to optimizing their health. Our products are found in training
                  facilities, clinics, and homes across 40+ countries.
                </p>
                
                <p>
                  But we've never lost sight of our founding principle: quality over everything. Every
                  ingredient is carefully sourced, every formula is rigorously tested, and every product
                  is manufactured to the highest standards. We don't just meet industry standards—we set them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Core Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6 pb-6 space-y-4">
                      <div className="flex justify-center">
                        <div className="p-3 rounded-full bg-primary/10">
                          <Icon className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
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
                We hold ourselves to the highest standards in the industry. Here's what that means for every
                product we create:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {standards.map((standard, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{standard}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Users className="h-8 w-8 text-primary" />
                <h2 className="text-3xl md:text-4xl font-bold">Meet Our Team</h2>
              </div>
              <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
                Our team brings together decades of experience in sports science, nutrition, medicine, and
                product development—all united by a shared passion for human optimization.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-4 pb-6">
                      <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                      <p className="text-sm text-primary mb-3">{member.role}</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 to-accent/10 border-t">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Optimize Your Performance?
              </h2>
              <p className="text-lg text-muted-foreground">
                Join thousands of athletes, professionals, and wellness enthusiasts who trust NeuroState®
                for their supplementation and recovery needs.
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
