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
      "logo": "https://neurostate.co.uk/favicon.jpg",
      "description": "The world's first cognitive performance system combining AI, red light therapy and performance supplements to improve focus, sleep, energy and mental performance.",
      "foundingDate": "2025",
      "slogan": "The World's First Cognitive Performance System",
      "knowsAbout": [
        "Cognitive Performance",
        "AI-driven cognitive performance",
        "Personalised cognitive performance",
        "Red light therapy cognitive benefits",
        "Neuromodulation",
        "Photobiomodulation",
        "Adaptogen supplements for focus",
        "Corporate wellbeing solution",
        "Workplace performance platform"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "contact@neurostate.co.uk",
        "contactType": "Customer Service",
        "areaServed": "GB",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://twitter.com/neurostate",
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
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "description": "AI cognitive performance assistant providing personalised protocols, predictive insights and real-time guidance to enhance focus, sleep and mental resilience.",
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
        "Personalised AI coaching",
        "Adaptive recommendations",
        "Real-time behavioural insights",
        "Predictive wellness AI",
        "Wearable device integration",
        "Protocol optimisation"
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

export const WebsiteStructuredData = () => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "NeuroState",
      "url": "https://neurostate.co.uk",
      "description": "The world's first cognitive performance system combining AI, red light therapy and performance supplements.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://neurostate.co.uk/shop?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    script.id = 'website-structured-data';
    
    const existing = document.getElementById('website-structured-data');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('website-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
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
