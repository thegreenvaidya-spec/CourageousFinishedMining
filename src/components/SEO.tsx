import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  schema?: object;
}

export default function SEO({
  title,
  description,
  canonical,
  keywords,
  ogTitle,
  ogDescription,
  schema,
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", ogTitle || title, true);
    setMeta("og:description", ogDescription || description, true);

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    if (schema) {
      const existingId = "page-schema";
      let existing = document.getElementById(existingId);
      if (existing) existing.remove();
      const script = document.createElement("script");
      script.id = existingId;
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const s = document.getElementById("page-schema");
      if (s) s.remove();
    };
  }, [title, description, canonical, keywords, ogTitle, ogDescription, schema]);

  return null;
}
