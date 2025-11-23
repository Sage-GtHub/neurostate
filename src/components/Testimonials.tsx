import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  review: string;
  product?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Wellness Enthusiast",
    avatar: "SM",
    review: "The Red Light Therapy Blanket has completely transformed my recovery routine. I feel more energised and my muscle soreness has reduced significantly. Absolutely worth the investment!",
    product: "Red Light Therapy Blanket",
  },
  {
    id: 2,
    name: "James Patterson",
    role: "Professional Athlete",
    avatar: "JP",
    review: "As a professional athlete, recovery is crucial. The CryoPlunge Ice Bath has become an essential part of my daily routine. The quality is outstanding and the results speak for themselves.",
    product: "CryoPlunge Ice Bath",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Yoga Instructor",
    avatar: "EC",
    review: "I've tried many supplements, but the Omega-3 Elite is by far the best. I notice the difference in my joint health and mental clarity. The quality standards are impressive.",
    product: "Omega-3 Elite",
  },
  {
    id: 4,
    name: "Michael Thompson",
    role: "Business Executive",
    avatar: "MT",
    review: "The PEMF Therapy Mat has helped me manage stress and improve my sleep quality. After long days at the office, it's my go-to for relaxation. Highly recommend!",
    product: "PEMF Therapy Mat",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Fitness Coach",
    avatar: "LA",
    review: "NeuroState's products are game-changers. The customer service is excellent, delivery was fast, and the quality exceeds expectations. I recommend them to all my clients.",
  },
  {
    id: 6,
    name: "David Kumar",
    role: "Health Optimiser",
    avatar: "DK",
    review: "The RestoreSleep Night formula has been a revelation. I fall asleep faster and wake up feeling genuinely refreshed. It's become an essential part of my evening routine.",
    product: "RestoreSleep Night",
  },
];


export const Testimonials = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24">
          <p className="ghost-number mb-3 sm:mb-4 md:mb-6">TESTIMONIALS</p>
          <h2 className="mb-4 sm:mb-6">Customer stories</h2>
          <p className="text-body-large text-ash max-w-2xl">
            Real experiences from people optimising their performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="space-y-6"
            >
              {/* Review Text - Primary focus */}
              <p className="text-[1rem] leading-relaxed text-ash">
                "{testimonial.review}"
              </p>

              {/* Product Badge - Subtle */}
              {testimonial.product && (
                <div>
                  <span className="text-[0.6875rem] font-medium tracking-wider uppercase text-stone">
                    {testimonial.product}
                  </span>
                </div>
              )}

              {/* Customer Info - Minimal */}
              <div className="flex items-center gap-4 pt-4">
                <div className="h-10 w-10 rounded-full bg-pearl flex items-center justify-center">
                  <span className="text-[0.75rem] font-medium text-carbon">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <p className="text-[0.9375rem] font-medium">{testimonial.name}</p>
                  <p className="text-[0.8125rem] text-stone">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
