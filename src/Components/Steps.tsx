import React from "react";

/* eslint-disable prettier/prettier */
export default function Steps() {
    return (
        <div className="flex flex-col items-center justify-center w-full py-16 bg-white  md:h-screen comfortaa">
            <div className="flex flex-col w-full mx-5 md:flex-row gap-x-10 md:w-fit gap-y-5">
                <div className="p-3 rounded-full shadow-none w-80 md:h-80 h-fit md:shadow-md">
                    <div className="flex flex-col justify-center w-full h-full p-3 border-green-600 border-none rounded-full items-left md:border-2 md:border-dashed">
                        <div className="flex items-center justify-start gap-x-3 md:justify-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                    <path d="M380.77-335.39q-102.46 0-173.54-71.07-71.07-71.08-71.07-173.54t71.07-173.54q71.08-71.07 173.54-71.07t173.54 71.07q71.07 71.08 71.07 173.54 0 42.85-14.38 81.85-14.39 39-38.39 67.84l230.16 230.16q8.31 8.3 8.5 20.88.19 12.58-8.5 21.27t-21.08 8.69q-12.38 0-21.07-8.69L530.46-388.16q-30 24.77-69 38.77-39 14-80.69 14Zm0-59.99q77.31 0 130.96-53.66 53.66-53.65 53.66-130.96t-53.66-130.96q-53.65-53.66-130.96-53.66t-130.96 53.66Q196.15-657.31 196.15-580t53.66 130.96q53.65 53.66 130.96 53.66Z"/>
                                </svg>
                            </div>

                            <h1 className="text-lg font-bold">Find Every Image</h1>
                        </div>
                        <div>
                            <p className="mt-5 text-sm text-left md:text-center">
                           We detect all website images, including backgrounds, dynamic content, and SVGs.
                            </p>
                        </div>
                    </div>
                </div>




                <div className="relative p-3 rounded-full shadow-none w-80 md:bottom-32 md:h-80 h-fit md:shadow-md">
                    <div className="flex flex-col justify-center w-full h-full p-3 border-green-600 border-none rounded-full items-left md:border-2 md:border-dashed">
                        <div className="flex items-center justify-start gap-x-3 md:justify-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                    <path d="M184.61-480q0 102.62 61.35 182.08 61.35 79.46 159.27 103.77 12.62 4.07 20.66 15.57 8.03 11.5 8.03 25.73 0 20.54-17 32.73-17 12.2-37.53 5.27-125.16-34.07-202.27-135Q100-350.77 100-480q0-129.23 77.12-230.15 77.11-100.93 202.27-135 20.53-6.93 37.53 5.27 17 12.19 17 32.73 0 14.23-8.03 25.73-8.04 11.5-20.66 15.57-97.92 24.31-159.27 103.77-61.35 79.46-61.35 182.08Zm563.93 268.15q-34.31 34.93-77.5 59.81-43.2 24.89-91.43 37.19-20.53 6.54-37.73-5.46-17.19-12-17.19-32.54 0-14.23 8.04-25.73t21.04-15.57q38.69-9.23 73.35-29.04Q661.77-243 689.77-271q27.62-28.61 46.92-62.46 19.31-33.85 29.16-72.77 4.07-13 15.57-21.04t25.73-8.04q20.54 0 32.54 17.19 12 17.2 5.46 37.73-12.3 48.23-37 90.93-24.69 42.69-59.61 77.61Zm0-536.3q34.92 34.92 59.61 77.61 24.7 42.7 37 90.93 6.54 20.53-5.46 37.73-12 17.19-32.54 17.19-14.23 0-25.73-8.04t-15.57-21.04q-9.85-38.92-29.16-72.77-19.3-33.85-46.92-62.46-28-28-62.65-47.81-34.66-19.81-73.35-29.04-13-4.07-21.04-15.57t-8.04-25.73q0-20.54 17.19-32.54 17.2-12 37.73-5.46 48.23 12.3 91.43 37.19 43.19 24.88 77.5 59.81Z"/>
                                </svg>
                            </div>

                            <h1 className="text-lg font-bold">Image Analysis</h1>
                        </div>
                        <div>
                            <p className="mt-5 text-sm text-left md:text-center">
                                Each image is analyzed for dimensions, type and size, with advanced features.
                            </p>
                        </div>
                    </div>
                </div>




                <div className="p-3 rounded-full shadow-none w-80 md:h-80 h-fit md:shadow-md">
                    <div className="flex flex-col justify-center w-full h-full p-3 border-green-600 border-none rounded-full items-left md:border-2 md:border-dashed">
                        <div className="flex items-center justify-start gap-x-3 md:justify-center">
                            <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fff">
                                    <path d="M480-343.54q-7.23 0-13.46-2.31-6.23-2.3-11.85-7.92L330.31-478.15q-8.92-8.93-8.81-20.89.12-11.96 8.81-21.27 9.31-9.3 21.38-9.61 12.08-.31 21.39 9L450-444v-306q0-12.77 8.62-21.38Q467.23-780 480-780t21.38 8.62Q510-762.77 510-750v306l76.92-76.92q8.93-8.92 21.19-8.81 12.27.12 21.58 9.42 8.69 9.31 9 21.08.31 11.77-9 21.08L505.31-353.77q-5.62 5.62-11.85 7.92-6.23 2.31-13.46 2.31ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-78.46q0-12.77 8.62-21.38 8.61-8.62 21.38-8.62t21.38 8.62q8.62 8.61 8.62 21.38v78.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-78.46q0-12.77 8.62-21.38 8.61-8.62 21.38-8.62t21.38 8.62q8.62 8.61 8.62 21.38v78.46Q780-222 759-201q-21 21-51.31 21H252.31Z"/>
                                </svg>
                            </div>

                            <h1 className="text-lg font-bold">Easy Download</h1>
                        </div>
                        <div>
                            <p className="mt-5 text-sm text-left md:text-center">
                                Download individual images, selected ones, or just copy their URLs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}