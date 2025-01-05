/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react'
import Header from '../Components/Header';
import Banner from '../Components/Banner';
import Steps from '../Components/Steps'
import AskedQuestions from '../Components/Q&a';
import { NavState } from '../types';
import '../index.css'
import DataContainer from '../Components/DataContainer';
import { ImageData } from '../types'
import React from 'react';


type HeaderProps = {
  navState: NavState; // Replace `string` with the actual type of `navState`
  setNavState: (newNavState: NavState) => void; // Replace `boolean` with the actual type of `navState`
  sideNav: boolean;
  setSideNav: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HeaderProps> = ({ navState, setNavState, sideNav, setSideNav }) => {
  const [url, setUrl] = useState('');
  const [container, setContainer] = useState<boolean>(false)
  const [images, setImages] = useState<ImageData[]>([])
  const [isExtracting, setIsExtracting] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExtractImages = async () => {
    console.log('Extract images button clicked');
  
    if (!url) {
      alert('Please enter a valid URL');
      return;
    }
  
    setIsExtracting(true);
  
    try {
      // Step 1: Extract images
      const extractResponse = await fetch('https://getimage-io.onrender.com/api/extract-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
  
      if (!extractResponse.ok) {
        throw new Error('Failed to extract images');
      }
  
      const extractData = await extractResponse.json();
      alert(extractData.message);
  
      // Step 2: Fetch the extracted images
      const imagesResponse = await fetch('https://getimage-io.onrender.com/api/images');
  
      if (!imagesResponse.ok) {
        throw new Error('Failed to fetch images');
      }
  
      const imagesData = await imagesResponse.json();
      if (imagesData.success && imagesData.images.length > 0) {
        const updatedImages = imagesData.images.map((image: ImageData) => ({
          ...image,
          path: `https://getimage-io.onrender.com${image.path}`, // Prepend the backend URL
        }));
        setImages(updatedImages);
        setContainer(true);
      } else {
        alert('No images were extracted.');
      }
    } catch (error) {
      // Type check for the error object
      if (error instanceof Error) {
        console.error('Error extracting images:', error);
        alert(`Failed to extract images: ${error.message}`);
      } else {
        console.error('An unknown error occurred:', error);
        alert('Failed to extract images. An unknown error occurred.');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="w-full h-screen text-black bg-white" >
     <div className="absolute z-0 w-full h-full bg-transparent"><div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div></div>
      <Header  navState={navState} setNavState={setNavState} sideNav={sideNav} setSideNav={setSideNav}/>
      <Banner url={url} setUrl={setUrl} onExtractImages={handleExtractImages} isExtracting={isExtracting}/>
      <DataContainer container={container} images={images}/>
      <Steps />
      <AskedQuestions />
      <div>
        {showButton && (
          <button
            onClick={scrollToTop}
            className="fixed flex items-center justify-center w-10 h-10 text-white transition-all duration-300 bg-green-600 rounded shadow-lg bottom-20 right-5 hover:bg-green-700"
            aria-label="Back to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#fff"><path d="M480-528 324-372q-11 11-28 11t-28-11q-11-11-11-28t11-28l184-184q12-12 28-12t28 12l184 184q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-528Z"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}


export default Home