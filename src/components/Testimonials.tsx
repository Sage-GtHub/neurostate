import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  review: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Wellness Enthusiast",
    avatar: "SM",
    rating: 5,
    review: "The Red Light Therapy Blanket has completely transformed my recovery routine. I feel more energised and my muscle soreness has reduced significantly. Absolutely worth the investment!",
    product: "Red Light Therapy Blanket",
  },
  {
    id: 2,
    name: "James Patterson",
    role: "Professional Athlete",
    avatar: "JP",
    rating: 5,
    review: "As a professional athlete, recovery is crucial. The CryoPlunge Ice Bath has become an essential part of my daily routine. The quality is outstanding and the results speak for themselves.",
    product: "CryoPlunge Ice Bath",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Yoga Instructor",
    avatar: "EC",
    rating: 5,
    review: "I've tried many supplements, but the Omega-3 Elite is by far the best. I notice the difference in my joint health and mental clarity. The quality standards are impressive.",
    product: "Omega-3 Elite",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Business Executive",
    avatar: "MT",
    rating: 4,
    review: "The PEMF Therapy Mat has helped me manage stress and improve my sleep quality. After long days at the office, it's my go-to for relaxation. Highly recommend!",
    product: "PEMF Therapy Mat",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Fitness Coach",
    avatar: "LA",
    rating: 5,
    review: "NeuroState's products are game-changers. The customer service is excellent, delivery was fast, and the quality exceeds expectations. I recommend them to all my clients.",
  },
  {
    id: 6,
    name: "David Kumar",
    role: "Health Optimiser",
    avatar: "DK",
    rating: 5,
    review: "The RestoreSleep Night formula has been a revelation. I fall asleep faster and wake up feeling genuinely refreshed. It's become an essential part of my evening routine.",
    product: "RestoreSleep Night",
  },
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
};

export const Testimonials = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="w-full px-6 sm:px-8 lg:px-20 xl:px-32">
        <div className="mb-12 space-y-4">
          <p className="text-[10px] sm:text-xs font-light text-muted-foreground tracking-[0.3em] uppercase">
            TESTIMONIALS
          </p>
          <h2 className="text-[1.875rem] font-semibold uppercase" style={{ lineHeight: '1.3' }}>
            What our customers say
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl font-light">
            Real reviews from real people who transformed their health and wellness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 bg-card hover:bg-card/80 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Rating */}
                <StarRating rating={testimonial.rating} />

                {/* Review Text */}
                <p className="text-muted-foreground leading-relaxed font-light text-sm">
                  "{testimonial.review}"
                </p>

                {/* Product Badge */}
                {testimonial.product && (
                  <div className="pt-2">
                    <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                      {testimonial.product}
                    </span>
                  </div>
                )}

                {/* Customer Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-border/30">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={testimonial.name} />
                    <AvatarFallback className="bg-accent/10 text-accent font-semibold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground font-light">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium">
              4.9/5 average rating from over 2,500+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
