import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'product' | 'article';
  canonical?: string;
  noindex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

export const SEO = ({
  title = 'NeuroState® — Cognitive Performance Infrastructure for Organisations',
  description = 'NeuroState is the system of record for cognitive capacity. Predictive intelligence for performance, risk visibility, and financial attribution at enterprise scale.',
  keywords = 'cognitive performance infrastructure, enterprise wellness platform, AI performance analytics, workforce optimisation, predictive intelligence, burnout prevention, Nova AI',
  image = 'https://neurostate.co.uk/og-image.png',
  imageAlt = 'NeuroState cognitive performance dashboard',
  type = 'website',
  canonical,
  noindex = false,
  publishedTime,
  modifiedTime,
  author = 'NeuroState',
}: SEOProps) => {
  const location = useLocation();
  const currentUrl = `https://neurostate.co.uk${location.pathname}`;
  const canonicalUrl = canonical || currentUrl;

  // Clean title: ensure under 60 chars for SERP display
  const cleanTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  // Clean description: ensure under 160 chars
  const cleanDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;

  useEffect(() => {
    document.title = cleanTitle;

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
    updateMetaTag('description', cleanDescription, false);
    updateMetaTag('keywords', keywords, false);
    updateMetaTag('author', author, false);
    
    // Open Graph
    updateMetaTag('og:title', cleanTitle);
    updateMetaTag('og:description', cleanDescription);
    updateMetaTag('og:image', image);
    updateMetaTag('og:image:alt', imageAlt);
    updateMetaTag('og:url', canonicalUrl);
    updateMetaTag('og:type', type);
    updateMetaTag('og:site_name', 'NeuroState');
    updateMetaTag('og:locale', 'en_GB');
    
    // Twitter Card
    updateMetaTag('twitter:title', cleanTitle, false);
    updateMetaTag('twitter:description', cleanDescription, false);
    updateMetaTag('twitter:image', image, false);
    updateMetaTag('twitter:image:alt', imageAlt, false);
    updateMetaTag('twitter:card', 'summary_large_image', false);
    updateMetaTag('twitter:site', '@neurostate', false);

    // Article-specific meta
    if (type === 'article') {
      if (publishedTime) updateMetaTag('article:published_time', publishedTime);
      if (modifiedTime) updateMetaTag('article:modified_time', modifiedTime);
      updateMetaTag('article:author', author);
    }

    // Robots
    if (noindex) {
      updateMetaTag('robots', 'noindex, nofollow', false);
    } else {
      updateMetaTag('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1', false);
    }

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = canonicalUrl;

    // Hreflang (for SPA route changes)
    const hreflangTags = [
      { hreflang: 'en-GB', href: canonicalUrl },
      { hreflang: 'en', href: canonicalUrl },
      { hreflang: 'x-default', href: canonicalUrl },
    ];

    hreflangTags.forEach(({ hreflang, href }) => {
      let link = document.querySelector(`link[hreflang="${hreflang}"]`) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.setAttribute('hreflang', hreflang);
        document.head.appendChild(link);
      }
      link.href = href;
    });
  }, [cleanTitle, cleanDescription, keywords, image, imageAlt, type, canonicalUrl, noindex, publishedTime, modifiedTime, author]);

  return null;
};
