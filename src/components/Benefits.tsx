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
    <section className="py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32">
        <div className="flex justify-center items-center gap-6 sm:gap-8 md:gap-12 lg:gap-20 xl:gap-32 flex-wrap">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 sm:gap-3">
              {benefit.icon}
              <span className="text-ui-label text-[0.625rem] sm:text-xs">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
