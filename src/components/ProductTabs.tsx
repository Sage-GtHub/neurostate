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

      <TabsContent value="overview" className="mt-6 space-y-4">
        <div className="prose max-w-none">
          <p className="text-muted-foreground leading-relaxed">{description}</p>
          <h3 className="text-xl font-semibold mt-6 mb-3">What Makes This Special?</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>Premium quality ingredients sourced from trusted suppliers</li>
            <li>Third-party tested for purity and potency</li>
            <li>Manufactured in GMP-certified facilities</li>
            <li>Free from artificial colors, flavors, and preservatives</li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="ingredients" className="mt-6">
        <div className="space-y-6">
          <div className="border rounded-lg p-6 bg-secondary/10">
            <h3 className="text-xl font-semibold mb-4">Supplement Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Serving Size</span>
                <span className="text-muted-foreground">2 capsules</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="font-medium">Servings Per Container</span>
                <span className="text-muted-foreground">30</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            All ingredients are carefully selected and tested for quality and efficacy.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="usage" className="mt-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recommended Use</h3>
          <div className="space-y-3 text-muted-foreground">
            <p><strong>Dosage:</strong> Take 2 capsules daily with food</p>
            <p><strong>Timing:</strong> Best taken in the morning with breakfast</p>
            <p><strong>Storage:</strong> Keep in a cool, dry place away from direct sunlight</p>
          </div>
          <div className="bg-accent/10 border-l-4 border-accent p-4 rounded mt-6">
            <p className="text-sm">
              <strong>Note:</strong> Consult with a healthcare professional before starting any new supplement regimen, especially if pregnant, nursing, or taking medications.
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="research" className="mt-6">
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">Science-Backed Formulation</h3>
          <p className="text-muted-foreground leading-relaxed">
            Our formulations are developed based on the latest scientific research and clinical studies. Each ingredient is selected for its proven efficacy and optimal dosing.
          </p>
          <div className="bg-secondary/10 rounded-lg p-6">
            <h4 className="font-semibold mb-3">Key Research Highlights</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Clinical studies demonstrate significant improvements in target health outcomes</li>
              <li>• Ingredients are bioavailable and efficiently absorbed</li>
              <li>• Formulated based on peer-reviewed scientific literature</li>
            </ul>
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
