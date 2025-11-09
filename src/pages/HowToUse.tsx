import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Droplets, Moon, Sun, Utensils, Brain, Search } from "lucide-react";
import { useState } from "react";
import omega3Image from "@/assets/omega3-elite.jpg";
import neurofocusImage from "@/assets/neurofocus-cognitive.jpg";
import restoreSleepImage from "@/assets/restoresleep-night.jpg";
import marineCollagenImage from "@/assets/marine-collagen.jpg";
import traceMineral from "@/assets/trace-mineral.jpg";
import adaptBalanceImage from "@/assets/adaptbalance-stress.jpg";
import redRestoreProImage from "@/assets/redrestore-pro-panel.jpg";
import redRestoreMiniImage from "@/assets/redrestore-mini.jpg";
import cryoPlungeImage from "@/assets/cryoplunge-ice-bath.jpg";

const HowToUse = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const guides = [
    {
      category: "Supplements",
      icon: Droplets,
      products: [
        {
          name: "Omega-3 Elite",
          image: omega3Image,
          timing: "Best taken with meals",
          dosage: "2 capsules daily",
          tips: [
            "Take with your largest meal for optimal absorption",
            "Consistent daily use yields best results",
            "Store in a cool, dry place away from sunlight",
            "Can be taken morning or evening based on preference",
          ],
          bestPractices: [
            "Pair with vitamin D for enhanced benefits",
            "Take with fat-containing meals to improve absorption",
            "Don't exceed recommended dosage without consulting a healthcare provider",
          ],
        },
        {
          name: "NeuroFocus™ Cognitive",
          image: neurofocusImage,
          timing: "Morning or early afternoon",
          dosage: "2 capsules daily",
          tips: [
            "Take 30 minutes before you need peak mental performance",
            "Best on an empty stomach for faster absorption",
            "Avoid taking late in the day as it may affect sleep",
            "Stay hydrated throughout the day",
          ],
          bestPractices: [
            "Cycle 5 days on, 2 days off for sustained effectiveness",
            "Combine with proper sleep and nutrition",
            "Start with 1 capsule to assess tolerance",
          ],
        },
        {
          name: "RestoreSleep™ Night",
          image: restoreSleepImage,
          timing: "30-60 minutes before bed",
          dosage: "2 capsules nightly",
          tips: [
            "Take consistently at the same time each night",
            "Avoid screens and bright lights after taking",
            "Create a relaxing bedtime routine",
            "Effects typically felt within 30-45 minutes",
          ],
          bestPractices: [
            "Don't combine with alcohol or other sedatives",
            "Ensure you have 7-8 hours for sleep",
            "May cause morning grogginess if taken too late",
          ],
        },
        {
          name: "Marine Collagen",
          image: marineCollagenImage,
          timing: "Morning on empty stomach",
          dosage: "1 scoop (10g) daily",
          tips: [
            "Mix with cold or room temperature liquids",
            "Can be added to coffee, smoothies, or water",
            "Best absorbed on an empty stomach",
            "Consistent use for 4-8 weeks shows visible results",
          ],
          bestPractices: [
            "Pair with vitamin C for enhanced collagen synthesis",
            "Stay well-hydrated throughout the day",
            "Take at least 30 minutes before breakfast",
          ],
        },
        {
          name: "Trace Mineral Complex",
          image: traceMineral,
          timing: "With breakfast or lunch",
          dosage: "4 capsules daily",
          tips: [
            "Take with food to minimize digestive discomfort",
            "Split dosage: 2 morning, 2 afternoon if preferred",
            "Best absorbed when taken with meals",
            "Supports hydration - drink plenty of water",
          ],
          bestPractices: [
            "Don't take with coffee or tea (reduces absorption)",
            "Space out from other supplements by 1-2 hours",
            "Consistent daily use is key for replenishing mineral stores",
          ],
        },
        {
          name: "AdaptBalance™ Stress",
          image: adaptBalanceImage,
          timing: "Morning and afternoon",
          dosage: "1 capsule twice daily",
          tips: [
            "Take first dose in morning, second in afternoon",
            "Can be taken with or without food",
            "Allow 2-3 weeks for full adaptogenic effects",
            "Best for ongoing stress management",
          ],
          bestPractices: [
            "Don't take late in evening as it may boost energy",
            "Combine with stress-reduction practices (meditation, exercise)",
            "Cycle 4-6 weeks on, 1-2 weeks off",
          ],
        },
      ],
    },
    {
      category: "Recovery Devices",
      icon: Brain,
      products: [
        {
          name: "RedRestore™ Pro Panel",
          image: redRestoreProImage,
          timing: "Morning or evening sessions",
          dosage: "10-20 minutes per session",
          tips: [
            "Position 6-12 inches from targeted area",
            "Use protective eyewear during facial treatments",
            "Start with 10-minute sessions, build to 20",
            "Skin should feel warm but not hot",
          ],
          bestPractices: [
            "Use 3-5 times per week for muscle recovery",
            "Daily use safe for skin rejuvenation",
            "Hydrate well before and after sessions",
            "Clean device regularly with soft, dry cloth",
          ],
        },
        {
          name: "RedRestore™ Mini",
          image: redRestoreMiniImage,
          timing: "Anytime, anywhere",
          dosage: "10-15 minutes per area",
          tips: [
            "Perfect for targeted spot treatment",
            "Use on joints, muscles, or face",
            "Portable for travel or office use",
            "Battery lasts for multiple sessions",
          ],
          bestPractices: [
            "Charge fully before first use",
            "Move device slowly across treatment area",
            "Can be used daily on different areas",
            "Store in protective case when not in use",
          ],
        },
        {
          name: "CryoPlunge™ Ice Bath",
          image: cryoPlungeImage,
          timing: "Post-workout or morning routine",
          dosage: "2-10 minutes per session",
          tips: [
            "Start with 2-3 minutes, gradually increase",
            "Temperature: 10-15°C (50-59°F) for beginners",
            "Breathe deeply and steadily throughout",
            "Have warm towels ready for after",
          ],
          bestPractices: [
            "Don't plunge on a full stomach",
            "Post-workout timing ideal for recovery",
            "Limit to 3-4 sessions per week",
            "Warm up gradually after cold exposure",
          ],
        },
      ],
    },
  ];

  // Filter products based on search query
  const filteredGuides = guides.map(guide => ({
    ...guide,
    products: guide.products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(guide => guide.products.length > 0);

  const hasResults = filteredGuides.some(guide => guide.products.length > 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                How to Use Our Products
              </h1>
              <p className="text-lg text-muted-foreground">
                Get the most from your wellness products with our detailed usage guides, 
                dosage recommendations, and expert tips.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Tips Section */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Consistency is Key</h3>
                <p className="text-sm text-muted-foreground">
                  Most products work best with daily, consistent use over time
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Utensils className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Timing Matters</h3>
                <p className="text-sm text-muted-foreground">
                  Follow timing recommendations for optimal absorption and effects
                </p>
              </Card>
              <Card className="p-6 text-center">
                <Droplets className="h-10 w-10 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Stay Hydrated</h3>
                <p className="text-sm text-muted-foreground">
                  Drink plenty of water throughout the day to support absorption
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Product Guides */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Search Bar */}
              <div className="mb-12">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for a product guide (e.g., Omega-3, Collagen, Red Light...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg"
                  />
                </div>
                {searchQuery && (
                  <p className="text-center text-sm text-muted-foreground mt-3">
                    {hasResults 
                      ? `Found ${filteredGuides.reduce((sum, guide) => sum + guide.products.length, 0)} guide${filteredGuides.reduce((sum, guide) => sum + guide.products.length, 0) !== 1 ? 's' : ''} for "${searchQuery}"`
                      : `No guides found for "${searchQuery}". Try a different search term.`
                    }
                  </p>
                )}
              </div>

              <Tabs defaultValue="supplements" className="w-full">
                {!searchQuery && (
                  <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
                    <TabsTrigger value="supplements">Supplements</TabsTrigger>
                    <TabsTrigger value="devices">Recovery Devices</TabsTrigger>
                  </TabsList>
                )}

                {searchQuery ? (
                  // Show search results without tabs
                  <div className="space-y-8">
                    {hasResults ? (
                      filteredGuides.map((guide) =>
                        guide.products.map((product) => (
                          <Card key={product.name} className="p-8">
                            <div className="flex flex-col md:flex-row gap-6 mb-6">
                              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-start gap-3 mb-3">
                                  <guide.icon className="h-8 w-8 text-primary flex-shrink-0" />
                                  <h2 className="text-2xl font-bold">{product.name}</h2>
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{product.timing}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Droplets className="h-4 w-4 text-muted-foreground" />
                                    <span className="text-muted-foreground">{product.dosage}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mt-6">
                              <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                  <Sun className="h-5 w-5 text-primary" />
                                  Usage Tips
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {product.tips.map((tip, idx) => (
                                    <li key={idx}>• {tip}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                  <Moon className="h-5 w-5 text-primary" />
                                  Best Practices
                                </h3>
                                <ul className="space-y-2 text-sm text-muted-foreground">
                                  {product.bestPractices.map((practice, idx) => (
                                    <li key={idx}>• {practice}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </Card>
                        ))
                      )
                    ) : (
                      <Card className="p-12 text-center">
                        <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                        <h3 className="text-xl font-bold mb-2">No Guides Found</h3>
                        <p className="text-muted-foreground">
                          Try searching for another product or clear your search to view all guides.
                        </p>
                      </Card>
                    )}
                  </div>
                ) : (
                  // Show normal tabbed view
                  guides.map((guide) => (
                  <TabsContent
                    key={guide.category}
                    value={guide.category.toLowerCase().replace(" ", "-")}
                    className="space-y-8"
                  >
                    {guide.products.map((product) => (
                      <Card key={product.name} className="p-8">
                        <div className="flex flex-col md:flex-row gap-6 mb-6">
                          <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-secondary/20 flex-shrink-0">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-3">
                              <guide.icon className="h-8 w-8 text-primary flex-shrink-0" />
                              <h2 className="text-2xl font-bold">{product.name}</h2>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{product.timing}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Droplets className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{product.dosage}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Sun className="h-5 w-5 text-primary" />
                              Usage Tips
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {product.tips.map((tip, idx) => (
                                <li key={idx}>• {tip}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                              <Moon className="h-5 w-5 text-primary" />
                              Best Practices
                            </h3>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                              {product.bestPractices.map((practice, idx) => (
                                <li key={idx}>• {practice}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    ))}
                    </TabsContent>
                  ))
                )}
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our wellness experts are here to help you optimize your routine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  View FAQ
                </a>
                <a
                  href="mailto:support@neurostate.fit"
                  className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 font-medium hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowToUse;
