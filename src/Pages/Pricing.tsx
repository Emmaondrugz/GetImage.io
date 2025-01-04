/* eslint-disable prettier/prettier */
import '../index.css'
import { NavState } from '../types'
import Header from '../Components/Header'
import PricingBanner from '../Components/PricingBanner'
import React from 'react'

type HeaderProps = {
    navState: NavState; // Replace `string` with the actual type of `navState`
    setNavState: (newNavState: NavState) => void; // Replace `boolean` with the actual type of `navState`
    sideNav: boolean;
    setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
  }

const Pricing: React.FC<HeaderProps> = ({ navState, setNavState, sideNav, setSideNav }) => {    
    return (
        <div>           
            <div className="absolute z-0 w-full h-full bg-transparent"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>
            <Header  navState={navState} setNavState={setNavState} sideNav={sideNav} setSideNav={setSideNav}/>
            <PricingBanner />
        </div>
    )
}

export default Pricing