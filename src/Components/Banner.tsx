/* eslint-disable prettier/prettier */
import React from "react";
import { useState, useEffect, useRef  } from 'react'

type BannerProps = {
    url: string;
    setUrl: (url: string) => void;
    onExtractImages: () => void;
    isExtracting: boolean;
};


const Banner: React.FC<BannerProps> = ({ url, setUrl, onExtractImages, isExtracting }) => {

    return (
        <div className="relative z-20 flex flex-col items-center justify-end w-full pt-48 text-center md:h-screen md:justify-normal gap-y-8">
            <h1 className="text-4xl mb-24 md:mb-0 md:text-5xl mx-5 text-center md:text-center leading-[45px] md:leading-[55px] font-medium poppins">Extract All <span className="text-green-600">Images</span> <br /> From Websites Of Your Choice.
            </h1>   
            
            <div className="border-2 border-green-500 bg-white md:justify-between rounded-lg w-[90%] md:w-[600px] h-16 shadow-green-100 shadow-2xl flex items-center ps-5">
                <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#000" className="min-w-[32px]">
                    <path d="M281.54-298.46q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h120.77q12.75 0 21.37 8.63 8.63 8.63 8.63 21.39 0 12.75-8.63 21.37-8.62 8.61-21.37 8.61H281.49q-50.34 0-85.91 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.91 35.58h120.82q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37-8.62 8.62-21.37 8.62H281.54ZM360-450q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63 21.37Q347.25-510 360-510h240q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q612.75-450 600-450H360Zm197.69 151.54q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.39 0-12.75 8.63-21.37 8.62-8.61 21.37-8.61h120.82q50.34 0 85.91-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.91-35.58H557.69q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37 8.62-8.62 21.37-8.62h120.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H557.69Z"/>
                </svg>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="Enter any URL, like Istock.com"
                    className="w-full h-full mx-5 bg-white md:flex-grow comfortaa focus:outline-none" // Full height and remove active border
                />

                <div className="hidden h-full p-2 md:block">
                    <button onClick={onExtractImages} disabled={isExtracting}
                        className="h-full px-5 text-white bg-green-600 rounded-md comfortaa">
                        {isExtracting 
                    ?<span className="text-white loading loading-spinner"></span>
                    : 'Extract'}
                    </button> 
                </div>
            </div>
            <div className="w-full -mt-3 md:hidden">
                <button onClick={onExtractImages} disabled={isExtracting}
                    className="bg-green-600 text-white h-14  rounded-md comfortaa w-[90%]">
                    {isExtracting 
                    ?<span className="text-white loading loading-spinner"></span>
                    : 'Extract'}
                </button>
            </div>

            <div>
                {isExtracting && (
                    <p className={`text-xl text-green-500 messages`}>{loadingMessage}</p>
                )}
            </div>
        </div>
    )
}


export default Banner