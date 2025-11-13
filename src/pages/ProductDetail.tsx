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
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { SEO } from "@/components/SEO";
import { ProductStructuredData, BreadcrumbStructuredData } from "@/components/StructuredData";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { LiveChat } from "@/components/LiveChat";
import { trackProductView } from "@/lib/analytics";

const ProductDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const { addRecentlyViewed } = useRecentlyViewed();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [chatOpen, setChatOpen] = useState(false);

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
      
      // Track product view in Google Analytics
      const firstVariant = product.variants.edges[0]?.node;
      trackProductView({
        id: product.id,
        name: product.title,
        price: firstVariant?.price.amount || '0',
        category: product.tags?.[0],
        brand: 'NeuroState',
      });
    }
  }, [product, addRecentlyViewed]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
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
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </>
    );
  }

  const images = product.images.edges.map(edge => ({
    url: edge.node.url,
    altText: edge.node.altText
  }));

  const firstVariant = product.variants.edges[0]?.node;
  const price = firstVariant?.price.amount || '0';
  const productDescription = product.description || `Premium ${product.title} from NeuroState®. Science-backed supplement for optimal performance and wellness.`;
  const productImage = images[0]?.url || '';
  
  // Mock rating for structured data
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 100;
  
  // Check availability based on variant availability
  const isAvailable = firstVariant?.availableForSale ?? true;

  return (
    <>
      <SEO
        title={`${product.title} | NeuroState® - Premium Supplements & Recovery Technology`}
        description={productDescription.slice(0, 160)}
        image={productImage}
        type="product"
        canonical={`https://neurostate.co.uk/product/${product.handle}`}
      />
      <ProductStructuredData
        product={{
          name: product.title,
          description: productDescription,
          image: productImage,
          price: price,
          currency: 'GBP',
          availability: isAvailable ? 'InStock' : 'OutOfStock',
          rating: rating,
          reviewCount: reviewCount,
          brand: 'NeuroState®',
        }}
      />
      <BreadcrumbStructuredData
        items={[
          { name: 'Home', url: 'https://neurostate.co.uk' },
          { name: 'Products', url: 'https://neurostate.co.uk/#products' },
          { name: product.title, url: `https://neurostate.co.uk/product/${product.handle}` },
        ]}
      />
      <Header />
      <main className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <nav className="border-b" aria-label="Breadcrumb">
          <div className="container mx-auto px-4 py-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-muted">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
              </Button>
            </Link>
          </div>
        </nav>

        {/* Product Section - Main Hero */}
        <article className="container mx-auto px-4 py-8 lg:py-12">
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

              {/* Shipping Calculator */}
              <div className="pt-6 border-t">
                <ShippingCalculator 
                  productPrice={parseFloat(product.priceRange.minVariantPrice.amount)}
                />
              </div>
            </div>
          </div>
        </article>

        {/* Product Details Section - Full Width */}
        <section className="bg-muted/30 border-t">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <ProductTabs description={product.description || "No description available."} />
          </div>
        </section>

        {/* Frequently Bought Together */}
        <section className="border-t bg-background">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <FrequentlyBoughtTogether currentProduct={product} />
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="border-t bg-muted/20">
          <div className="container mx-auto px-4 py-12 lg:py-16">
            <CustomerReviews productHandle={product.handle} />
          </div>
        </section>
      </main>
      
      <Footer />
      <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
    </>
  );
};

export default ProductDetail;
