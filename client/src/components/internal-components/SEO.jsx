import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_DATA = {
  '/': {
    title: 'AMPP RGIPT | Student Chapter',
    description: 'AMPP RGIPT Student Chapter is a student-led organization at Rajiv Gandhi Institute of Petroleum Technology focused on materials science, corrosion protection, engineering, events, and technical development.',
    canonical: 'https://www.ampprgipt.com/',
    ogImage: 'https://www.ampprgipt.com/android-chrome-512x512.png',
  },
  '/about': {
    title: 'About | AMPP RGIPT',
    description: 'Discover the AMPP RGIPT Student Chapter at Rajiv Gandhi Institute of Petroleum Technology—our mission, purpose, advisory team, leadership, and student community in materials and corrosion engineering.',
    canonical: 'https://www.ampprgipt.com/about',
    ogImage: 'https://www.ampprgipt.com/android-chrome-512x512.png',
  },
  '/events': {
    title: 'Events | AMPP RGIPT',
    description: 'Explore AMPP RGIPT events, workshops, technical seminars, guest lectures, and chapter activities at Rajiv Gandhi Institute of Petroleum Technology.',
    canonical: 'https://www.ampprgipt.com/events',
    ogImage: 'https://www.ampprgipt.com/android-chrome-512x512.png',
  },
  '/team': {
    title: 'Team | AMPP RGIPT',
    description: 'Meet the AMPP RGIPT student chapter team, executive board, committee chairs, and leadership steering technical development and activities.',
    canonical: 'https://www.ampprgipt.com/team',
    ogImage: 'https://www.ampprgipt.com/android-chrome-512x512.png',
  },
  '/contact': {
    title: 'Contact | AMPP RGIPT',
    description: 'Get in touch with the AMPP RGIPT Student Chapter team at Rajiv Gandhi Institute of Petroleum Technology for inquiries, collaborations, and event details.',
    canonical: 'https://www.ampprgipt.com/contact',
    ogImage: 'https://www.ampprgipt.com/android-chrome-512x512.png',
  },
};

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const data = SEO_DATA[location.pathname] || SEO_DATA['/'];

    // Update document title
    document.title = data.title;

    // Helper to update or create meta tags
    const updateMeta = (selector, attrName, attrValue, content) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // Helper to update link tags (like canonical)
    const updateLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    updateMeta('meta[name="description"]', 'name', 'description', data.description);
    updateLink('canonical', data.canonical);

    // Open Graph
    updateMeta('meta[property="og:title"]', 'property', 'og:title', data.title);
    updateMeta('meta[property="og:description"]', 'property', 'og:description', data.description);
    updateMeta('meta[property="og:url"]', 'property', 'og:url', data.canonical);
    updateMeta('meta[property="og:image"]', 'property', 'og:image', data.ogImage);

    // Twitter
    updateMeta('meta[name="twitter:title"]', 'name', 'twitter:title', data.title);
    updateMeta('meta[name="twitter:description"]', 'name', 'twitter:description', data.description);
    updateMeta('meta[name="twitter:url"]', 'name', 'twitter:url', data.canonical);
    updateMeta('meta[name="twitter:image"]', 'name', 'twitter:image', data.ogImage);

  }, [location.pathname]);

  return null;
}
