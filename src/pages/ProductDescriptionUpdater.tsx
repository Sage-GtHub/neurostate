import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

const ProductDescriptionUpdater = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setResults(null);

    try {
      toast.info("Starting batch update...", {
        description: "This may take a few minutes depending on the number of products.",
      });

      const { data, error } = await supabase.functions.invoke("update-product-descriptions");

      if (error) {
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || "Update failed");
      }

      setResults(data);
      
      const successCount = data.results.filter((r: any) => r.status === "success").length;
      const errorCount = data.results.filter((r: any) => r.status === "error").length;
      const skippedCount = data.results.filter((r: any) => r.status === "skipped").length;

      toast.success("Batch update complete!", {
        description: `Updated: ${successCount} • Errors: ${errorCount} • Skipped: ${skippedCount}`,
      });

    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update failed", {
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Product Description Updater
              </h1>
              <p className="text-lg text-muted-foreground">
                Automatically convert all your product descriptions to shorter, bullet-point format with emojis using AI.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="p-8">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">How it works</h2>
                    <p className="text-muted-foreground mb-4">
                      This tool will fetch all your products and use AI to convert their descriptions to a more engaging format:
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Short, punchy intro with relevant emojis (under 180 characters)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>3 key benefit bullet points with ✓ markers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>British English, conversational tone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>Optimised for quick scanning and engagement</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                    <div className="flex gap-3">
                      <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Important</p>
                        <p className="text-muted-foreground">
                          This will update all products in your Shopify store. The changes will be immediate and permanent. 
                          We recommend backing up your product descriptions first if you want to keep the originals.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleUpdate}
                    disabled={isUpdating}
                    size="lg"
                    className="w-full"
                  >
                    {isUpdating ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Updating Products...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-5 w-5 mr-2" />
                        Update All Product Descriptions
                      </>
                    )}
                  </Button>

                  {results && (
                    <div className="mt-8 space-y-4">
                      <h3 className="text-xl font-bold">Results</h3>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <Card className="p-4 text-center">
                          <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {results.results.filter((r: any) => r.status === "success").length}
                          </div>
                          <div className="text-sm text-muted-foreground">Updated</div>
                        </Card>
                        
                        <Card className="p-4 text-center">
                          <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {results.results.filter((r: any) => r.status === "error").length}
                          </div>
                          <div className="text-sm text-muted-foreground">Errors</div>
                        </Card>
                        
                        <Card className="p-4 text-center">
                          <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                          <div className="text-2xl font-bold">
                            {results.results.filter((r: any) => r.status === "skipped").length}
                          </div>
                          <div className="text-sm text-muted-foreground">Skipped</div>
                        </Card>
                      </div>

                      <div className="max-h-96 overflow-y-auto space-y-3">
                        {results.results.map((result: any, index: number) => (
                          <Card key={index} className={`p-4 ${
                            result.status === "success" ? "border-green-200 dark:border-green-800" :
                            result.status === "error" ? "border-red-200 dark:border-red-800" :
                            "border-orange-200 dark:border-orange-800"
                          }`}>
                            <div className="flex items-start gap-3">
                              {result.status === "success" && <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />}
                              {result.status === "error" && <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />}
                              {result.status === "skipped" && <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />}
                              <div className="flex-1 min-w-0">
                                <div className="font-medium">{result.title}</div>
                                <div className="text-sm text-muted-foreground">/{result.handle}</div>
                                {result.reason && (
                                  <div className="text-sm mt-1">{result.reason}</div>
                                )}
                                {result.newDescription && (
                                  <div className="mt-2 text-sm">
                                    <div className="font-medium mb-1">New description preview:</div>
                                    <div className="text-muted-foreground">{result.newDescription}</div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDescriptionUpdater;