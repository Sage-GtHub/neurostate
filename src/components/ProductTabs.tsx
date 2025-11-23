import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ProductTabsProps {
  description: string;
}

export const ProductTabs = ({ description }: ProductTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-12">
        <TabsTrigger 
          value="overview"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-carbon data-[state=active]:bg-transparent text-[0.875rem] px-0 mr-8"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger 
          value="ingredients"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-carbon data-[state=active]:bg-transparent text-[0.875rem] px-0 mr-8"
        >
          Ingredients
        </TabsTrigger>
        <TabsTrigger 
          value="usage"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-carbon data-[state=active]:bg-transparent text-[0.875rem] px-0 mr-8"
        >
          How to Use
        </TabsTrigger>
        <TabsTrigger 
          value="research"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-carbon data-[state=active]:bg-transparent text-[0.875rem] px-0 mr-8"
        >
          Research
        </TabsTrigger>
        <TabsTrigger 
          value="faq"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-carbon data-[state=active]:bg-transparent text-[0.875rem] px-0"
        >
          FAQ
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="prose max-w-none">
          <div className="text-[0.9375rem] text-ash leading-relaxed space-y-6">
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="ingredients" className="space-y-8">
        <div className="space-y-6">
          <div>
            <h4 className="text-[1.125rem] font-medium mb-4 text-carbon">Supplement facts</h4>
            <p className="text-[0.9375rem] text-ash mb-8">Premium ingredients for optimal results</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-4 border-b border-mist">
              <span className="text-[0.9375rem] text-carbon">Serving size</span>
              <span className="text-[0.875rem] text-stone">2 capsules</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-mist">
              <span className="text-[0.9375rem] text-carbon">Servings per container</span>
              <span className="text-[0.875rem] text-stone">30 days</span>
            </div>
            <div className="flex justify-between items-center py-4 border-b border-mist">
              <span className="text-[0.9375rem] text-carbon">Amount per serving</span>
              <button className="text-[0.875rem] text-stone hover:text-carbon transition-colors">View label</button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-mist">
          <p className="text-[0.9375rem] text-ash leading-relaxed">
            We hand-pick every ingredient and rigorously test for quality. Nothing makes it into our formulas without meeting our standards.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="usage" className="space-y-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h4 className="text-[1.125rem] font-medium mb-2 text-carbon">Dosage</h4>
            <p className="text-[0.8125rem] text-stone mb-3">Daily</p>
            <p className="text-[0.9375rem] text-ash">
              Take 2 capsules daily with food
            </p>
          </div>
          
          <div>
            <h4 className="text-[1.125rem] font-medium mb-2 text-carbon">Best time</h4>
            <p className="text-[0.8125rem] text-stone mb-3">Morning</p>
            <p className="text-[0.9375rem] text-ash">
              Best taken in the morning with breakfast for better absorption
            </p>
          </div>
          
          <div>
            <h4 className="text-[1.125rem] font-medium mb-2 text-carbon">Storage</h4>
            <p className="text-[0.8125rem] text-stone mb-3">Cool & dry</p>
            <p className="text-[0.9375rem] text-ash">
              Keep in a cool, dry place away from direct sunlight
            </p>
          </div>
        </div>
        
        <div className="pt-8 border-t border-mist">
          <p className="text-[0.875rem] font-medium text-carbon mb-2">Important</p>
          <p className="text-[0.9375rem] text-ash leading-relaxed">
            If you're pregnant, breastfeeding, or taking any medications, have a chat with your GP or healthcare provider before starting this supplement.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="research" className="space-y-8">
        <div>
          <h4 className="text-[1.125rem] font-medium mb-4 text-carbon">Backed by science</h4>
          <p className="text-[0.9375rem] text-ash leading-relaxed mb-12">
            We build our formulas on solid scientific research and clinical trials. Every ingredient is chosen for what it can actually do, not just marketing claims, and dosed properly to get results.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone mb-3">Verified</p>
            <h5 className="text-[1.125rem] font-medium mb-3 text-carbon">Clinically studied</h5>
            <p className="text-[0.9375rem] text-ash leading-relaxed">
              Supported by peer-reviewed research and proper clinical trials
            </p>
          </div>
          
          <div>
            <p className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone mb-3">Optimised</p>
            <h5 className="text-[1.125rem] font-medium mb-3 text-carbon">Actually absorbed</h5>
            <p className="text-[0.9375rem] text-ash leading-relaxed">
              Formulated for proper absorption—what matters is what your body can use
            </p>
          </div>
          
          <div>
            <p className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone mb-3">Proven</p>
            <h5 className="text-[1.125rem] font-medium mb-3 text-carbon">Evidence-based</h5>
            <p className="text-[0.9375rem] text-ash leading-relaxed">
              Built on real scientific evidence, not wellness trends
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="faq">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b border-mist">
            <AccordionTrigger className="text-[0.9375rem] font-medium text-carbon">How long until I see results?</AccordionTrigger>
            <AccordionContent className="text-[0.9375rem] text-ash leading-relaxed">
              Most people start noticing benefits within 2-4 weeks of taking it daily. For best results, we'd suggest giving it at least 8-12 weeks of consistent use.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b border-mist">
            <AccordionTrigger className="text-[0.9375rem] font-medium text-carbon">Can I take this with other supplements?</AccordionTrigger>
            <AccordionContent className="text-[0.9375rem] text-ash leading-relaxed">
              Generally speaking, yes—it's usually fine to combine with other supplements. That said, if you're taking several supplements or any medications, it's worth checking with your GP or healthcare provider first.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b border-mist">
            <AccordionTrigger className="text-[0.9375rem] font-medium text-carbon">Is this product vegan/vegetarian?</AccordionTrigger>
            <AccordionContent className="text-[0.9375rem] text-ash leading-relaxed">
              Have a look at the product label for the specifics. We always clearly mark if something's vegan, vegetarian, gluten-free, or dairy-free.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border-b-0">
            <AccordionTrigger className="text-[0.9375rem] font-medium text-carbon">What's your return policy?</AccordionTrigger>
            <AccordionContent className="text-[0.9375rem] text-ash leading-relaxed">
              We've got a 30-day money-back guarantee. If you're not happy with your purchase for any reason, just get in touch with our customer service team and we'll sort out a full refund.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TabsContent>
    </Tabs>
  );
};
