import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { Shield, Lock, Eye, UserCheck, Database, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const highlights = [
    { icon: Shield, text: "We never sell your data" },
    { icon: Lock, text: "Bank-level encryption" },
    { icon: Eye, text: "Full transparency" },
    { icon: UserCheck, text: "You control your data" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          
          {/* Key Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 bg-muted/30 rounded-lg">
            {highlights.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center gap-2">
                <item.icon className="h-8 w-8 text-primary" />
                <p className="text-xs font-medium">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="prose prose-slate max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At NeuroState®, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                1. Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We collect information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Register an account:</strong> Name, email address, password, date of birth</li>
                <li><strong>Place an order:</strong> Billing and shipping address, phone number, payment information</li>
                <li><strong>Subscribe to our newsletter:</strong> Email address, preferences</li>
                <li><strong>Contact customer support:</strong> Name, email, phone number, message content</li>
                <li><strong>Leave a review:</strong> Name, email, review content, rating</li>
                <li><strong>Participate in surveys or promotions:</strong> Information relevant to the specific activity</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
              <p className="text-muted-foreground leading-relaxed mb-3">
                When you visit our website, we automatically collect certain information about your device, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>IP address and device identifiers</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Referring URLs and pages visited</li>
                <li>Time spent on pages</li>
                <li>Click data and site navigation patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h3 className="text-xl font-semibold mb-3 mt-6">Payment Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                Payment information is processed securely through our payment processor. We do not store complete credit card numbers on our servers. We may store the last four digits of your card number and card type for reference purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Order Processing:</strong> To process and fulfill your orders, manage payments, and arrange shipping</li>
                <li><strong>Customer Service:</strong> To respond to your inquiries, provide support, and handle returns or exchanges</li>
                <li><strong>Account Management:</strong> To create and maintain your account, including managing subscriptions and preferences</li>
                <li><strong>Marketing Communications:</strong> To send you promotional emails, newsletters, and special offers (you can opt out at any time)</li>
                <li><strong>Personalization:</strong> To provide personalized product recommendations and improve your shopping experience</li>
                <li><strong>Analytics:</strong> To understand how customers use our site and improve our services</li>
                <li><strong>Security:</strong> To detect, prevent, and address fraud, security issues, or technical problems</li>
                <li><strong>Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              
              <h3 className="text-xl font-semibold mb-3 mt-6">Types of Cookies We Use:</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., shopping cart, account login)</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functional Cookies:</strong> Remember your preferences and personalize your experience</li>
                <li><strong>Marketing Cookies:</strong> Track your browsing habits to show relevant advertisements</li>
              </ul>
              
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We do not sell, trade, or rent your personal information to third parties. We may share your information with:
              </p>
              
              <ul className="list-disc pl-6 space-y-3 text-muted-foreground">
                <li>
                  <strong>Service Providers:</strong> Third-party companies that perform services on our behalf (e.g., payment processing, shipping, email delivery, data analytics). These providers are contractually obligated to protect your information.
                </li>
                <li>
                  <strong>Business Transfers:</strong> If NeuroState® is involved in a merger, acquisition, or asset sale, your information may be transferred as part of that transaction.
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process, or when we believe disclosure is necessary to protect our rights, protect your safety or the safety of others, investigate fraud, or comply with a legal obligation.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information for any other purpose disclosed to you with your consent.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-6 w-6 text-primary" />
                5. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                We implement appropriate technical and organizational security measures to protect your personal information, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>SSL/TLS encryption for data transmission</li>
                <li>Secure servers with firewall protection</li>
                <li>Regular security audits and updates</li>
                <li>Restricted access to personal data</li>
                <li>Employee training on data protection</li>
                <li>Secure payment processing through PCI-compliant providers</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <UserCheck className="h-6 w-6 text-primary" />
                6. Your Rights and Choices
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                You have several rights regarding your personal information:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Access and Portability</h4>
                  <p className="text-muted-foreground text-sm">You can request a copy of your personal data in a portable format.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Correction</h4>
                  <p className="text-muted-foreground text-sm">You can update or correct inaccurate information through your account settings or by contacting us.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Deletion</h4>
                  <p className="text-muted-foreground text-sm">You can request deletion of your personal data, subject to certain legal exceptions.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Marketing Opt-Out</h4>
                  <p className="text-muted-foreground text-sm">You can unsubscribe from marketing emails by clicking the "unsubscribe" link in any email or updating your preferences in your account.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Cookie Management</h4>
                  <p className="text-muted-foreground text-sm">You can control cookies through your browser settings.</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Object to Processing</h4>
                  <p className="text-muted-foreground text-sm">You can object to certain types of data processing, such as direct marketing.</p>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed mt-4">
                To exercise any of these rights, please contact us at privacy@neurostate.co.uk. We will respond to your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it. Order and transaction data may be retained for accounting and legal compliance purposes for up to 7 years.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us, and we will take steps to delete such information from our systems.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and maintained on computers located outside of your country where data protection laws may differ. By using our website, you consent to the transfer of your information to the United Kingdom and other countries where we operate. We ensure appropriate safeguards are in place to protect your information in accordance with this privacy policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For significant changes, we will provide more prominent notice (including email notification). You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                12. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="p-6 bg-muted/30 rounded-lg space-y-3">
                <p className="text-muted-foreground">
                  <strong>Data Protection Officer</strong><br />
                  NeuroState®<br />
                  Email: privacy@neurostate.co.uk<br />
                  Address: 123 Buckingham Palace Rd, London SW1W 9SH, United Kingdom
                </p>
                <p className="text-sm text-muted-foreground mt-4">
                  For data protection complaints, you also have the right to lodge a complaint with the UK Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ico.org.uk</a>
                </p>
              </div>
            </section>

            <section className="border-t pt-6">
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Our Commitment to You
                </h3>
                <p className="text-sm text-muted-foreground">
                  At NeuroState®, protecting your privacy is fundamental to how we operate. We are committed to transparency, security, and giving you control over your personal information. If you ever have concerns about how we handle your data, we want to hear from you.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
