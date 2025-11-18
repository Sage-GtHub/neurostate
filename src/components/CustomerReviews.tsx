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
    <div className="py-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Customer Reviews</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(averageRating)
                      ? "fill-accent text-accent"
                      : "fill-none text-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
            <span className="text-2xl font-bold">{averageRating}</span>
            <span className="text-muted-foreground">({totalReviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Rating Distribution */}
        <div className="space-y-3">
          <h3 className="font-semibold mb-4">Rating Distribution</h3>
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16 text-sm">
                <span>{item.stars}</span>
                <Star className="h-3 w-3 fill-accent text-accent" />
              </div>
              <Progress value={item.percentage} className="flex-1 h-2" />
              <span className="text-sm text-muted-foreground w-8">{item.count}</span>
            </div>
          ))}
        </div>

        {/* Review Highlights */}
        <div className="lg:col-span-2 grid md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-accent mb-1">4.8/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-accent mb-1">96%</div>
            <div className="text-sm text-muted-foreground">Would Recommend</div>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl font-bold text-accent mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Verified Purchases</div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center gap-2 mb-6 pb-4">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <Button
          variant={sortBy === "recent" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("recent")}
        >
          Most Recent
        </Button>
        <Button
          variant={sortBy === "helpful" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("helpful")}
        >
          Most Helpful
        </Button>
        <Button
          variant={sortBy === "rating" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSortBy("rating")}
        >
          Highest Rating
        </Button>
      </div>

      {/* Review List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  {review.verified && (
                    <span className="flex items-center gap-1 text-xs text-accent">
                      <CheckCircle className="h-3 w-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-accent text-accent"
                            : "fill-none text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(review.date).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-muted-foreground mb-3">{review.content}</p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-xs">
                <ThumbsUp className="h-3 w-3 mr-1" />
                Helpful ({review.helpful})
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="mt-8 text-center">
        <Button size="lg" variant="outline">
          Write a Review
        </Button>
      </div>
    </div>
  );
};
