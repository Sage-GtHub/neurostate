import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

interface Expert {
  id: string;
  name: string;
  credentials: string;
  title: string;
  bio: string;
  collectionLink: string;
  specialisation: string;
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
    specialisation: "Sleep Science",
    productQuery: "tag:sleep",
  },
  {
    id: "dr-sarah-williams",
    name: "Dr. Sarah Williams",
    credentials: "PhD, CSCS",
    title: "Sports Nutrition Scientist",
    bio: "Performance nutritionist working with Olympic athletes and professional sports teams worldwide.",
    collectionLink: "/category/supplements",
    specialisation: "Nutrition",
    productQuery: "product_type:Supplements",
  },
  {
    id: "dr-marcus-thompson",
    name: "Dr. Marcus Thompson",
    credentials: "DPT, CSCS",
    title: "Recovery & Performance Coach",
    bio: "Physical therapist and performance coach specialising in recovery technology and athletic optimisation.",
    collectionLink: "/category/recovery-devices",
    specialisation: "Recovery",
    productQuery: "tag:recovery",
  },
  {
    id: "dr-emily-chen",
    name: "Dr. Emily Chen",
    credentials: "PhD",
    title: "Cognitive Performance Researcher",
    bio: "Neuroscientist focused on cognitive enhancement, mental clarity, and brain health optimisation.",
    collectionLink: "/category/supplements?tag=cognitive",
    specialisation: "Cognitive Health",
    productQuery: "tag:cognitive",
  },
];

export const ExpertPartners = () => {
  return (
    <section className="py-24 md:py-32 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 bg-ivory">
      <div className="w-full max-w-7xl mx-auto">
        <div className="mb-16 md:mb-20">
          <p className="ghost-number mb-6">EXPERT PARTNERSHIPS</p>
          <h2 className="mb-4">Trusted by experts</h2>
          <p className="text-body-large text-ash max-w-2xl">
            Recommended by leading researchers, athletes, and health professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {experts.map((expert) => (
            <Link 
              key={expert.id}
              to={expert.collectionLink}
              className="block group"
            >
              <div className="space-y-4">
                <div className="mb-4">
                  <p className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-stone mb-2">
                    {expert.specialisation}
                  </p>
                  <h4 className="text-[1.125rem] font-medium mb-1 text-carbon group-hover:opacity-60 transition-opacity">
                    {expert.name}
                  </h4>
                  <p className="text-[0.8125rem] text-stone mb-1">
                    {expert.credentials}
                  </p>
                  <p className="text-[0.9375rem] text-ash">
                    {expert.title}
                  </p>
                </div>
                
                <p className="text-[0.9375rem] text-ash leading-relaxed">
                  {expert.bio}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
