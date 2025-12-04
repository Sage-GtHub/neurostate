import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background mobile-nav-padding">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          
          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using NeuroState® website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Permission is granted to temporarily download one copy of the materials (information or software) on NeuroState®'s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display (commercial or non-commercial)</li>
                <li>Attempt to decompile or reverse engineer any software contained on NeuroState®'s website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Product Information and Pricing</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We strive to provide accurate product descriptions and pricing information. However:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>We do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free</li>
                <li>If a product offered by NeuroState® is not as described, your sole remedy is to return it in unused condition</li>
                <li>We reserve the right to modify or discontinue products without notice</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to limit quantities purchased per person or per order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Orders and Payments</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                By placing an order, you warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You are legally capable of entering into binding contracts</li>
                <li>You are at least 18 years of age</li>
                <li>All information you provide is accurate and complete</li>
                <li>Payment information provided is your own and you have sufficient funds</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to refuse or cancel any order for any reason including limitations on quantities available for purchase, inaccuracies or errors in product or pricing information, or problems identified by our fraud prevention department.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Shipping and Delivery</h2>
              <p className="text-muted-foreground leading-relaxed">
                Delivery times are estimates only and commence from the date of dispatch. We are not responsible for delays caused by customs, weather conditions, or other circumstances beyond our control. Title and risk of loss pass to you upon delivery to the carrier. For detailed shipping information, please visit our <Link to="/shipping" className="text-primary hover:underline">Shipping & Returns</Link> page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Returns and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer a 30-day money-back guarantee on most products. Items must be returned in original condition with all packaging and documentation. Certain products may not be eligible for return due to hygiene or safety reasons. For full details, please see our <Link to="/shipping" className="text-primary hover:underline">Returns Policy</Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Subscription Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our subscription service ("Subscribe & Save") provides automatic recurring deliveries at discounted prices. By enrolling in a subscription, you authorize us to charge your payment method on a recurring basis. You may cancel your subscription at any time through your account settings or by contacting customer support. Cancellations take effect at the end of the current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Health and Safety Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                <strong>Important:</strong> Our products are designed to support general wellness and are not intended to diagnose, treat, cure, or prevent any disease or medical condition.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Always consult with a qualified healthcare professional before starting any new supplement regimen or wellness program</li>
                <li>If you are pregnant, nursing, taking medication, or have a medical condition, consult your physician before use</li>
                <li>Individual results may vary</li>
                <li>Testimonials and reviews are individual experiences and do not guarantee similar results</li>
                <li>Follow all product instructions and safety guidelines</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on this website, including text, graphics, logos, images, and software, is the property of NeuroState® or its content suppliers and is protected by UK and international copyright laws. The NeuroState® name and logo are registered trademarks and may not be used without express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. User Accounts</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Maintaining the confidentiality of your account and password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use of your account</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We reserve the right to suspend or terminate accounts that violate these terms or engage in fraudulent activity.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. User-Generated Content</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                If you submit reviews, comments, or other content to our website, you grant NeuroState® a non-exclusive, royalty-free, perpetual, and worldwide license to use, reproduce, modify, and display such content. You represent and warrant that:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>You own or have the right to submit the content</li>
                <li>The content does not violate any third-party rights</li>
                <li>The content is not defamatory, obscene, or otherwise unlawful</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                NeuroState®, its directors, employees, partners, agents, suppliers, or affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Indemnification</h2>
              <p className="text-muted-foreground leading-relaxed">
                You agree to defend, indemnify, and hold harmless NeuroState® and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt, and expenses arising from: (i) your use of the website; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right; or (iv) any claim that your content caused damage to a third party.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms shall be governed and construed in accordance with the laws of England and Wales, without regard to its conflict of law provisions. Any disputes arising from these terms or your use of our services shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">15. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">16. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <p className="text-muted-foreground">
                  <strong>NeuroState®</strong><br />
                  Email: contact@neurostate.co.uk<br />
                  Address: 123 Buckingham Palace Rd, London SW1W 9SH, United Kingdom
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <p className="text-sm text-muted-foreground">
                By using our website and purchasing our products, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
