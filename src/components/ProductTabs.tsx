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
          <div>
            <h3 className="text-lg font-semibold mb-4">Supplement Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Serving Size</span>
                <span className="text-muted-foreground">2 capsules</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="font-medium">Servings Per Container</span>
                <span className="text-muted-foreground">30</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-medium">Amount Per Serving</span>
                <span className="text-muted-foreground">View label</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground pt-4 border-t">
            All ingredients are carefully selected and tested for quality and efficacy.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="usage" className="mt-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-1">Dosage</h4>
              <p className="text-muted-foreground">Take 2 capsules daily with food</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Best Time</h4>
              <p className="text-muted-foreground">Morning with breakfast</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Storage</h4>
              <p className="text-muted-foreground">Keep in a cool, dry place away from direct sunlight</p>
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Consult with a healthcare professional before starting any new supplement regimen, especially if pregnant, nursing, or taking medications.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="research" className="mt-6">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Science-Backed Formulation</h3>
            <p className="text-muted-foreground leading-relaxed">
              Our formulations are developed based on the latest scientific research and clinical studies. Each ingredient is selected for its proven efficacy and optimal dosing.
            </p>
          </div>
          
          <div className="space-y-3 pt-4 border-t">
            <div>
              <h4 className="font-semibold mb-1">Clinical Studies</h4>
              <p className="text-sm text-muted-foreground">Backed by peer-reviewed research</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Bioavailable</h4>
              <p className="text-sm text-muted-foreground">Optimized for absorption</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-1">Evidence-Based</h4>
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
