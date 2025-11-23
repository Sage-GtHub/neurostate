import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImageGalleryProps {
  images: Array<{
    url: string;
    altText: string | null;
  }>;
  productTitle: string;
}

export const ProductImageGallery = ({ images, productTitle }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) {
    return (
      <div className="aspect-square bg-ivory flex items-center justify-center">
        <span className="text-stone text-[0.875rem]">No image</span>
      </div>
    );
  }

  return (
    <div className="space-y-3 sticky top-4">
      <div className="relative aspect-square overflow-hidden bg-ivory group">
        <img
          src={images[selectedImage].url}
          alt={images[selectedImage].altText || productTitle}
          className="w-full h-full object-contain p-12"
        />
        
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
              onClick={prevImage}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background"
              onClick={nextImage}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`aspect-square overflow-hidden bg-ivory border transition-all ${
                selectedImage === index
                  ? "border-carbon"
                  : "border-transparent hover:border-mist"
              }`}
            >
              <img
                src={image.url}
                alt={image.altText || `${productTitle} ${index + 1}`}
                className="w-full h-full object-contain p-3"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
