import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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

      <TabsContent value="ingredients" className="mt-6">
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-secondary/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold">📋</span>
              </div>
              <h3 className="text-xl font-semibold">Supplement Facts</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Serving Size</span>
                <span className="text-muted-foreground">2 capsules</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b">
                <span className="font-medium">Servings Per Container</span>
                <span className="text-muted-foreground">30</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="font-medium">Amount Per Serving</span>
                <span className="text-muted-foreground">View label</span>
              </div>
            </div>
          </div>
          
          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded">
            <p className="text-sm font-medium">
              ✓ All ingredients are carefully selected and tested for quality and efficacy
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="usage" className="mt-6">
        <div className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-6 text-center bg-secondary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💊</span>
              </div>
              <h4 className="font-semibold mb-2">Dosage</h4>
              <p className="text-sm text-muted-foreground">Take 2 capsules daily with food</p>
            </div>
            
            <div className="border rounded-lg p-6 text-center bg-secondary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">⏰</span>
              </div>
              <h4 className="font-semibold mb-2">Best Time</h4>
              <p className="text-sm text-muted-foreground">Morning with breakfast</p>
            </div>
            
            <div className="border rounded-lg p-6 text-center bg-secondary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📦</span>
              </div>
              <h4 className="font-semibold mb-2">Storage</h4>
              <p className="text-sm text-muted-foreground">Cool, dry place away from sunlight</p>
            </div>
          </div>
          
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded">
            <p className="text-sm font-medium flex items-start gap-2">
              <span className="text-amber-600 dark:text-amber-400">⚠️</span>
              <span>Consult with a healthcare professional before starting any new supplement regimen, especially if pregnant, nursing, or taking medications.</span>
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="research" className="mt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-semibold mb-3">Science-Backed Formulation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our formulations are developed based on the latest scientific research and clinical studies. Each ingredient is selected for its proven efficacy and optimal dosing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-5 bg-secondary/5">
              <div className="text-3xl mb-2">🔬</div>
              <h4 className="font-semibold mb-2">Clinical Studies</h4>
              <p className="text-sm text-muted-foreground">Backed by peer-reviewed research</p>
            </div>
            
            <div className="border rounded-lg p-5 bg-secondary/5">
              <div className="text-3xl mb-2">✅</div>
              <h4 className="font-semibold mb-2">Bioavailable</h4>
              <p className="text-sm text-muted-foreground">Optimized for absorption</p>
            </div>
            
            <div className="border rounded-lg p-5 bg-secondary/5">
              <div className="text-3xl mb-2">📊</div>
              <h4 className="font-semibold mb-2">Evidence-Based</h4>
              <p className="text-sm text-muted-foreground">Formulated from scientific literature</p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="faq" className="mt-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>How long until I see results?</AccordionTrigger>
            <AccordionContent>
              Most users notice benefits within 2-4 weeks of consistent use. For optimal results, we recommend taking the supplement daily for at least 8-12 weeks.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I take this with other supplements?</AccordionTrigger>
            <AccordionContent>
              Yes, this product is generally safe to combine with other supplements. However, we recommend consulting with a healthcare provider if you're taking multiple supplements or medications.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is this product vegan/vegetarian?</AccordionTrigger>
            <AccordionContent>
              Please check the product label for specific dietary information. We clearly indicate if products are vegan, vegetarian, gluten-free, or dairy-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>What is your return policy?</AccordionTrigger>
            <AccordionContent>
              We offer a 30-day money-back guarantee. If you're not satisfied with your purchase, contact our customer service team for a full refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};
