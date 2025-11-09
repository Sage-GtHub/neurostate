import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pill, Clock, Thermometer, FlaskConical, Sparkles, CheckCircle2, BookOpen } from "lucide-react";

interface ProductTabsProps {
  description: string;
}

export const ProductTabs = ({ description }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
        <TabsTrigger 
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="ingredients"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Ingredients
        </TabsTrigger>
        <TabsTrigger 
          value="usage"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          How to Use
        </TabsTrigger>
        <TabsTrigger 
          value="research"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          Research
        </TabsTrigger>
        <TabsTrigger 
          value="faq"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
        >
          FAQ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-6 space-y-6">
        <div className="prose max-w-none">
          <div className="text-muted-foreground leading-relaxed space-y-4">
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="ingredients" className="mt-8">
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="flex items-start gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Pill className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Supplement Facts</h3>
                <p className="text-sm text-muted-foreground">Premium ingredients for optimal results</p>
              </div>
            </div>
            
            <div className="space-y-3 bg-background/50 rounded-lg p-4">
              <div className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">💊</span>
                  <span className="font-medium">Serving Size</span>
                </div>
                <Badge variant="secondary" className="font-mono">2 capsules</Badge>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <span className="font-medium">Servings Per Container</span>
                </div>
                <Badge variant="secondary" className="font-mono">30 days</Badge>
              </div>
              <div className="flex justify-between items-center py-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  <span className="font-medium">Amount Per Serving</span>
                </div>
                <Badge variant="outline" className="font-mono">View label</Badge>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-accent/50 border-accent">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
              <p className="text-sm text-foreground">
                We hand-pick every ingredient and rigorously test for quality. Nothing makes it into our formulas without meeting our standards.
              </p>
            </div>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="usage" className="mt-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <span className="text-2xl">💊</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Dosage</h4>
                <Badge variant="secondary" className="mt-1">Daily</Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Take 2 capsules daily with food
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <span className="text-2xl">⏰</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Best Time</h4>
                <Badge variant="secondary" className="mt-1">Morning</Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Best taken in the morning with breakfast for better absorption
            </p>
          </Card>
          
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-full bg-primary/10">
                <span className="text-2xl">🌡️</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Storage</h4>
                <Badge variant="secondary" className="mt-1">Cool & Dry</Badge>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Keep in a cool, dry place away from direct sunlight
            </p>
          </Card>
        </div>
        
        <Card className="mt-6 p-5 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <div className="flex gap-3">
            <span className="text-2xl flex-shrink-0">⚠️</span>
            <div>
              <p className="text-sm font-medium mb-1">Important</p>
              <p className="text-sm text-muted-foreground">
                If you're pregnant, breastfeeding, or taking any medications, have a chat with your GP or healthcare provider before starting this supplement.
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="research" className="mt-8">
        <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 rounded-xl bg-primary/10">
              <FlaskConical className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Backed by Science</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We build our formulas on solid scientific research and clinical trials. Every ingredient is chosen for what it can actually do, not just marketing claims, and dosed properly to get results.
              </p>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-3 mt-8">
            <div className="bg-background/80 rounded-lg p-5 border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">🔬</span>
                <Badge variant="outline" className="text-xs">Verified</Badge>
              </div>
              <h4 className="font-semibold text-lg mb-2">Clinically Studied</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Supported by peer-reviewed research and proper clinical trials
              </p>
            </div>
            
            <div className="bg-background/80 rounded-lg p-5 border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">⚡</span>
                <Badge variant="outline" className="text-xs">Optimized</Badge>
              </div>
              <h4 className="font-semibold text-lg mb-2">Actually Absorbed</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Formulated for proper absorption—what matters is what your body can use
              </p>
            </div>
            
            <div className="bg-background/80 rounded-lg p-5 border">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">📚</span>
                <Badge variant="outline" className="text-xs">Proven</Badge>
              </div>
              <h4 className="font-semibold text-lg mb-2">Evidence-Based</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Built on real scientific evidence, not wellness trends
              </p>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long until I see results?</AccordionTrigger>
            <AccordionContent>
              Most people start noticing benefits within 2-4 weeks of taking it daily. For best results, we'd suggest giving it at least 8-12 weeks of consistent use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I take this with other supplements?</AccordionTrigger>
            <AccordionContent>
              Generally speaking, yes—it's usually fine to combine with other supplements. That said, if you're taking several supplements or any medications, it's worth checking with your GP or healthcare provider first.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is this product vegan/vegetarian?</AccordionTrigger>
            <AccordionContent>
              Have a look at the product label for the specifics. We always clearly mark if something's vegan, vegetarian, gluten-free, or dairy-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What's your return policy?</AccordionTrigger>
            <AccordionContent>
              We've got a 30-day money-back guarantee. If you're not happy with your purchase for any reason, just get in touch with our customer service team and we'll sort out a full refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};
