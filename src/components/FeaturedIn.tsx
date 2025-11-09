export const FeaturedIn = () => {
  const mediaLogos = [
    { name: "Forbes", width: "w-20" },
    { name: "Men's Health", width: "w-24" },
    { name: "BBC", width: "w-16" },
    { name: "GQ", width: "w-12" },
    { name: "The Guardian", width: "w-28" },
    { name: "Vogue", width: "w-20" }
  ];

  return (
    <div className="py-8 border-y bg-secondary/5">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider">
          As Featured In
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
          {mediaLogos.map((logo) => (
            <div
              key={logo.name}
              className={`${logo.width} h-8 flex items-center justify-center grayscale hover:grayscale-0 transition-all`}
            >
              <div className="text-center font-bold text-foreground/80 text-sm md:text-base">
                {logo.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
