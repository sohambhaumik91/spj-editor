import * as React from 'react';
import { NextSeo, ArticleJsonLd, CorporateContactJsonLd } from 'next-seo';

interface SEOObject {
  [key: string]: any;
}

interface seo {
  [key: string]: Array<string> | Array<SEOObject> | string | SEOObject;
}
interface IAppProps {
  seoProps: seo;
  jsonLD?: Array<SEOObject>;
}

const SEOWrapper = (props: IAppProps) => {
  const { seoProps = {}, jsonLD = [] } = props;

  const renderJSONLD = (item, index) => {
    const { type, value } = item;
    let jsonLD;
    switch (type) {
      case 'contact': {
        jsonLD = <CorporateContactJsonLd {...value} key={`${type}-${index}`} />;
        break;
      }
      case 'article': {
        jsonLD = <ArticleJsonLd {...value} />;
        break;
      }
      default: {
        jsonLD = null;
        break;
      }
    }
    return jsonLD;
  };

  return (
    <>
      <NextSeo {...seoProps} />
      {!!jsonLD?.length && jsonLD?.map((item, index) => renderJSONLD(item, index))}
    </>
  );
};

export default SEOWrapper;
