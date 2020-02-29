import React from "react";
import { NextSeo } from "next-seo";

interface MetaObject {
  name: string;
  content: string;
}

interface SEOProps {
  title: string;
  description?: string;
  keywords?: MetaObject[];
  meta?: MetaObject[];
  noIndex?: boolean;
  noFollow?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description = "",
  keywords = [],
  meta = [],
  noIndex = false,
  noFollow = false
}) => {
  return (
    <NextSeo
      title={title}
      titleTemplate={`%s | Spiritual Gifts`}
      description={description}
      nofollow={noFollow}
      noindex={noIndex}
      openGraph={{
        title,
        description,
        type: "website"
      }}
      additionalMetaTags={[...keywords, ...meta]}
    />
  );
};

export default SEO;
