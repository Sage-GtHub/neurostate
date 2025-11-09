import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Truck, Package, Clock, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  
  // Find the free shipping threshold for the selected region
  const freeShippingRate = region?.rates.find(rate => rate.free && rate.freeThreshold);
  const freeShippingThreshold = freeShippingRate?.freeThreshold || 0;
  const isEligibleForFreeShipping = freeShippingThreshold > 0 && productPrice >= freeShippingThreshold;
  const remainingForFreeShipping = freeShippingThreshold > 0 ? Math.max(0, freeShippingThreshold - productPrice) : 0;
  const progressPercentage = freeShippingThreshold > 0 ? Math.min(100, (productPrice / freeShippingThreshold) * 100) : 0;

  return (
    <Card className={`p-6 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Truck className="h-5 w-5 text-primary" />
        <h3 className="font-semibold">Estimate Shipping Cost</h3>
      </div>

      <div className="space-y-4">
        {/* Free Shipping Progress */}
        {freeShippingThreshold > 0 && (
          <div className="space-y-2 pb-4 border-b">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Free shipping progress</span>
              <span className="font-medium">
                {isEligibleForFreeShipping ? (
                  <span className="text-green-600">Eligible! 🎉</span>
                ) : (
                  <span>£{remainingForFreeShipping.toFixed(2)} to go</span>
                )}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            {!isEligibleForFreeShipping && (
              <p className="text-xs text-muted-foreground">
                Spend £{remainingForFreeShipping.toFixed(2)} more to get free {freeShippingRate?.name.toLowerCase()}
              </p>
            )}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="region" className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Select Your Location
          </Label>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger id="region" className="w-full">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(shippingData).map(([key, data]) => (
                <SelectItem key={key} value={key} className="cursor-pointer">
                  {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {region && (
          <div className="space-y-3 pt-2">
            <p className="text-sm text-muted-foreground">Available shipping options:</p>
            {region.rates.map((rate, index) => {
              const Icon = rate.icon;
              const isFree = rate.free && productPrice >= (rate.freeThreshold || 0);
              
              return (
                <div
                  key={index}
                  className="flex items-start justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{rate.name}</p>
                      <p className="text-xs text-muted-foreground">{rate.delivery}</p>
                      {rate.free && !isFree && (
                        <p className="text-xs text-primary mt-1">
                          Free on orders over £{rate.freeThreshold}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {isFree ? (
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                        FREE
                      </Badge>
                    ) : (
                      <p className="font-semibold text-sm">{rate.price}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="pt-2 border-t">
          <p className="text-xs text-muted-foreground">
            Final shipping cost calculated at checkout. International orders may be subject to customs duties.
          </p>
        </div>
      </div>
    </Card>
  );
};
