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
    <section className="py-16 md:py-20">
      <div className="w-full px-6 sm:px-8 lg:px-20 xl:px-32">
        <div className="flex justify-center items-center gap-12 md:gap-20 lg:gap-32 flex-wrap">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-3">
              {benefit.icon}
              <span className="text-ui-label">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
