import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { Benefits } from "@/components/Benefits";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <section id="products" className="py-16 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Best Sellers
              </h2>
              <a href="#products" className="text-sm font-medium text-accent hover:underline">
                View All
              </a>
            </div>
            <ProductGrid />
          </div>
        </section>
        <Benefits />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
