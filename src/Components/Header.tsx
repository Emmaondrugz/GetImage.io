/* eslint-disable prettier/prettier */
import React,{ useEffect } from 'react'
import { NavState } from '../types';
import SideNav from './SideNav';

type HeaderProps = {
  navState: NavState; // Use NavState instead of string
  setNavState: (newNavState: NavState) => void; // Use a function type instead of React.Dispatch
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
};

export type LinkType = {
  name: string;
  active: boolean;
};

const Header: React.FC<HeaderProps> = React.memo(({ navState, setNavState, sideNav, setSideNav }) => {
  

  useEffect(() => {
    setSideNav(false);
  }, [navState, setSideNav]);

  useEffect(() => {
    if (sideNav) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [sideNav]);

  const navLinks: LinkType[] = [
    { name: 'Extract', active: navState === 'Extract' },
    { name: 'Pricing & Plans', active: navState === 'Pricing & Plans' },
    { name: 'API Intergration', active: navState === 'API Intergration' }, // Add logic for 'API' if needed
  ];
  return (
    <div className='fixed z-50 flex justify-center w-full text-black bg-white bg-opacity-50 backdrop-blur-lg'>
      <div className="w-full md:max-w-[1000px]  h-[70px] justify-between poppins mx-auto mt-5 rounded-full px-5 md:px-10 py-2 flex items-center">
        <div className="relative z-50 flex items-center gap-x-3">
          <div className="w-10 h-10">
            <img src="\src\assets\logo.svg" alt="" />
          </div>
          <div className="py-4">
            <p className="font-normal poppins">Image Extractor</p>
            <p className="text-sm font-medium text-green-600 poppins">
              version 1
            </p>
          </div>
        </div>

        <div className="hidden font-normal comfortaa gap-x-8 md:flex">
          {
            navLinks.map((link, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    if (link.name === "Extract" || link.name === "Pricing & Plans" || link.name === "API Intergration") {
                      setNavState(link.name);
                    }
                  }}
                  className={navState === link.name ? 'text-green-600 font-bold transition-all' : 'font-bold transition-all'}
                >
                  {link.name}
                </button>
              )
            })
          }
        </div>

        <div className="hidden md:flex">
          <button className="px-8 py-2 transition border-2 border-green-500 rounded-lg shadow-2xl shadow-green-100 hover:shadow-none">
            <a href="https://wa.me/2348029886673" target="_blank" rel="noopener noreferrer">feedback</a>
            </button>
        </div>

        <div
            className="h-full w-16 z-50 md:hidden flex flex-col rotate-180 gap-y-[7px] relative bottom-5 cursor-pointer"
            onClick={() => setSideNav(!sideNav)}
          >
          <div className="bg-black h-[4px] rounded-full w-[40%]"></div>
          <div className="bg-black h-[4px] rounded-full w-[80%]"></div>
        </div>


        <SideNav sideNav={sideNav} setSideNav={setSideNav} navState={navState} setNavState={setNavState} navLinks={navLinks} />
      </div>
    </div>
  );
})

export default Header
