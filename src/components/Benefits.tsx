import { Shield, Award } from "lucide-react";

export const Benefits = () => {
  const benefits = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Money-Back Guarantee"
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Third-Party Tested"
    }
  ];

  return (
    <section className="py-12 px-4 border-t">
      <div className="container mx-auto">
        <div className="flex justify-center items-center gap-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="text-accent">
                {benefit.icon}
              </div>
              <span className="font-medium text-sm">{benefit.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
