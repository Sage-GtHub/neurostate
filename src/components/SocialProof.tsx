import { Users, Package, Shield, Award } from "lucide-react";

const stats = [
  {
    value: "50,000+",
    label: "Active customers"
  },
  {
    value: "100,000+",
    label: "Orders delivered"
  },
  {
    value: "100%",
    label: "Third-party tested"
  },
  {
    value: "4.8/5",
    label: "Average rating"
  }
];

export const SocialProof = () => {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32 bg-ivory border-t border-b border-mist">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
            >
              <div className="text-[2rem] md:text-[2.5rem] font-normal mb-2 text-carbon">{stat.value}</div>
              <div className="text-[0.75rem] tracking-[0.05em] uppercase text-stone">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
