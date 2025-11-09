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
      <div className="min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
            </Button>
          </Link>
        </div>

        {/* Product Section */}
        <div className="container mx-auto px-4 pb-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Image Gallery */}
            <ProductImageGallery images={images} productTitle={product.title} />

            {/* Right: Product Info */}
            <div>
              <ProductInfo
                product={product}
                selectedVariantIndex={selectedVariantIndex}
                setSelectedVariantIndex={setSelectedVariantIndex}
              />
              
              {/* Trust Badges - Integrated */}
              <div className="mt-6 pt-6 border-t">
                <TrustBadges />
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8">Key Benefits</h2>
          <BenefitsSection />
        </div>

        {/* Product Details Tabs */}
        <div className="container mx-auto px-4 py-12 border-t">
          <ProductTabs description={product.description || "No description available."} />
        </div>

        {/* Frequently Bought Together */}
        <div className="container mx-auto px-4 py-12 border-t">
          <FrequentlyBoughtTogether currentProduct={product} />
        </div>

        {/* Customer Reviews */}
        <div className="container mx-auto px-4 py-12 border-t">
          <CustomerReviews productHandle={product.handle} />
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ProductDetail;
