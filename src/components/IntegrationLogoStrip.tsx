import { motion } from "framer-motion";

import ouraLogo from "@/assets/wearables/oura-logo.png";
import whoopLogo from "@/assets/wearables/whoop-logo.png";
import garminLogo from "@/assets/wearables/garmin-logo.png";
import appleHealthLogo from "@/assets/wearables/apple-health-logo.png";
import fitbitLogo from "@/assets/wearables/fitbit-logo.png";
import samsungLogo from "@/assets/wearables/samsung-logo.png";
import polarLogo from "@/assets/wearables/polar-logo.png";
import withingsLogo from "@/assets/wearables/withings-logo.png";

const integrations = [
  { name: "Apple Health", logo: appleHealthLogo },
  { name: "Oura", logo: ouraLogo },
  { name: "Whoop", logo: whoopLogo },
  { name: "Garmin", logo: garminLogo },
  { name: "Fitbit", logo: fitbitLogo },
  { name: "Samsung", logo: samsungLogo },
  { name: "Polar", logo: polarLogo },
  { name: "Withings", logo: withingsLogo },
];

export function IntegrationLogoStrip() {
  return (
    <section className="py-8 md:py-10 px-6 md:px-8 border-b border-border/30 bg-muted/20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p
          className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Integrates with the devices your team already wears
        </motion.p>
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.06 }}
            >
              <img
                src={item.logo}
                alt={item.name}
                className="h-6 md:h-7 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300 grayscale hover:grayscale-0"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
