import Image from 'next/image';
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
  }
`;

const InteriorDesignsList: React.FC = () => {
  return (
    <div>
      <div className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <p className="text-yellow-500">Largest collection of 3D rendered images</p>
          <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            10,000+ Interior Design Ideas
          </h1>
          <div className="relative">
            <AnimateBox className="grid grid-cols-6 gap-8 my-6">
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Bedroom</h4>
                    <p className="text-indigo-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=934&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Living Room</h4>
                    <p className="text-red-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1605351720698-6cfec9eb9b5e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Entryway</h4>
                    <p className="text-yellow-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1607522783211-cb0d1ffdab8a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Home Office</h4>
                    <p className="text-green-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Work Station</h4>
                    <p className="text-blue-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    className="rounded-lg object-cover"
                    alt="tmp"
                    src="https://images.unsplash.com/photo-1594113768745-aa11bdc68b47?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
                    height="300"
                    width="225"
                  />
                  <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-gray-900 to-transparent pb-6 pt-20 px-4">
                    <h4 className="text-lg text-bold text-white">Kis&apos;s Room</h4>
                    <p className="text-pink-400 text-sm">2000+ 3D Renders</p>
                  </div>
                </div>
              </li>
            </AnimateBox>
          </div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="max-w-xl mx-auto bg-white p-8 rounded-xl border border-gray-2 shadow-sm">hi</div>
        </div>
      </div>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="py-6 h-screen">hi</div>
        </div>
      </div>
    </div>
  );
};

export default InteriorDesignsList;