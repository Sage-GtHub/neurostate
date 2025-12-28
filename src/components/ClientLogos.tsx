import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Using text-based logos for enterprise clients
const clients = [
  { name: "Microsoft", size: "text-sm" },
  { name: "Nasdaq", size: "text-sm" },
  { name: "Cohere", size: "text-sm" },
  { name: "AI21 Labs", size: "text-sm" },
  { name: "Swiss Gear", size: "text-sm" },
  { name: "Headway", size: "text-sm" },
];

export const ClientLogos = () => {
  const section = useScrollAnimation();

  return (
    <section 
      ref={section.ref}
      className={`py-16 px-6 md:px-8 transition-all duration-700 ${section.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50">
            Trusted by teams at
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 md:gap-x-16 lg:gap-x-20">
          {clients.map((client, i) => (
            <div 
              key={i}
              className="text-foreground/20 hover:text-foreground/40 transition-colors duration-300 cursor-default"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <span className={`font-medium tracking-wide ${client.size}`}>
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
