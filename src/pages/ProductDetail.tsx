import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FrequentlyBoughtTogether } from "@/components/FrequentlyBoughtTogether";
import { ProductImageGallery } from "@/components/ProductImageGallery";
import { ProductInfo } from "@/components/ProductInfo";
import { TrustBadges } from "@/components/TrustBadges";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ProductTabs } from "@/components/ProductTabs";
import { CustomerReviews } from "@/components/CustomerReviews";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => fetchProductByHandle(handle!),
    enabled: !!handle,
    staleTime: 0,
    refetchOnMount: 'always',
    refetchOnWindowFocus: 'always',
  });

  useEffect(() => {
    if (product) {
      addRecentlyViewed({ node: product });
    }
  }, [product, addRecentlyViewed]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <p className="text-destructive">Product not found</p>
        </div>
      </>
    );
  }

  const images = product.images.edges.map(edge => ({
    url: edge.node.url,
    altText: edge.node.altText
  }));

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="border-b">
          <div className="container mx-auto px-4 py-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Product Section - Main Hero */}
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="grid lg:grid-cols-[1fr,1fr] gap-8 lg:gap-16 items-start">
            {/* Left: Image Gallery - Sticky on scroll */}
            <div className="lg:sticky lg:top-24">
              <ProductImageGallery images={images} productTitle={product.title} />
            </div>

            {/* Right: Product Info */}
            <div className="space-y-6">
              <ProductInfo
                product={product}
                selectedVariantIndex={selectedVariantIndex}
                setSelectedVariantIndex={setSelectedVariantIndex}
              />
              
              {/* Trust Badges */}
              <div className="pt-6 border-t">
                <TrustBadges />
              </div>

              {/* Key Benefits - Moved up for better visibility */}
              <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Key Benefits</h3>
                <BenefitsSection />
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section - Full Width */}
        <div className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <ProductTabs description={product.description || "No description available."} />
          </div>
        </div>

        {/* Frequently Bought Together */}
        <div className="border-t bg-background">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <FrequentlyBoughtTogether currentProduct={product} />
          </div>
        </div>

        {/* Customer Reviews */}
        <div className="border-t bg-muted/20">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <CustomerReviews productHandle={product.handle} />
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
