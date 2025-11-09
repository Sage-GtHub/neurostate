import { Star } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  title: string;
  comment: string;
  created_at: string;
  verified_purchase: boolean;
}

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  if (reviews.length === 0) {
    return (
      <div className="bg-secondary/20 rounded-lg p-8 text-center">
        <p className="text-muted-foreground">
          No reviews yet. Be the first to review this product!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4 bg-secondary/20">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{review.user_name}</span>
                {review.verified_purchase && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
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
                  {format(new Date(review.created_at), "MMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>
          <h4 className="font-medium mb-2">{review.title}</h4>
          <p className="text-muted-foreground">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};
