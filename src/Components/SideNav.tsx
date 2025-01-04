/* eslint-disable prettier/prettier */
import React from "react";
import { NavState } from "../types";
import { LinkType } from "./Header";

type HeaderProps = {
  navState: NavState; // Use NavState instead of string
  setNavState: (newNavState: NavState) => void; // Use a function type instead of React.Dispatch
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
  navLinks: LinkType[]
};

const SideNav: React.FC<HeaderProps> = React.memo(({navState, setNavState, sideNav, navLinks }) => {
    return (
        <div
          className={`fixed z-30 flex flex-col text-black justify-between transition-all pt-20 duration-700 h-svh top-0 bg-[#f9fefa] w-full ${
            sideNav ? 'left-[0] pointer-events-auto' : 'left-[-100%] pointer-events-none'
          }`}
        >
          <div className='flex flex-col mx-5 mt-10 list-none bg-white rounded-xl shadow-around'>
              {
                navLinks.map((link, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        if (link.name === "Extract" || link.name === "Pricing & Plans" || link.name === 'API Intergration') {
                          setNavState(link.name);
                        }
                      } }
                      className={`font-normal px-5 flex gap-x-2 items-center border-b py-3 poppins text-[16px] transition-all ${navState === link.name ? 'text-green-600' : ''}`}
                    >
                      {link.name}
                    </li>
                  )
                })
              }
              <li className="font-normal px-5 flex gap-x-2 items-center border-b py-3 poppins text-[16px] transition-all">
                <a href="https://wa.me/2348029886673" target="_blank" rel="noopener noreferrer">feedback</a>
              </li>
          </div>

          <div className='block w-[90%] rounded-xl shadow-around mx-5 bg-white h-52 p-6 mb-5 px-5'>
              <div className="flex flex-col justify-between h-full">
                <div>
                    <h1 className="text-xl" >Upgrade to pro</h1>
                    <p className="mt-3 text-sm text-gray-500">Switch to pro plan to get access to 3000 credits and API access now.</p>
                </div>
                <div className="flex justify-center w-full">
                    <button className="flex justify-center w-full py-3 text-white bg-green-600 rounded-lg gap-x-2" onClick={() => setNavState('Pricing & Plans')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff"><path d="m440-380-237-30q-25-3-32.5-27t10.5-41l409-392q5-5 12-7.5t19-2.5q20 0 30.5 17t.5 35L520-580l237 30q25 3 32.5 27T779-482L370-90q-5 5-12 7.5T339-80q-20 0-30.5-17t-.5-35l132-248Z"/></svg>
                        Upgrade now
                    </button>
                </div>
              </div>
          </div>
        </div>
    )
})

export default SideNav