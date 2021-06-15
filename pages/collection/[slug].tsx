import CollectionBanner from '@components/Collection/Banner';
import DesignList from '@components/InteriorDesigns/DesignList';
import ListFilter from '@components/InteriorDesigns/ListFilter';
import Layout from '@components/Shared/Layout';
import PreFooter from '@components/Shared/PreFooter';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants/api';
import fetcher from '@utils/fetcher';
import React from 'react';

interface CollectionPage {
  designFeedData: {
    list: [];
    count: number;
    filters?: any;
  };
  collectionData: {
    name?: string;
    description?: string;
    coverImg?: string;
    slug?: string;
    publishedDate?: string;
    status?: string;
    metaTitle?: string;
    metaDescription?: string;
  };
}

const collectionView: React.FC<CollectionPage> = ({ designFeedData, collectionData }) => {
  return (
    <Layout>
      <Layout.Banner />
      <Layout.Header />
      <Layout.Body>
        <CollectionBanner data={collectionData} />
        <ListFilter />
        <DesignList feedData={designFeedData} />
        <PreFooter />
      </Layout.Body>
      <Layout.Footer />
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const slugs = [
    'bedroom-ideas',
    'living-room-ideas',
    'entryway-ideas',
    'home-office-ideas',
    'kids-room-ideas',
    'nursery-ideas',
  ];
  const paths = slugs.map((slug) => ({
    params: { slug },
  }));
  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const endPoint = `${publicRoutes.collectionData}/${params?.slug}`;
  const res = await fetcher({ endPoint, method: 'GET' });
  const { data, statusCode } = res;
  if (statusCode <= 301) {
    const additionalParams = `?limit=${internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE}&skip=0`;
    const designRes = await fetcher({
      endPoint: `${publicRoutes.designFeed}${additionalParams}`,
      method: 'POST',
      body: { data: data?.searchKey || {} },
    });
    const { data: designData = {}, statusCode: designResStatus } = designRes;
    if (designResStatus < 301) {
      const { list: designList = [] } = designData;
      return {
        props: {
          designFeedData: { list: designList, count: 500, filters: data?.searchKey },
          collectionData: {
            name: data?.name,
            description: data?.description,
            coverImg: data?.cdnCover,
            slug: data?.slug,
            publishedDate: data?.publishedDate,
            status: data?.status,
            metaTitle: data?.metaTitle,
            metaDescription: data?.metaDescription,
          },
        },
        revalidate: 1,
      };
    } else {
      return {
        props: {
          designFeedData: { list: [], count: 0, filters: {} },
          collectionData: {},
        },
      };
    }
  }
  return {
    props: {
      designFeedData: { list: [], count: 0, filters: {} },
      collectionData: {},
    },
  };
};

export default React.memo(collectionView);