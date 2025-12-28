import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Clock, Mail, MapPin } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const hero = useScrollAnimation();
  const content = useScrollAnimation();

  // Load Calendly widget script only once
  useEffect(() => {
    if (document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]')) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const contactInfo = [
    { icon: Mail, title: "Email", content: "contact@neurostate.co.uk", link: "mailto:contact@neurostate.co.uk" },
    { icon: Clock, title: "Hours", content: "Mon - Fri: 9am - 6pm GMT", link: null },
    { icon: MapPin, title: "Location", content: "London, UK", link: null },
  ];

  return (
    <>
      <SEO
        title="Book a Demo | Neurostate"
        description="Book a Neurostate demo call via Calendly, or contact our team by email."
      />
      <Header />

      <main className="min-h-screen bg-background mobile-nav-padding relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full bg-accent/[0.02] blur-3xl animate-float" />
        </div>

        <header
          ref={hero.ref}
          className={`relative pt-32 md:pt-44 pb-10 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${
            hero.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/40">Book a Demo</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground">Schedule your call</h1>
            <p className="text-sm text-foreground/50">Pick a time that works for you.</p>
          </div>
        </header>

        <section
          ref={content.ref}
          className={`py-10 md:py-14 px-6 md:px-12 lg:px-20 xl:px-32 transition-all duration-1000 ${
            content.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Calendly Embed */}
            <div
              className="calendly-inline-widget rounded-2xl overflow-hidden border border-border bg-background"
              data-url="https://calendly.com/sage-neurostate/30min?hide_gdpr_banner=1&background_color=ffffff&text_color=1a1a1a&primary_color=1a1a1a"
              style={{ minWidth: "320px", height: "820px" }}
            />

            {/* Contact info */}
            <section className="grid md:grid-cols-3 gap-4">
              {contactInfo.map((info, index) => (
                <article key={index} className="p-5 rounded-2xl bg-foreground/[0.02]">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="text-xs font-medium mb-1">{info.title}</p>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-xs text-foreground/50 hover:text-foreground transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-xs text-foreground/50">{info.content}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </section>

            <aside className="pt-2">
              <p className="text-[10px] text-foreground/30 mb-3">Quick links</p>
              <div className="flex flex-wrap gap-3">
                {[{ name: "FAQ", href: "/faq" }, { name: "Shipping", href: "/shipping" }].map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="px-3 py-1.5 rounded-full bg-foreground/[0.03] text-[10px] text-foreground/50 hover:bg-foreground/[0.06] hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Contact;

