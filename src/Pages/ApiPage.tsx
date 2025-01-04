/* eslint-disable prettier/prettier */
import { NavState } from '../types';
import Header from '../Components/Header';
import '../index.css'
import React from 'react';
import Button from '../Components/FooterButton';

type HeaderProps = {
  navState: NavState; // Replace `string` with the actual type of `navState`
  setNavState: (newNavState: NavState) => void; // Replace `boolean` with the actual type of `navState`
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}


const ApiPage : React.FC<HeaderProps> = ({ navState, setNavState, sideNav, setSideNav }) =>  {

    return (
        <div className="text-black bg-white">           
            <div className="absolute z-0 w-full h-full bg-transparent"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>
            <Header  navState={navState} setNavState={setNavState} sideNav={sideNav} setSideNav={setSideNav}/>

            <div className="relative z-20 flex flex-col items-center w-full text-center pt-52 md:h-screen justify-normal gap-y-8">
                <h1 className="relative text-4xl mb-24 md:mb-0 md:text-5xl mx-5 text-center md:text-center leading-[45px] md:leading-[55px] font-medium poppins">
                    <p className='absolute left-0 text-sm -top-8 md:text-base'>- Coming Soon</p> {/* Adjusted position */}
                    Get notified when <br /> we <span className="text-green-600"> launch.</span>
                </h1>
            
            
                <div className="border-2 border-green-500 bg-white md:justify-between rounded-lg w-[90%] md:w-[500px] h-16 shadow-green-100 shadow-2xl flex items-center ps-5">
                    <input
                        type="Email"
                        placeholder="Enter Your Email Address"
                        className="w-full h-full mx-5 bg-white md:flex-grow comfortaa focus:outline-none" // Full height and remove active border
                    />

                    <div className="hidden h-full p-2 md:block">
                        <button className="h-full w-[130px] text-white bg-green-600 rounded-md comfortaa">Notify Me</button> 
                    </div>
                </div>
                <div className="w-full -mt-3 md:hidden">
                    <button className="bg-green-600 text-white h-14  rounded-md comfortaa w-[90%]">Notify Me</button>
                </div>
                <p className='comfortaa'>*Dont worry we will not spam you ; )</p>
            </div>


           <div className="mt-52 w-full flex justify-center">
                <Button />
            </div>
            <div className="flex flex-col justify-center w-full h-32 pt-10 text-sm text-center mt-10 gap-y-5 md:flex-row md:text-left md:h-fit comfortaa md:border-t">
                <div>
                    <h1>©2024 GetImg.io</h1>
                </div>
                <div className="flex list-none md:flex-row gap-y-3 gap-x-5">
                    <li>feedback</li>
                    <li>Documentation</li>
                    <li>Status</li>
                    <li>Imprint</li>
                </div>
            </div>
        </div>
    )
}

export default ApiPage