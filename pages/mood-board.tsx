import BottomNav from '@components/Playground/BottomNav';
import Header from '@components/Playground/Header';
import MoreActions from '@components/Playground/MoreActions';
import NavPanel from '@components/Playground/NavPanel';
import SideNav from '@components/Playground/SideNav';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { DataBusContextProvider } from 'store';
import { PlaygroundAssetsContextProvider } from 'store/PlaygroundAssets';
import { SelectedIdContextProvider } from 'store/SelectedId';

const PlaygroundWithNoSSR = dynamic(() => import('@components/Playground'), { ssr: false });

const MoodBoard: React.FC = () => {
  const PlaygroundWrapperRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState([0, 0]);

  const updateSize = () =>
    setSize([
      PlaygroundWrapperRef.current.getClientRects()[0].width,
      PlaygroundWrapperRef.current.getClientRects()[0].height,
    ]);

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <SelectedIdContextProvider>
      <PlaygroundAssetsContextProvider>
        <DataBusContextProvider>
          <div className="h-screen">
            <Header />
            <div className="flex">
              <div className="flex-shrink-0 w-16 bg-white ">
                <SideNav />
              </div>
              <div className="relative flex-shrink-0 w-80 bg-gray-200 overflow-y-scroll diy-h-free">
                <NavPanel />
              </div>
              <div className="bg-gray-100 diy-h-free w-3/4 py-4 pl-4 flex flex-col space-y-4">
                <div className="bg-white shadow-sm p-4" ref={PlaygroundWrapperRef}>
                  <p>
                    <span className="text-gray-600">Total Cost </span>{' '}
                    <strong className="text-gray-800">$19000.00</strong>{' '}
                  </p>
                </div>
                <div className="bg-white shadow-sm h-full flex-1" ref={PlaygroundWrapperRef}>
                  <PlaygroundWithNoSSR w={size[0]} h={size[1]} />
                </div>
                <BottomNav />
              </div>
              <MoreActions />
            </div>
          </div>
        </DataBusContextProvider>
      </PlaygroundAssetsContextProvider>
    </SelectedIdContextProvider>
  );
};

export default MoodBoard;
