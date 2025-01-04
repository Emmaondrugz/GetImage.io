/* eslint-disable prettier/prettier */
import React from 'react';
import { ImageData } from '../types';
import ImageBox from './ImageBox';

type ImagesBoxProps = {
    images: ImageData[]; // Array of images
    isChecked: boolean[]; // Array of checkbox states
    onCheckboxChange: (index: number) => void; // Handler for checkbox changes    
};

const ImagesBox: React.FC<ImagesBoxProps> = ({  images, isChecked, onCheckboxChange  }) => {

     // Function to handle downloading all checked images
     const downloadAllImages = async () => {
        // Loop through the images and download the checked ones
        for (let i = 0; i < images.length; i++) {
            if (isChecked[i]) {
                const image = images[i];
                const imagePath = image.path;
                const fullUrl = imagePath.startsWith("http") ? imagePath : `${window.location.origin}${imagePath}`;

                try {
                    // Fetch the image as a Blob
                    const response = await fetch(fullUrl);

                    // Check if the response is OK
                    if (!response.ok) {
                        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
                    }

                    // Convert the response to a Blob
                    const blob = await response.blob();

                    // Create a temporary link element
                    const link = document.createElement("a");
                    link.href = URL.createObjectURL(blob); // Create a Blob URL
                    link.download = image.name; // Set the download file name
                    document.body.appendChild(link); // Append the link to the DOM (required for Firefox)
                    link.click(); // Trigger the download

                    // Clean up the Blob URL and remove the link element
                    URL.revokeObjectURL(link.href);
                    document.body.removeChild(link);
                } catch (error) {
                    alert(`Failed to download image: ${image.name}. Please check the console for details.`);
                    console.error("Download error:", error);
                }
            }
        }
    };
    
    return (
        <>
        <div className='flex flex-col items-center justify-center gap-y-16'>
            <div>
                <button
                    disabled={isChecked.every((checked) => !checked)} // Disable if no checkboxes are selected
                    onClick={downloadAllImages}
                    className={`bg-white flex gap-x-2 justify-center shadow-lg border w-40 py-2 font-bold comfortaa rounded-lg ${
                    isChecked.some((checked) => checked) ? "opacity-100" : "opacity-50"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000"
                    >
                        <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                    Download all
                </button>
            </div>
            <div className='flex flex-wrap justify-center gap-10'>
               {images.map((image, index) => (    
                    <ImageBox
                    key={index}
                    image={image} // Pass individual image data
                    isChecked={isChecked[index]} // Pass individual checkbox state
                    onCheckboxChange={() => onCheckboxChange(index)} // Pass handler for the specific checkbox
                />
                ))} 
            </div>
        </div>
        </>
    );
};

export default ImagesBox;