import { Shield, Award, FlaskConical } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-carbon" />,
      title: "Third-Party Tested"
    },
    {
      icon: <Award className="h-5 w-5 text-carbon" />,
      title: "Money-Back Guarantee"
    },
    {
      icon: <FlaskConical className="h-5 w-5 text-carbon" />,
      title: "Science Backed"
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 border-y border-mist/20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
        <div className="flex justify-center items-center gap-8 sm:gap-12 md:gap-16 lg:gap-24 xl:gap-32 flex-wrap">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3 group">
              <div className="w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {benefit.icon}
              </div>
              <span className="text-caption text-carbon/70 tracking-wide">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
