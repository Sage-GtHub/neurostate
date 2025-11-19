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
    <section className="py-8 md:py-12 px-4 bg-ivory">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-8 md:gap-16 lg:gap-24 flex-wrap">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.icon}
              <span className="font-normal text-xs sm:text-sm uppercase tracking-wider text-carbon">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
