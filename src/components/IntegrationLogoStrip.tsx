import { motion } from "framer-motion";

import appleHealthLogo from "@/assets/wearables/apple-health-logo.png";
import ouraLogo from "@/assets/wearables/oura-logo.png";
import whoopLogo from "@/assets/wearables/whoop-logo.png";
import garminLogo from "@/assets/wearables/garmin-logo.png";
import fitbitLogo from "@/assets/wearables/fitbit-logo.png";
import samsungLogo from "@/assets/wearables/samsung-logo.png";
import polarLogo from "@/assets/wearables/polar-logo.png";
import withingsLogo from "@/assets/wearables/withings-logo.png";
import corosLogo from "@/assets/wearables/coros-logo.png";
import amazfitLogo from "@/assets/wearables/amazfit-logo.png";

const logos = [
  { name: "Apple Health", src: appleHealthLogo },
  { name: "Oura", src: ouraLogo },
  { name: "WHOOP", src: whoopLogo },
  { name: "Garmin", src: garminLogo },
  { name: "Fitbit", src: fitbitLogo },
  { name: "Samsung", src: samsungLogo },
  { name: "Polar", src: polarLogo },
  { name: "Withings", src: withingsLogo },
  { name: "COROS", src: corosLogo },
  { name: "Amazfit", src: amazfitLogo },
];

export function IntegrationLogoStrip() {
  return (
    <section className="py-10 md:py-14 border-y border-border/30 overflow-hidden bg-background">
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling marquee */}
        <motion.div
          className="flex items-center gap-16 md:gap-20 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-7 md:h-8 w-auto object-contain opacity-35 hover:opacity-60 transition-opacity duration-300 grayscale flex-shrink-0 select-none"
              draggable={false}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
