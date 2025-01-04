/* eslint-disable prettier/prettier */
import { useState } from 'react'
import '../index.css'
import PriceBox from './PriceBox'
import { Prices } from '../types';
import Button from './FooterButton';

const freePricing: Prices = {
    plan: "Free",
    text: "Enhance your projects with easy image extraction.",
    amount: 0,
    traits: [
        "Up to 100 credits",
        "Daily limit",
        "No API access",
    ],
    button: {
        text: 'Your current plan',
        class: 'bg-green-100 text-gray-500 text-sm py-2.5 rounded-full w-[150px]'
    },
    style: 'w-[320px] h-[390px] bg-white border-2 border-transparent text-center sm:text-left rounded-xl',
};

const hobbyPricing: Prices = {
    plan: "Hobby",
    text: "Try out the API and app without any strings attached.",
    amount: 9,
    traits: [
        "Up to 3,000 credits",
        "No Limit",
        "API access",
    ],
    button: {
        text: 'Coming Soon',
        class: 'bg-green-600 text-white text-sm py-2.5 rounded-full w-[150px]'
    },
    style: 'w-[320px] border-2 bg-white text-center sm:text-left  border-green-500 h-[390px] shadow-green-100 shadow-2xl rounded-xl',
};


export default function PricingBanner() {
    const [priceState, setPriceState] = useState<string>("Free"); // Default state

    return (
        <div className="relative z-20 px-5 text-black md:pt-36 pt-28">
            <div className="flex flex-col items-center justify-center w-full">
                <div>
                  <h1 className="text-3xl text-center md:text-4xl leading-[45px] md:leading-[55px]  font-medium poppins">Simple & <span className="text-green-600">Affordable </span></h1>
                    <p className="text-xs w-[80%] mt-3 mx-auto text-center comfortaa md:text-center pe-3 md:pe-0">Get started with a free account and upgrade <br className="hidden md:inline"/>  when you need to.</p>  
                </div>


                {/* Princing Boxes */}
                
                {/* Large screen */}
                <div className='justify-center hidden w-full mx-5 mb-10 mt-14 sm:flex'>
                    <PriceBox {...freePricing}
                        PriceState={priceState}
                        setPriceState={setPriceState}                  
                    />
                    <PriceBox {...hobbyPricing}
                        PriceState={priceState}
                        setPriceState={setPriceState}
                    />
                </div>
                <div className='flex justify-center w-full mx-5 mt-10 mb-10 sm:hidden'>
                    <PriceBox
                        {...(priceState === 'Pro' ? hobbyPricing : freePricing)}
                        PriceState={priceState}
                        setPriceState={setPriceState}
                    />
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
        </div>
    )
}





// edit the md: class in tailwind to start from 900px