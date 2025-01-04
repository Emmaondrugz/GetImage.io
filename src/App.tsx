/* eslint-disable prettier/prettier */
import { useState } from 'react';
import Home from './Pages/Home';
import Pricing from './Pages/Pricing';
import { NavState } from './types';
import ApiPage from './Pages/ApiPage';
import React from 'react';


function App() {
  const [navState, setNavState] = useState<NavState>("Extract");
  const [sideNav, setSideNav] = useState<boolean>(false);
  const [Loader, setLoader] = useState<string>('opacity-0');
  
  const handleNavChange = (newNavState: NavState) => {
    setLoader('opacity-100'); // Show the loader
    setTimeout(() => {
      setNavState(newNavState); // Change the component after the loader is visible
      setTimeout(() => setLoader('opacity-0'), 500); // Hide the loader after the component changes
    }, 500); // Wait for the loader to fade in
  };

  return (
    <div className='bg-white'>
      <div className={`fixed top-0 left-0 ${Loader} w-full h-full z-50 pointer-events-none bg-white transition-all duration-300`}></div>
      {
        navState === 'Extract' ? (
          <Home navState={navState} setNavState={handleNavChange} sideNav={sideNav} setSideNav={setSideNav} />
        ) : navState === 'Pricing & Plans' ? (
          <Pricing navState={navState} setNavState={handleNavChange} sideNav={sideNav} setSideNav={setSideNav} />
        ) : (
          <ApiPage navState={navState} setNavState={handleNavChange} sideNav={sideNav} setSideNav={setSideNav} />
        )
      }
    </div>
  );
}

export default App;