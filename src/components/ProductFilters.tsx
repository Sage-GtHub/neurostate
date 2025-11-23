import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
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
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [tagsOpen, setTagsOpen] = useState(false);
  const [availabilityOpen, setAvailabilityOpen] = useState(false);

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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <p className="text-[0.75rem] font-medium tracking-[0.05em] uppercase text-carbon">Filters</p>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="text-[0.75rem]"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Category Filter */}
      <Collapsible open={categoryOpen} onOpenChange={setCategoryOpen}>
        <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
          <span className="text-[0.875rem] font-medium text-carbon">Category</span>
          <ChevronDown className={`h-4 w-4 text-stone transition-transform ${categoryOpen ? 'rotate-180' : ''}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-3 pt-4">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-3">
              <Checkbox
                id={category.id}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
              />
              <Label
                htmlFor={category.id}
                className="text-[0.875rem] font-normal text-ash cursor-pointer"
              >
                {category.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Sort By */}
      <div className="border-t border-mist pt-8">
        <Collapsible open={sortOpen} onOpenChange={setSortOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="text-[0.875rem] font-medium text-carbon">Sort</span>
            <ChevronDown className={`h-4 w-4 text-stone transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            <RadioGroup value={filters.sortBy} onValueChange={handleSortChange}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="featured" id="featured" />
                <Label htmlFor="featured" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  Featured
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="price-low-high" id="price-low-high" />
                <Label htmlFor="price-low-high" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  Price: Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="price-high-low" id="price-high-low" />
                <Label htmlFor="price-high-low" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  Price: High to Low
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="newest" id="newest" />
                <Label htmlFor="newest" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  Newest
                </Label>
              </div>
            </RadioGroup>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Other filters collapsed by default for minimal feel */}
      <div className="border-t border-mist pt-8">
        <Collapsible open={featuresOpen} onOpenChange={setFeaturesOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="text-[0.875rem] font-medium text-carbon">Features</span>
            <ChevronDown className={`h-4 w-4 text-stone transition-transform ${featuresOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            {features.map((feature) => (
              <div key={feature.id} className="flex items-center space-x-3">
                <Checkbox
                  id={feature.id}
                  checked={filters.features.includes(feature.id)}
                  onCheckedChange={(checked) => handleFeatureChange(feature.id, checked as boolean)}
                />
                <Label
                  htmlFor={feature.id}
                  className="text-[0.875rem] font-normal text-ash cursor-pointer"
                >
                  {feature.label}
                </Label>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {availableTags.length > 0 && (
        <div className="border-t border-mist pt-8">
          <Collapsible open={tagsOpen} onOpenChange={setTagsOpen}>
            <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
              <span className="text-[0.875rem] font-medium text-carbon">Tags</span>
              <ChevronDown className={`h-4 w-4 text-stone transition-transform ${tagsOpen ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-4">
              <div className="flex flex-wrap gap-2">
                {availableTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagChange(tag, !filters.tags.includes(tag))}
                    className={`text-[0.75rem] px-3 py-1 rounded-full transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-carbon text-ivory'
                        : 'bg-transparent text-ash border border-mist hover:border-carbon'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      <div className="border-t border-mist pt-8">
        <Collapsible open={availabilityOpen} onOpenChange={setAvailabilityOpen}>
          <CollapsibleTrigger className="flex w-full items-center justify-between py-2">
            <span className="text-[0.875rem] font-medium text-carbon">Availability</span>
            <ChevronDown className={`h-4 w-4 text-stone transition-transform ${availabilityOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            <RadioGroup value={filters.availability} onValueChange={handleAvailabilityChange}>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="all" id="all" />
                <Label htmlFor="all" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  All Products
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="in-stock" id="in-stock" />
                <Label htmlFor="in-stock" className="text-[0.875rem] font-normal text-ash cursor-pointer">
                  In Stock Only
                </Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="out-of-stock" id="out-of-stock" />
                <Label htmlFor="out-of-stock" className="text-[0.875rem] font-normal text-ash cursor-pointer">
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
          <Button variant="ghost" size="sm" className="gap-2 text-[0.75rem]">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          <div className="mt-8">
            <ProductFiltersContent {...props} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="w-64 flex-shrink-0">
      <div className="sticky top-24">
        <ProductFiltersContent {...props} />
      </div>
    </div>
  );
};
