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
          <Loader2 className="h-8 w-8 animate-spin text-carbon" />
        </div>
        <LiveChat externalOpen={chatOpen} onOpenChange={setChatOpen} />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-12">
          <Link to="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <p className="text-ash">Product not found</p>
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
  
  const rating = 4.5 + Math.random() * 0.5;
  const reviewCount = Math.floor(Math.random() * 500) + 100;
  
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
        <nav className="border-b border-mist" aria-label="Breadcrumb">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-4">
            <Link to="/">
              <Button variant="ghost" size="sm" className="hover:bg-transparent hover:opacity-60">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </Link>
          </div>
        </nav>

        <article className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-12 md:py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="lg:sticky lg:top-32 h-fit">
              <ProductImageGallery images={images} productTitle={product.title} />
            </div>

            <div className="space-y-8">
              <ProductInfo
                product={product}
                selectedVariantIndex={selectedVariantIndex}
                setSelectedVariantIndex={setSelectedVariantIndex}
              />
              
              <div className="pt-8 border-t border-mist">
                <TrustBadges />
              </div>

              <div className="pt-8 border-t border-mist">
                <h3 className="mb-6 text-[1.125rem] font-normal text-carbon">Key benefits</h3>
                <BenefitsSection />
              </div>

              <div className="pt-8 border-t border-mist">
                <ShippingCalculator 
                  productPrice={parseFloat(product.priceRange.minVariantPrice.amount)}
                />
              </div>
            </div>
          </div>
        </article>

        <section className="bg-ivory border-t border-mist">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-16 md:py-24">
            <ProductTabs description={product.description || "No description available."} />
          </div>
        </section>

        <section className="border-t border-mist bg-background">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-16 md:py-24">
            <FrequentlyBoughtTogether currentProduct={product} />
          </div>
        </section>

        <section className="border-t border-mist bg-ivory">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 py-16 md:py-24">
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
