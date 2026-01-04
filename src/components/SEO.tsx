import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  canonical?: string;
  noindex?: boolean;
}

export const SEO = ({
  title = 'NeuroState® - Cognitive Performance Infrastructure for Organisations',
  description = 'NeuroState is the system of record for cognitive capacity. Predictive intelligence for performance, risk visibility, and financial attribution at enterprise scale.',
  keywords = 'cognitive performance infrastructure, enterprise wellness platform, AI performance analytics, workforce optimisation, predictive intelligence, burnout prevention, Nova AI',
  image = 'https://neurostate.co.uk/og-image.png',
  type = 'website',
  canonical,
  noindex = false,
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://neurostate.co.uk${location.pathname}`;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (property: string, content: string, isProperty = true) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${property}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, property);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description, false);
    updateMetaTag('keywords', keywords, false);
    
    // Open Graph
    updateMetaTag('og:title', title);
    updateMetaTag('og:description', description);
    updateMetaTag('og:image', image);
    updateMetaTag('og:url', canonical || currentUrl);
    updateMetaTag('og:type', type);
    
    // Twitter Card
    updateMetaTag('twitter:title', title, false);
    updateMetaTag('twitter:description', description, false);
    updateMetaTag('twitter:image', image, false);
    updateMetaTag('twitter:card', 'summary_large_image', false);

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow', false);
    } else {
      updateMetaTag('robots', 'index, follow', false);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonical || currentUrl;
  }, [title, description, keywords, image, type, canonical, currentUrl, noindex]);

  return null;
};
