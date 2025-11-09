import { Shield, Award, FlaskConical } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-5 w-5 text-accent" />,
      title: "Third-Party Tested"
    },
    {
      icon: <Award className="h-5 w-5 text-accent" />,
      title: "Money-Back Guarantee"
    },
    {
      icon: <FlaskConical className="h-5 w-5 text-accent" />,
      title: "Science Backed"
    }
  ];

  return (
    <section className="py-8 px-4 border-t bg-background">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-16 flex-wrap">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              {benefit.icon}
              <span className="font-medium text-sm">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
