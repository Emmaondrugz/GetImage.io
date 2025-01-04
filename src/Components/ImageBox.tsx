/* eslint-disable prettier/prettier */
import React from "react";
import { ImageData } from "../types";

type ImageBoxProps = {
    image: ImageData; // Individual image data
    isChecked: boolean; // Individual checkbox state
    onCheckboxChange: () => void; // Handler for checkbox change
};

const ImageBox: React.FC<ImageBoxProps> = ({ image, isChecked, onCheckboxChange }) => {

    // Identify the correct property containing the image path/URL
    const imagePath = image.path; // Adjust based on your data structure

    // Construct the full URL if imagePath is a relative path
    const fullUrl = imagePath.startsWith("http") ? imagePath : `${window.location.origin}${imagePath}`;
  
    const handleCopyUrl = (url: string) => {
        if (navigator.clipboard) {
          // Use the Clipboard API if available
          navigator.clipboard
            .writeText(url)
            .then(() => alert("URL copied to clipboard!"))
            .catch(() => alert("Failed to copy URL."));
        } else {
          // Fallback for older browsers
          const textArea = document.createElement("textarea");
          textArea.value = url;
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand("copy");
            alert("URL copied to clipboard!");
          } catch (error) {
            alert("Failed to copy URL. :" + error);
          } finally {
            document.body.removeChild(textArea);
          }
        }
      };
    
  
      // Handle downloading image
      const handleDownload = async (url: string, name: string) => {
        try {
          // Fetch the image as a Blob
          const response = await fetch(url);
      
          // Check if the response is OK
            if (!response.ok) {
                throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
            }
        
            // Convert the response to a Blob
            const blob = await response.blob();
        
            // Create a temporary link element
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob); // Create a Blob URL
            link.download = name; // Set the download file name
            document.body.appendChild(link); // Append the link to the DOM (required for Firefox)
            link.click(); // Trigger the download
        
            // Clean up the Blob URL and remove the link element
            URL.revokeObjectURL(link.href);
            document.body.removeChild(link);
            } catch (error) {
            alert("Failed to download image. Please check the console for details.");
            console.error("Download error:", error);
            }
      };
  

    return (
        <div className="flex flex-col h-[350px] bg-white p-2 border shadow-lg w-[280px] gap-y-3 rounded-xl">
            <div className="h-[230px] flex justify-center w-full p-2 bg-white rounded-lg">
                <div className="absolute -mt-3 mr-60 z-10">
                    <div className="content">
                        <label className="checkBox">
                            <input
                                type="checkbox"
                                checked={isChecked} // Bind to isChecked state
                                onChange={onCheckboxChange} // Use the handler
                            />
                            <div className="transition"></div>
                        </label>
                    </div>
                </div>
                {image.type === 'SVG' ? (
                    <div className="flex items-center justify-center w-full h-full">
                        <img
                            src={fullUrl}
                            alt=""
                            className="mt-[50%] mx-auto block h-32 w-52 scale-150"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'path/to/fallback/image.png';
                                console.error('Failed to load image:', image.path);
                            }}
                        />
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-black rounded-md">
                        <img
                            src={image.path}
                            alt=""
                            className="object-contain max-w-full max-h-full"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = 'path/to/fallback/image.png';
                                console.error('Failed to load image:', image.path);
                            }}
                        />
                    </div>
                )}
            </div>

            <div className="flex flex-col h-20 p-1 details gap-y-3 rounded-xl">
                <div className="img-name">
                    <h1 className="relative max-w-full text-sm font-extrabold truncate comfortaa">{image.name}</h1>
                </div>
                <div className="flex items-center h-10 gap-x-3">
                    <div
                        className={`w-16 flex justify-center text-bold comfortaa rounded-md py-0.5 px-1 ${image.type === "SVG"
                                ? "bg-red-300"
                                : image.type === "JPEG" || image.type === "JPG"
                                    ? "bg-green-300"
                                    : image.type === "PNG"
                                        ? "bg-blue-300"
                                        : "bg-purple-300" // Fallback color for other types
                            }`}
                    >
                        {image.type}
                    </div>
                    <div className="min-w-16 cursor-pointer border text-bold comfortaa flex justify-center rounded-md py-0.5 px-1">
                        {(image.size / 1024).toFixed(2)} kb
                    </div>
                    <div className="cursor-pointer tooltip" data-tip="Copy Url" onClick={() => handleCopyUrl(fullUrl)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="32px"
                            viewBox="0 -960 960 960"
                            width="32px"
                            fill="#000"
                            className="min-w-[32px] hover:fill-green-500 transition-colors duration-300"
                        >
                            <path d="M281.54-298.46q-75.34 0-128.44-53.1Q100-404.65 100-479.98q0-75.33 53.1-128.44 53.1-53.12 128.44-53.12h120.77q12.75 0 21.37 8.63 8.63 8.63 8.63 21.39 0 12.75-8.63 21.37-8.62 8.61-21.37 8.61H281.49q-50.34 0-85.91 35.58Q160-530.38 160-480q0 50.38 35.58 85.96 35.57 35.58 85.91 35.58h120.82q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37-8.62 8.62-21.37 8.62H281.54ZM360-450q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63 21.37Q347.25-510 360-510h240q12.75 0 21.37 8.63 8.63 8.63 8.63 21.38 0 12.76-8.63 21.37Q612.75-450 600-450H360Zm197.69 151.54q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.39 0-12.75 8.63-21.37 8.62-8.61 21.37-8.61h120.82q50.34 0 85.91-35.58Q800-429.62 800-480q0-50.38-35.58-85.96-35.57-35.58-85.91-35.58H557.69q-12.75 0-21.37-8.63-8.63-8.63-8.63-21.38 0-12.76 8.63-21.37 8.62-8.62 21.37-8.62h120.77q75.34 0 128.44 53.1Q860-555.35 860-480.02q0 75.33-53.1 128.44-53.1 53.12-128.44 53.12H557.69Z" />
                        </svg>
                    </div>
                    <div className="cursor-pointer tooltip" data-tip="Download image" onClick={() => handleDownload(fullUrl, image.name)} >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="30px"
                            viewBox="0 -960 960 960"
                            width="30px"
                            fill="#000"
                            className="hover:fill-blue-500 min-w-[32px] transition-colors duration-300"
                        >
                            <path d="M480-343.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L330.31-478.15q-8.92-8.93-8.81-20.89.12-11.96 8.81-21.27 9.31-9.3 21.38-9.61 12.08-.31 21.39 9L450-444v-306q0-12.77 8.62-21.38Q467.23-780 480-780t21.38 8.62Q510-762.77 510-750v306l76.92-76.92q8.93-8.92 21.19-8.81 12.27.12 21.58 9.42 8.69 9.31 9 21.08.31 11.77-9 21.08L505.31-353.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-78.46q0-12.77 8.62-21.38 8.61-8.62 21.38-8.62t21.38 8.62q8.62 8.61 8.62 21.38v78.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-78.46q0-12.77 8.62-21.38 8.61-8.62 21.38-8.62t21.38 8.62q8.62 8.61 8.62 21.38v78.46Q780-222 759-201q-21 21-51.31 21H252.31Z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageBox;