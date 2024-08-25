'use client';
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ITestimonialCard } from "@/models/testimonial-card.model";
import { Input } from "@/components/ui/input";
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { z } from 'zod';
import Link from "next/link";
import axios from "axios";
import { testimonailSchema } from "@/schemas/validationSchema";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAddImage } from "react-icons/fc";

const TestimonialSubmit = ({ testimonialCardData }: { testimonialCardData: ITestimonialCard }) => {
    const [userName, setUsername] = useState<string>('');
    const [userIntro, setUserIntro] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [userAvatarPreview, setUserAvatarPreview] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        if (userAvatar) {
            const avatarURL = URL.createObjectURL(userAvatar);
            setUserAvatarPreview(avatarURL);
            return () => URL.revokeObjectURL(avatarURL);
        }
    }, [userAvatar]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                if (file.size > 2 * 1024 * 1024) {
                    toast.error('Avatar size must be less than 2MB');
                    return;
                } else if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
                    toast.error('Only jpeg, png, or jpg files are allowed');
                    return;
                } else if (!file) {
                    toast.error('Avatar is required');
                    return;
                }
                setUserAvatar(file);
            } catch (error) {
                if (error instanceof z.ZodError) {
                    toast.error(error.errors[0].message);
                }
            }
        }
    };

    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = testimonailSchema.parse({
                userName,
                userIntro,
                message,
                spaceId: testimonialCardData.spaceId,
                userAvatar
            });

            const newForm = new FormData();
            newForm.append('userName', data.userName);
            newForm.append('userIntro', data.userIntro);
            newForm.append('message', data.message);
            newForm.append('userAvatar', data.userAvatar!); // `!` asserts that it's not null
            newForm.append('spaceId', data.spaceId);

            const res = await axios.post('/api/testimonial', newForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (res.data.newTestimonial._id) {
                toast.success('Testimonial submitted successfully!');
                setUsername('');
                setUserIntro('');
                setMessage('');
                setUserAvatar(null);
                setUserAvatarPreview('');
            }


        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach(err => {
                    toast.error(err.message);
                });
            } else {
                toast.error('An error occurred while submitting the form.');
                console.error('Error submitting form data', error);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <MaxWidthWrapper className="w-full">
            <ToastContainer />
            {/* Fixed Header */}
            <div className="fixed p-4 top-0 left-0 w-full z-10">
                <Link className="text-2xl font-bold text-left p-4" href="/">TestiBoost</Link>
            </div>

            {/* Main Content */}
            <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center min-h-screen pt-20 max-h-screen overflow-y-auto">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage
                            src={testimonialCardData.companyLogo ? testimonialCardData.companyLogo : '/user.png'}
                            alt="companyLogo"
                        />
                        <AvatarFallback><AvatarImage src={"/user.png"} /></AvatarFallback>
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
                            <AvatarImage src={userAvatarPreview} alt="userAvatar" />
                            <AvatarFallback><FcAddImage size={50} /></AvatarFallback>
                        </Avatar>
                        <Input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
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
                            <input
                                type="text"
                                className="border-none bg-transparent outline-none p-0 m-0 w-full"
                                placeholder="CEO at XYZ (optional)"
                                value={userIntro}
                                onChange={(e) => setUserIntro(e.target.value)}
                            />
                        </div>
                    </div>

                    <p className="text-gray-700 font-semibold my-4 text-center">{testimonialCardData.promptText}</p>

                    <Textarea
                        placeholder={testimonialCardData.placeholder}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="resize-none h-32 w-full px-4 py-2 rounded-lg border border-blue-400 mb-4"
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit'}
                    </Button>
                </div>
            </form>
        </MaxWidthWrapper>
    );
};

export default TestimonialSubmit;
