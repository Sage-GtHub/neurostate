import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface FilterState {
  categories: string[];
  sortBy: 'featured' | 'price-low-high' | 'price-high-low' | 'newest';
  features: string[];
  tags: string[];
  availability: 'all' | 'in-stock' | 'out-of-stock';
}

interface ProductFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  isMobile?: boolean;
  availableTags: string[];
}

const categories = [
  { id: "supplements", label: "Supplements" },
  { id: "recovery", label: "Recovery Devices" },
  { id: "sleep", label: "Sleep Aids" },
  { id: "cognitive", label: "Cognitive Support" },
];

const features = [
  { id: "third-party-tested", label: "Third-Party Tested" },
  { id: "nsf-certified", label: "NSF Certified" },
  { id: "vegan", label: "Vegan Friendly" },
  { id: "gluten-free", label: "Gluten Free" },
  { id: "non-gmo", label: "Non-GMO" },
];

const ProductFiltersContent = ({ filters, onFiltersChange, onClearFilters, availableTags }: ProductFiltersProps) => {
  const [categoryOpen, setCategoryOpen] = useState(true);
  const [sortOpen, setSortOpen] = useState(true);
  const [featuresOpen, setFeaturesOpen] = useState(true);
  const [tagsOpen, setTagsOpen] = useState(true);
  const [availabilityOpen, setAvailabilityOpen] = useState(true);

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, categoryId]
      : filters.categories.filter(c => c !== categoryId);
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const handleFeatureChange = (featureId: string, checked: boolean) => {
    const newFeatures = checked
      ? [...filters.features, featureId]
      : filters.features.filter(f => f !== featureId);
    onFiltersChange({ ...filters, features: newFeatures });
  };

  const handleTagChange = (tagId: string, checked: boolean) => {
    const newTags = checked
      ? [...filters.tags, tagId]
      : filters.tags.filter(t => t !== tagId);
    onFiltersChange({ ...filters, tags: newTags });
  };

  const handleAvailabilityChange = (value: string) => {
    onFiltersChange({ ...filters, availability: value as FilterState['availability'] });
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value as FilterState['sortBy'] });
  };

  const activeFiltersCount = 
    filters.categories.length + 
    filters.features.length + 
    filters.tags.length + 
    (filters.availability !== 'all' ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-sm"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="font-medium">Category</span>
          <ChevronDown className={`h-4 w-4 transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label
                htmlFor={category.id}
                className="text-sm font-normal cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Sort By */}
      <div className="border-t pt-6">
        <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Sort by Price</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3">
            <RadioGroup value={filters.sortBy} onValueChange={handleSortChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="featured" id="featured" />
                <Label htmlFor="featured" className="text-sm font-normal cursor-pointer">
                  Featured
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-low-high" id="price-low-high" />
                <Label htmlFor="price-low-high" className="text-sm font-normal cursor-pointer">
                  Price: Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="price-high-low" id="price-high-low" />
                <Label htmlFor="price-high-low" className="text-sm font-normal cursor-pointer">
                  Price: High to Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest" className="text-sm font-normal cursor-pointer">
                  Newest
                </Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="border-t pt-6">
        <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Features</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-2">
                <Checkbox
                  id={feature.id}
                  checked={filters.features.includes(feature.id)}
                  onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                />
                <Label
                  htmlFor={feature.id}
                  className="text-sm font-normal cursor-pointer"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Tags Filter */}
      {availableTags.length > 0 && (
        <div className="border-t pt-6">
          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <span className="font-medium">Tags</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${tagsOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 pt-3">
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={filters.tags.includes(tag) ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => handleTagChange(tag, !filters.tags.includes(tag))}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Availability Filter */}
      <div className="border-t pt-6">
        <Collapsible open={availabilityOpen} onOpenChange={setAvailabilityOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="font-medium">Availability</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${availabilityOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-3">
            <RadioGroup value={filters.availability} onValueChange={handleAvailabilityChange}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-sm font-normal cursor-pointer">
                  All Products
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-stock" id="in-stock" />
                <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                <Label htmlFor="out-of-stock" className="text-sm font-normal cursor-pointer">
                  Out of Stock
                </Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export const ProductFilters = (props: ProductFiltersProps) => {
  if (props.isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
            {(props.filters.categories.length + props.filters.features.length + props.filters.tags.length + (props.filters.availability !== 'all' ? 1 : 0) + (props.filters.sortBy !== 'featured' ? 1 : 0)) > 0 && (
              <span className="ml-1 rounded-full bg-primary text-primary-foreground w-5 h-5 text-xs flex items-center justify-center">
                {props.filters.categories.length + props.filters.features.length + props.filters.tags.length + (props.filters.availability !== 'all' ? 1 : 0) + (props.filters.sortBy !== 'featured' ? 1 : 0)}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ProductFiltersContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-20 bg-background border rounded-lg p-6">
        <ProductFiltersContent {...props} />
      </div>
    </div>
  );
};
