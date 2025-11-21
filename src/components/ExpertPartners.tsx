import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Expert {
  id: string;
  name: string;
  credentials: string;
  title: string;
  bio: string;
  collectionLink: string;
  specialization: string;
  productQuery: string;
}

const experts: Expert[] = [
  {
    id: "dr-james-mitchell",
    name: "Dr. James Mitchell",
    credentials: "MD, PhD",
    title: "Sleep & Recovery Specialist",
    bio: "Leading expert in sleep optimisation and circadian biology with 20+ years of research in performance recovery.",
    collectionLink: "/category/supplements?tag=sleep",
    specialization: "Sleep Science",
    productQuery: "tag:sleep",
  },
  {
    id: "dr-sarah-williams",
    name: "Dr. Sarah Williams",
    credentials: "PhD, CSCS",
    title: "Sports Nutrition Scientist",
    bio: "Performance nutritionist working with Olympic athletes and professional sports teams worldwide.",
    collectionLink: "/category/supplements",
    specialization: "Nutrition",
    productQuery: "product_type:Supplements",
  },
  {
    id: "dr-marcus-thompson",
    name: "Dr. Marcus Thompson",
    credentials: "DPT, CSCS",
    title: "Recovery & Performance Coach",
    bio: "Physical therapist and performance coach specialising in recovery technology and athletic optimisation.",
    collectionLink: "/category/recovery-devices",
    specialization: "Recovery",
    productQuery: "tag:recovery",
  },
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    credentials: "PhD",
    title: "Cognitive Performance Researcher",
    bio: "Neuroscientist focused on cognitive enhancement, mental clarity, and brain health optimisation.",
    collectionLink: "/category/supplements?tag=cognitive",
    specialization: "Cognitive Health",
    productQuery: "tag:cognitive",
  },
];

const ExpertProductCarousel = ({ expert }: { expert: Expert }) => {
  const addItem = useCartStore(state => state.addItem);
  
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['expert-products', expert.productQuery],
    queryFn: () => fetchProducts(6, expert.productQuery),
  });

  const handleAddToCart = (product: ShopifyProduct) => {
    const variant = product.node.variants.edges[0]?.node;
    if (!variant) return;

    const cartItem = {
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: `${product.node.title} has been added to your cart.`,
    });
  };

  if (isLoading) {
    return (
      <div className="mt-6 flex items-center justify-center py-8">
        <div className="text-sm text-muted-foreground">Loading products...</div>
      </div>
    );
  }

  if (!products.length) {
    return null;
  }

  return (
    <div className="mt-6">
      <h4 className="text-sm font-semibold mb-3 text-foreground/80">Recommended Products</h4>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2">
          {products.map((product) => (
            <CarouselItem key={product.node.id} className="pl-2 basis-full sm:basis-1/2">
              <Link to={`/product/${product.node.handle}`}>
                <div className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  <div className="aspect-square overflow-hidden bg-secondary/20">
                    {product.node.images.edges[0]?.node && (
                      <img
                        src={product.node.images.edges[0].node.url}
                        alt={product.node.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-3">
                    <h5 className="font-medium text-sm line-clamp-1 mb-1">{product.node.title}</h5>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold">
                        {product.node.priceRange.minVariantPrice.currencyCode} £
                        {parseFloat(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddToCart(product);
                        }}
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export const ExpertPartners = () => {
  return (
    <section className="py-16 px-6 sm:px-8 lg:px-20 xl:px-32 bg-background">
      <div className="w-full">
        <div className="mb-12">
          <p className="text-[10px] sm:text-xs font-light text-muted-foreground mb-3 tracking-[0.3em] uppercase">
            EXPERT PARTNERSHIPS
          </p>
          <h2 className="text-[1.875rem] font-semibold uppercase mb-6" style={{ lineHeight: '1.3' }}>
            Trusted by Experts
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl font-light">
            Our products are recommended by leading researchers, athletes, and health professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {experts.map((expert) => (
            <Link 
              key={expert.id}
              to={expert.collectionLink}
              className="block h-full"
            >
              <div className="overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group cursor-pointer h-full flex flex-col">
                <div className="p-6 flex flex-col flex-1">
                  <div className="mb-3">
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/10 text-accent mb-2">
                      {expert.specialization}
                    </span>
                    <h3 className="text-[1.5rem] font-semibold mb-1" style={{ lineHeight: '1.4' }}>{expert.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-1">
                      {expert.credentials}
                    </p>
                    <p className="text-sm text-foreground/80 font-medium">
                      {expert.title}
                    </p>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {expert.bio}
                  </p>
                  
                  <ExpertProductCarousel expert={expert} />
                  
                  <Button 
                    variant="outline" 
                    className="w-full group/btn mt-4"
                    asChild
                  >
                    <span>
                      View All Products
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </span>
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            Our products are backed by leading researchers, athletes, and health professionals
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
            <div className="text-sm font-medium">150+ Pro Teams</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Olympic Athletes</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Research Partners</div>
            <div className="h-8 w-px bg-border" />
            <div className="text-sm font-medium">Third-Party Tested</div>
          </div>
        </div>
      </div>
    </section>
  );
};
