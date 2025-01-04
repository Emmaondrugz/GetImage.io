/* eslint-disable prettier/prettier */
import React,{ useState, useRef, useEffect } from "react";
import '../index.css'
import ImagesBox from "./ImagesBox";
import { ImageData } from "../types";


type DataContainerProps = {
    container: boolean
    images: ImageData[]
}

const DataContainer: React.FC<DataContainerProps> = ({container, images}) => {

    // State for checkbox selection, and button functionality
    const [isChecked, setIsChecked] = useState<boolean[]>(images.map(() => false));


    const handleCheckboxChange = (index: number) => {
        setIsChecked((prevState) => {
          const newCheckedState = [...prevState]; // Create a copy of the previous state
          newCheckedState[index] = !newCheckedState[index]; // Toggle the checkbox at the specified index
          return newCheckedState; // Return the updated state
        });
      };


    const handleSelectAll = () => {
    setIsChecked(images.map(() => true)); // Select all checkboxes
    };
    
    const handleDeselectAll = () => {
    setIsChecked(images.map(() => false)); // Deselect all checkboxes
    };

    const targetRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (container && targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [container]);




  return (
    <div ref={targetRef} className={`w-full bg-white md:py-28 py-52 gap-y-10 ${container? 'flex' : 'hidden'} flex-col items-center justify-center`}>
        <div className="max-w-[900px] w-full mx-5 flex-col gap-y-5 flex items-center justify-between">
            <div>
                <h1 className="text-center text-bold poppins">
                    Showing {images.length} of {images.length} images from <br /> www.netflix.com
                </h1>
            </div>

            <div className="flex flex-row items-center gap-x-2">
            <div className="flex flex-row items-center gap-x-2">
                <button
                onClick={handleSelectAll}
                className="flex justify-center w-40 py-2 font-bold bg-white border rounded-lg shadow-lg gap-x-2 comfortaa"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#000"
                    >
                        <path d="m424-408-86-86q-11-11-28-11t-28 11q-11 11-11 28t11 28l114 114q12 12 28 12t28-12l226-226q11-11 11-28t-11-28q-11-11-28-11t-28 11L424-408Zm56 328q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                    Select all
                </button>

                <button
                    onClick={handleDeselectAll}
                    disabled={isChecked.every((checked) => !checked)} // Disable if no checkboxes are selected
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
                    Deselect all
                </button>
            </div>
            </div>
        </div>
        
        <div className="flex flex-wrap justify-center w-full gap-10">
            <ImagesBox
                images={images} // Pass all images
                isChecked={isChecked} // Pass the state of all checkboxes
                onCheckboxChange={handleCheckboxChange} // Pass the handler for checkbox changes
            />
        </div>
    </div>
  );
};

export default DataContainer;