'use client';
import React, { useState, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ITestimonialCard } from "@/models/testimonial-card.model";
import { Input } from "@/components/ui/input";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { z } from 'zod';
import Link from "next/link";
import axios from "axios";

const messageSchema = z.object({
    userName: z.string().min(3, { message: "Name must be at least 3 characters long." }).max(50, { message: "Name must be less than 50 characters long." }),
    userIntro: z.string().max(50, { message: "Intro must be less than 50 characters long." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters long." }).max(500, { message: "Message must be less than 500 characters long." }),
    userAvatar: z.string(),
    spaceId: z.string(),
});

const TestimonialSubmit = ({ testimonialCardData }: { testimonialCardData: ITestimonialCard }) => {
    const [userName, setUsername] = useState<string>('');
    const [userIntro, setUserIntro] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<string>('/user.png');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUserAvatar(URL.createObjectURL(file));
        }
    };
   

    const handleFormSubmit = async () => {
        setLoading(true);
        setErrors({}); 
        try {
            const data = messageSchema.parse({
                userName,
                userIntro,
                message,
                userAvatar,
                spaceId: testimonialCardData.spaceId,
            });

            const res = await axios.post('/api/testimonial', data);
            console.log(res);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.errors.reduce((acc, curr) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {} as { [key: string]: string });
                setErrors(errorMessages);
            } else {
                console.error('Error submitting form data', error);
                alert('An error occurred while submitting the form.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MaxWidthWrapper className="w-full">
        {/* Fixed Header */}
        <div className="fixed p-4 top-0 left-0 w-ful z-10">
            {/* <h1 className="text-3xl font-bold text-left p-4">Testiboost</h1> */}
            <Link className="text-2xl font-bold text-left p-4"  href="/">TestiBoost</Link>
        </div>
    
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen pt-20 max-h-screen overflow-y-auto">
            <div className="flex items-center justify-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                    <AvatarImage
                        src={testimonialCardData.companyLogo ? testimonialCardData.companyLogo : '/user.png'}
                        alt="companyLogo"
                    />
                    <AvatarFallback>Your Logo</AvatarFallback>
                </Avatar>
                <h2
                    onClick={() => testimonialCardData.companyURL && window.open(testimonialCardData.companyURL, '_blank')}
                    className="text-xl font-bold cursor-pointer hover:underline"
                >
                    {testimonialCardData.companyName}
                </h2>
            </div>
    
            <div className="p-6 rounded-lg flex flex-col shadow-lg border-2 border-blue-500 max-w-md mx-auto">
                <div className="flex gap-4 text-center">
                    <Avatar className="h-16 w-16 cursor-pointer" onClick={handleAvatarClick}>
                        <AvatarImage src={userAvatar} alt="userAvatar" />
                        <AvatarFallback>P</AvatarFallback>
                    </Avatar>
                    <Input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <div>
                        <h3 className="text-2xl font-semibold">
                            <input
                                type="text"
                                className="border-none bg-transparent outline-none p-0 m-0 w-full"
                                placeholder="John Doe"
                                value={userName}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </h3>
                        {errors.userName && <p className="text-red-500 text-sm">{errors.userName}</p>}
    
                        <input
                            type="text"
                            className="border-none bg-transparent outline-none p-0 m-0 w-full"
                            placeholder="CEO at XYZ (optional)"
                            value={userIntro}
                            onChange={(e) => setUserIntro(e.target.value)}
                        />
                        {errors.userIntro && <p className="text-red-500 text-sm">{errors.userIntro}</p>}
                    </div>
                </div>
    
                <p className="text-gray-700 font-semibold my-4 text-center">{testimonialCardData.promptText}</p>
    
                <Textarea
                    placeholder={testimonialCardData.placeholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="resize-none h-32 w-full px-4 py-2 rounded-lg border border-blue-400 mb-4"
                />
                {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                <Button onClick={handleFormSubmit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
            </div>
        </div>
    </MaxWidthWrapper>
    
    );
};

export default TestimonialSubmit;
