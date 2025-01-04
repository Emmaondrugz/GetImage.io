/* eslint-disable prettier/prettier */

import React from "react";
import '../index.css'

type Prices = {
    plan: string;
    text: string;
    amount: number;
    traits: string[];
    button: { 
        text: string
        class: string
    };
    style: string| 'hidden';
    PriceState: string; // Add PriceState to the type
    setPriceState: (state: string) => void;  // Add setPriceState to the type
};


const PriceBox: React.FC<Prices> = React.memo(({ plan, text, amount, traits, button, style, PriceState, setPriceState }) => {
    
    
    const useHandleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("Checkbox checked:", event.target.checked);
        if (setPriceState) {
            setPriceState(event.target.checked ? 'Pro' : 'Free');
        }
    };
    
    return (
        <div className={style + ' transition-all duration-200'}>
            <div className="relative flex flex-col h-full p-10 gap-y-8"> {/* Add `relative` here */}
                {/* Toggler positioned at the top-right corner */}
                <div className="absolute z-10 top-0 right-0 block p-4 sm:hidden"> {/* Adjust padding as needed */}
                    <div className="container">
                        <input
                            type="checkbox"
                            className="checkbox"
                            id="checkbox"
                            checked={PriceState === 'Pro'} // Reflect the current state
                            onChange={useHandleCheckboxChange}
                        />
                        <label className="switch" htmlFor="checkbox">
                            <span className="slider"></span>
                        </label>
                    </div>
                </div>

                {/* Rest of the content */}
                <div>
                    <h1 className="text-xl font-bold transition-all duration-200 comfortaa">{plan}</h1>
                    <p className="mt-3 text-sm comfortaa">{text}</p>
                </div>

                <div className="flex justify-center w-full sm:justify-start">
                    <ul className="flex flex-col">
                        {traits.map((trait, index) => (
                            <li key={index} className="flex items-center text-xs font-medium gap-x-3 comfortaa">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#16a34a"><path d="M70-438q-12-12-11.5-28T71-494q12-11 28-11.5t28 11.5l142 142 14 14 14 14q12 12 11.5 28T296-268q-12 11-28 11.5T240-268L70-438Zm424 85 340-340q12-12 28-11.5t28 12.5q11 12 11.5 28T890-636L522-268q-12 12-28 12t-28-12L296-438q-11-11-11-27.5t11-28.5q12-12 28.5-12t28.5 12l141 141Zm169-282L522-494q-11 11-27.5 11T466-494q-12-12-12-28.5t12-28.5l141-141q11-11 27.5-11t28.5 11q12 12 12 28.5T663-635Z"/></svg>
                                {trait}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full">
                    <div>
                        <h1 className="text-3xl font-medium poppins">${amount} <span className="text-sm font-light tracking-wider text-gray-500 comfortaa">/month</span></h1>
                    </div>

                    <div className="w-full mt-5">
                        <button className={button.class + ' transition-all duration-200'} disabled>
                            {button.text}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PriceBox;