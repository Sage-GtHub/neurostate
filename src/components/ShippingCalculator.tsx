import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Package, Clock, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ShippingRate {
  name: string;
  price: string;
  delivery: string;
  icon: typeof Truck;
  free?: boolean;
  freeThreshold?: number;
}

interface ShippingRegion {
  name: string;
  rates: ShippingRate[];
}

const shippingData: Record<string, ShippingRegion> = {
  "uk": {
    name: "United Kingdom",
    rates: [
      {
        name: "Standard Delivery",
        price: "£4.95",
        delivery: "2-3 working days",
        icon: Package,
        free: true,
        freeThreshold: 50,
      },
      {
        name: "Express Delivery",
        price: "£8.95",
        delivery: "1-2 working days",
        icon: Truck,
      },
      {
        name: "Next Day Delivery",
        price: "£12.95",
        delivery: "Order before 2pm",
        icon: Clock,
      },
    ],
  },
  "europe": {
    name: "Europe",
    rates: [
      {
        name: "Standard Delivery",
        price: "£9.95",
        delivery: "5-7 working days",
        icon: Package,
        free: true,
        freeThreshold: 100,
      },
    ],
  },
  "us-canada": {
    name: "USA & Canada",
    rates: [
      {
        name: "Standard Delivery",
        price: "£14.95",
        delivery: "7-10 working days",
        icon: Package,
        free: true,
        freeThreshold: 150,
      },
    ],
  },
  "rest-of-world": {
    name: "Rest of World",
    rates: [
      {
        name: "Standard Delivery",
        price: "£19.95",
        delivery: "10-14 working days",
        icon: Package,
      },
    ],
  },
};

interface ShippingCalculatorProps {
  productPrice?: number;
  className?: string;
}

export const ShippingCalculator = ({ productPrice = 0, className = "" }: ShippingCalculatorProps) => {
  const [selectedRegion, setSelectedRegion] = useState<string>("uk");

  const region = shippingData[selectedRegion];
  
  const freeShippingRate = region?.rates.find(rate => rate.free && rate.freeThreshold);
  const freeShippingThreshold = freeShippingRate?.freeThreshold || 0;
  const isEligibleForFreeShipping = freeShippingThreshold > 0 && productPrice >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold > 0 ? Math.max(0, freeShippingThreshold - productPrice) : 0;
  const progressPercentage = freeShippingThreshold > 0 ? Math.min(100, (productPrice / freeShippingThreshold) * 100) : 0;

  return (
    <div className={`${className}`}>
      <h3 className="text-[1.125rem] font-normal text-carbon mb-6">Shipping</h3>

      <div className="space-y-6">
        {freeShippingThreshold > 0 && (
          <div className="space-y-3 pb-6 border-b border-mist">
            <div className="flex items-center justify-between text-[0.875rem]">
              <span className="text-stone">Free shipping progress</span>
              <span className="text-carbon">
                {isEligibleForFreeShipping ? (
                  <span>Eligible</span>
                ) : (
                  <span>£{remainingForFreeShipping.toFixed(2)} to go</span>
                )}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-1" />
          </div>
        )}
        <div className="space-y-3">
          <Label htmlFor="region" className="text-[0.875rem] font-normal text-carbon flex items-center gap-2">
            <MapPin className="h-4 w-4 text-stone" />
            Select your location
          </Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger id="region" className="w-full border-mist">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(shippingData).map(([key, data]) => (
                <SelectItem key={key} value={key}>
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {region && (
          <div className="space-y-3 pt-3">
            <p className="text-[0.875rem] text-stone">Available options:</p>
            {region.rates.map((rate, index) => {
              const Icon = rate.icon;
              const isFree = rate.free && productPrice >= (rate.freeThreshold || 0);
              
              return (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-mist bg-background hover:bg-ivory transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-stone mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[0.875rem] font-normal text-carbon">{rate.name}</p>
                      <p className="text-[0.75rem] text-stone">{rate.delivery}</p>
                      {rate.free && !isFree && (
                        <p className="text-[0.75rem] text-stone mt-1">
                          Free on orders over £{rate.freeThreshold}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {isFree ? (
                      <span className="text-[0.875rem] text-carbon">FREE</span>
                    ) : (
                      <p className="text-[0.875rem] text-carbon">{rate.price}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-3 border-t border-mist">
          <p className="text-[0.75rem] text-stone">
            Final shipping cost calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
};
