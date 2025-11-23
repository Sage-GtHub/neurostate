import { useState } from "react";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface CustomerReviewsProps {
  productHandle: string;
}

export const CustomerReviews = ({ productHandle }: CustomerReviewsProps) => {
  const [sortBy, setSortBy] = useState<"recent" | "helpful" | "rating">("recent");

  // Mock data - in production, fetch from your reviews API
  const reviews = [
    {
      id: 1,
      author: "Sarah M.",
      verified: true,
      rating: 5,
      date: "2024-01-15",
      title: "Game changer for focus",
      content: "I've been using this for 3 months now and the difference in my cognitive performance is remarkable. No jitters, just clean sustained focus throughout the day.",
      helpful: 24
    },
    {
      id: 2,
      author: "James P.",
      verified: true,
      rating: 5,
      date: "2024-01-10",
      title: "Excellent quality",
      content: "Third-party tested and you can really feel the difference. Great for demanding work days when I need peak mental performance.",
      helpful: 18
    },
    {
      id: 3,
      author: "Emily R.",
      verified: true,
      rating: 4,
      date: "2024-01-05",
      title: "Good product, takes time",
      content: "Solid supplement but took about 2-3 weeks to notice the full effects. Worth the patience though, my memory and focus have improved.",
      helpful: 12
    }
  ];

  const averageRating = 4.8;
  const totalReviews = reviews.length;
  
  const ratingDistribution = [
    { stars: 5, percentage: 85, count: 156 },
    { stars: 4, percentage: 10, count: 18 },
    { stars: 3, percentage: 3, count: 5 },
    { stars: 2, percentage: 1, count: 2 },
    { stars: 1, percentage: 1, count: 1 }
  ];

  return (
    <div className="py-16 md:py-24">
      <div className="mb-12">
        <h3 className="mb-8">What people say</h3>
        <p className="text-[0.9375rem] text-ash">{totalReviews} verified reviews</p>
      </div>


      {/* Review List */}
      <div className="space-y-12">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-mist pb-12 last:border-0 last:pb-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[0.9375rem] font-medium text-carbon mb-1">{review.author}</p>
                <p className="text-[0.8125rem] text-stone">
                  {new Date(review.date).toLocaleDateString('en-GB', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
            <h4 className="text-[1.125rem] font-medium mb-3 text-carbon">{review.title}</h4>
            <p className="text-[0.9375rem] text-ash leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
