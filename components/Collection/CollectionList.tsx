import CollectionCard from '@components/Collection/CollectionCard';
import CollectionCardDimmer from '@components/Collection/CollectionCardDimmer';
import Pagination from '@components/Shared/Pagination';
import usePagination from '@hooks/usePagination';
import { internalPages } from '@utils/config';
import { publicRoutes } from '@utils/constants/api';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const entry = keyframes`
	from { 
		opacity: 0;
        transform: scale(0.7);
	}
	to {
        opacity: 1;
        transform: scale(1);
	}
`;

const AnimateBox = styled.ul`
  & > li {
    opacity: 0;
    transform: scale(0.7);
    animation: ${entry} 0.4s forwards;
    &:nth-child(1) {
      animation-delay: 100ms;
    }
    &:nth-child(2) {
      animation-delay: 150ms;
    }
    &:nth-child(3) {
      animation-delay: 200ms;
    }
    &:nth-child(4) {
      animation-delay: 250ms;
    }
    &:nth-child(5) {
      animation-delay: 300ms;
    }
    &:nth-child(6) {
      animation-delay: 350ms;
    }
    &:nth-child(7) {
      animation-delay: 400ms;
    }
    &:nth-child(8) {
      animation-delay: 450ms;
    }
    &:nth-child(9) {
      animation-delay: 500ms;
    }
    &:nth-child(10) {
      animation-delay: 550ms;
    }
    &:nth-child(11) {
      animation-delay: 600ms;
    }
    &:nth-child(12) {
      animation-delay: 650ms;
    }
  }
`;

interface CollectionList {
  feedData: {
    list: [];
    count: number;
  };
}

const CollectionList: React.FC<CollectionList> = ({ feedData }) => {
  const { list, count: totalRecords } = feedData;
  const { currentRenderList, isFetching, buttons } = usePagination(
    { url: publicRoutes.collectionFeed, method: 'GET' },
    list,
    totalRecords,
    internalPages.InteriorDesigns.DEFAULT_PAGINATION_BUTTON_COUNT,
    internalPages.Collection.DEFAULT_PAGE_SIZE
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-end py-20">
        <div className="flex-1">
          <p className="text-gray-500">Largest collection of 3D rendered images</p>
          <h1 className="my-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Hand Picked Collections
          </h1>
          <p className="text-gray-800 max-w-3xl">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto id possimus, sit assumenda sequi qui
            tempora placeat veritatis. Similique amet aperiam sequi assumenda. Quos ad, asperiores laboriosam nihil sint
            provident.
          </p>
        </div>
      </div>
      <div className="relative bg-white">
        <AnimateBox className="grid grid-cols-6 gap-x-8 gap-y-10">
          {isFetching && (
            <>
              {[...new Array(internalPages.InteriorDesigns.DEFAULT_PAGE_SIZE)].map((_d, _i) => (
                <CollectionCardDimmer key={Math.random()} />
              ))}
            </>
          )}
          {currentRenderList.map((collection) => (
            <CollectionCard cardData={collection} key={collection?._id} inset={false} />
          ))}
        </AnimateBox>
        <Pagination buttonList={buttons} />
      </div>
    </div>
  );
};

export default CollectionList;