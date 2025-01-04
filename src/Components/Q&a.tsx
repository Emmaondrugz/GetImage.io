/* eslint-disable prettier/prettier */
import Button from "./FooterButton";


export default function AskedQuestions() {
    type Accordion = {
        question: string
        answer: string
    }

    const questionAndAnswers: Accordion[] = [
        {
            question: "What is GetImg.io?",
            answer: "GetImg.io is a user-friendly tool designed to extract, view, and download images from any public website. Simply paste the URL, click 'Extract,' and instantly access all the images on the site."
        },
        {
            question: "How can I find specific images?",
            answer: "View images in a grid or list, and sort them by name, type, dimensions, or file size. Use the search feature to filter images by name, size, or format, making it easy to find exactly what you need."
        },
        {
            question: "What other tools are available?",
            answer: "Switch to a dark background for better visibility of bright images. Copy URLs or download individual images, or select multiple images to download them all in a ZIP archive."
        },
        {
            question: "Is it free?",
            answer: "Yes, GetImg.io is free to use without an account! There are hourly and daily limits to prevent abuse, but you can extend these by creating an account or subscribing to a premium plan."
        }
    ];

    return (
        <div className="pt-48 pb-5 px-5 bg-[#f4f4f5]">
            <div className="flex flex-col">
                <div className="comfortaa">
                    <h1 className="mb-5 text-3xl">Frequently Asked Questions</h1>
                    <p>If you can’t find what you’re looking for, write us a message and we'll get back to you.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 mt-20 md:grid-cols-2">
                    {questionAndAnswers.map((item, index) => (
                        <div key={index} className="overflow-hidden border rounded">
                            <div className="p-4 bg-white cursor-pointer">
                                <h3 className="text-lg font-medium">{item.question}</h3>
                            </div>
                            <div className="p-4 bg-white">
                                <p className="text-sm text-gray-500">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
    )
}