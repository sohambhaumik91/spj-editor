import BottomNav from '@components/Playground/BottomNav';
import Header from '@components/Playground/Header';
import MoreActions from '@components/Playground/MoreActions';
import NavPanel from '@components/Playground/NavPanel';
import SideNav from '@components/Playground/SideNav';
import dynamic from 'next/dynamic';
import React, { useEffect, useRef, useState } from 'react';
import { DataBusContextProvider } from 'store';
import { PlaygroundAssetsContextProvider } from 'store/PlaygroundAssets';
import { SelectedIndexContextProvider } from 'store/SelectedIndex';

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
    <SelectedIndexContextProvider>
      <PlaygroundAssetsContextProvider>
        <DataBusContextProvider>
          <div className="h-screen">
            <Header />
            <div className="flex">
              <SideNav />
              <div className="relative bg-gray-200 overflow-y-scroll diy-h-free w-80 flex-1 max-w-sm">
                <NavPanel />
              </div>
              <div className="bg-gray-100 diy-h-free w-3/4 py-4 pl-4 flex flex-col space-y-4">
                <div className="relative z-10 bg-white h-full flex-1 shadow-sm" ref={PlaygroundWrapperRef}>
                  <PlaygroundWithNoSSR w={size[0]} h={size[1]} />
                </div>
                <BottomNav />
              </div>
              <MoreActions />
            </div>
          </div>
        </DataBusContextProvider>
      </PlaygroundAssetsContextProvider>
    </SelectedIndexContextProvider>
  );
};

export default MoodBoard;
