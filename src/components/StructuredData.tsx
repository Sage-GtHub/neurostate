import { useEffect } from 'react';

interface ProductStructuredDataProps {
  product: {
    name: string;
    description: string;
    image: string;
    price: string;
    currency: string;
    availability: 'InStock' | 'OutOfStock';
    rating?: number;
    reviewCount?: number;
    brand: string;
    sku?: string;
  };
}

export const ProductStructuredData = ({ product }: ProductStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": product.name,
      "description": product.description,
      "image": product.image,
      "brand": {
        "@type": "Brand",
        "name": product.brand
      },
      "offers": {
        "@type": "Offer",
        "price": product.price,
        "priceCurrency": product.currency,
        "availability": `https://schema.org/${product.availability}`,
        "url": window.location.href
      },
      ...(product.sku && { "sku": product.sku }),
      ...(product.rating && product.reviewCount && {
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount
        }
      })
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'product-structured-data';
    
    const existing = document.getElementById('product-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('product-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [product]);

  return null;
};

export const OrganizationStructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "NeuroState",
      "alternateName": "NeuroState®",
      "url": "https://neurostate.co.uk",
      "logo": "https://neurostate.co.uk/favicon.png",
      "description": "NeuroState is the cognitive performance infrastructure for organisations. Predictive intelligence, risk visibility, and financial attribution for enterprise-scale human performance.",
      "foundingDate": "2025",
      "slogan": "Cognitive Infrastructure for Organisations",
      "knowsAbout": [
        "Cognitive Performance Infrastructure",
        "Enterprise Wellness Platform",
        "AI Performance Analytics",
        "Workforce Optimisation",
        "Predictive Intelligence",
        "Burnout Prevention",
        "Team Performance Monitoring",
        "Nova AI Assistant",
        "ROI Attribution"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@neurostate.co.uk",
        "contactType": "Customer Service",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.linkedin.com/company/neurostate",
        "https://www.instagram.com/neurostate"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB",
        "addressRegion": "London"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'organization-structured-data';
    
    const existing = document.getElementById('organization-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('organization-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const SoftwareApplicationStructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Nova AI",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "description": "Multi-model AI engine that forecasts cognitive performance using wearable data, behavioural signals, and predictive analytics for individuals and teams.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "GBP"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "1247"
      },
      "featureList": [
        "72-hour performance forecasting",
        "Cognitive load monitoring",
        "Wearable device integration",
        "ROI attribution analytics",
        "Team health dashboards",
        "Adaptive protocols"
      ],
      "provider": {
        "@type": "Organization",
        "name": "NeuroState"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'software-structured-data';
    
    const existing = document.getElementById('software-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('software-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const CorporateServiceStructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "NeuroState for Teams",
      "serviceType": "Corporate Wellbeing Solution",
      "description": "Enterprise cognitive performance platform transforming workforce performance with AI-driven protocols, recovery tools and supplements that improve focus, wellbeing and productivity.",
      "provider": {
        "@type": "Organization",
        "name": "NeuroState"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Enterprise Plans",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Corporate Wellness Programme"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sports Organisation Programme"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Health Clubs Programme"
            }
          }
        ]
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'corporate-service-structured-data';
    
    const existing = document.getElementById('corporate-service-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('corporate-service-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const LocalBusinessStructuredData = () => {
  useEffect(() => {
    const localBusinessData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://neurostate.co.uk/#organization",
      "name": "NeuroState",
      "alternateName": "NeuroState®",
      "url": "https://neurostate.co.uk",
      "logo": "https://neurostate.co.uk/favicon.png",
      "image": "https://neurostate.co.uk/favicon.png",
      "description": "Cognitive performance infrastructure for organisations. Predictive intelligence, risk visibility, and ROI attribution.",
      "email": "contact@neurostate.co.uk",
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "GB"
      },
      "areaServed": {
        "@type": "Country",
        "name": "United Kingdom"
      },
      "priceRange": "££",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "contact@neurostate.co.uk",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://www.linkedin.com/company/neurostate",
        "https://instagram.com/neurostate"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(localBusinessData);
    script.id = 'local-business-structured-data';
    
    const existing = document.getElementById('local-business-structured-data');
    if (existing) {
      existing.remove();
    }
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('local-business-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  return null;
};

export const WebsiteStructuredData = () => {
  useEffect(() => {
    // WebSite schema with SearchAction
    const websiteData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NeuroState",
      "alternateName": "NeuroState®",
      "url": "https://neurostate.co.uk",
      "description": "Cognitive performance infrastructure for organisations. Predictive intelligence, risk visibility, and ROI attribution.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://neurostate.co.uk/shop?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    };

    // SiteNavigationElement schema for sitelinks
    const sitelinksData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "SiteNavigationElement",
          "name": "Solutions",
          "description": "Explore our cognitive performance building blocks and platform components.",
          "url": "https://neurostate.co.uk/solutions"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Nova AI",
          "description": "Multi-model AI engine for cognitive performance forecasting.",
          "url": "https://neurostate.co.uk/nova"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "For Teams",
          "description": "Enterprise cognitive performance infrastructure for organisations.",
          "url": "https://neurostate.co.uk/enterprise/overview"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Industries",
          "description": "Sector-specific solutions for IT, Finance, Healthcare, and more.",
          "url": "https://neurostate.co.uk/enterprise/overview"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Resources",
          "description": "Guides, articles, and insights on cognitive performance.",
          "url": "https://neurostate.co.uk/resources"
        },
        {
          "@type": "SiteNavigationElement",
          "name": "Contact",
          "description": "Get in touch with the NeuroState team.",
          "url": "https://neurostate.co.uk/contact"
        }
      ]
    };

    // Add WebSite schema
    const websiteScript = document.createElement('script');
    websiteScript.type = 'application/ld+json';
    websiteScript.text = JSON.stringify(websiteData);
    websiteScript.id = 'website-structured-data';
    
    const existingWebsite = document.getElementById('website-structured-data');
    if (existingWebsite) {
      existingWebsite.remove();
    }
    document.head.appendChild(websiteScript);

    // Add SiteNavigationElement schema
    const sitelinksScript = document.createElement('script');
    sitelinksScript.type = 'application/ld+json';
    sitelinksScript.text = JSON.stringify(sitelinksData);
    sitelinksScript.id = 'sitelinks-structured-data';
    
    const existingSitelinks = document.getElementById('sitelinks-structured-data');
    if (existingSitelinks) {
      existingSitelinks.remove();
    }
    document.head.appendChild(sitelinksScript);

    return () => {
      const websiteToRemove = document.getElementById('website-structured-data');
      if (websiteToRemove) {
        websiteToRemove.remove();
      }
      const sitelinksToRemove = document.getElementById('sitelinks-structured-data');
      if (sitelinksToRemove) {
        sitelinksToRemove.remove();
      }
    };
  }, []);

  return null;
};

interface BreadcrumbStructuredDataProps {
  items: Array<{ name: string; url: string }>;
}

export const BreadcrumbStructuredData = ({ items }: BreadcrumbStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'breadcrumb-structured-data';
    
    const existing = document.getElementById('breadcrumb-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return null;
};

interface FAQStructuredDataProps {
  faqs: Array<{ question: string; answer: string }>;
}

export const FAQStructuredData = ({ faqs }: FAQStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'faq-structured-data';
    
    const existing = document.getElementById('faq-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('faq-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [faqs]);

  return null;
};

interface ArticleStructuredDataProps {
  article: {
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: string;
  };
}

export const ArticleStructuredData = ({ article }: ArticleStructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.headline,
      "description": article.description,
      "image": article.image,
      "datePublished": article.datePublished,
      "dateModified": article.dateModified,
      "author": {
        "@type": "Organization",
        "name": article.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "NeuroState",
        "logo": {
          "@type": "ImageObject",
          "url": "https://neurostate.co.uk/favicon.jpg"
        }
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'article-structured-data';
    
    const existing = document.getElementById('article-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('article-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [article]);

  return null;
};
