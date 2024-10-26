'use client';
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { z } from 'zod';
import Link from "next/link";
import axios from "axios";
import { testimonailSchema } from "@/schemas/validationSchema";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcAddImage } from "react-icons/fc";
import { Thankyou } from "./ThankYou";
import Image from "next/image";
import ToastProvider from "@/components/ToastProvider";

const TestimonialSubmit = ({ testimonialCardData }: { testimonialCardData: any }) => {
    const [userName, setUsername] = useState<string>('');
    const [userIntro, setUserIntro] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [userAvatar, setUserAvatar] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [userAvatarPreview, setUserAvatarPreview] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showThankyou, setShowThankyou] = useState(false);
    const [thankyouName, setThankyouName] = useState<string>('');


    const handleAvatarClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    useEffect(() => {
        const loadReCaptcha = () => {
            const script = document.createElement('script');
            script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
            script.async = true;
            document.body.appendChild(script);
        };
        loadReCaptcha();
    }, []);


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
        const token = await (window as any).grecaptcha.execute(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!, { action: 'submit' });

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
            newForm.append('userAvatar', data.userAvatar!);
            newForm.append('spaceId', data.spaceId);
            newForm.append('recaptchaToken', token);
            const res = await axios.post('/api/testimonial', newForm, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },

            });
            if (res.status === 200) {
                setThankyouName(userName.split(' ')[0]);
                setUsername('');
                setUserIntro('');
                setMessage('');
                setUserAvatar(null);
                setUserAvatarPreview('');
                setShowThankyou(true);

            }


        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach(err => {
                    toast.error(err.message);
                });
            } else {
                toast.error((error as any).response.data.error);
                console.log((error as any).response.data.error);
            }
        } finally {
            setLoading(false);
        }
    };

    if (showThankyou) {

        return <Thankyou userName={thankyouName} companyURL={testimonialCardData.companyURL} companyName={testimonialCardData.companyName} />;
    }
    return (
        <>
            <ToastProvider />
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg">

                {/* Fixed Header */}
                <div className="fixed p-6 top-0 left-0 w-full z-10 ">
                    <div className="relative inline-flex items-center">
                        <Link href="/" className="flex-shrink-0">
                            <Image src='/newbrand1.png' width={200} height={200} alt='ClientWords' />
                        </Link>
                    </div>
                </div>

                {/* Main Content */}
                <form onSubmit={handleFormSubmit} className="p-6 relative flex flex-col items-center justify-center min-h-screen max-h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-blue-100">
                    {/* Abstract Light Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-300 via-transparent to-blue-300 opacity-40 blur-3xl" />

                    <div className="relative z-10 flex items-center justify-center gap-4 mb-4">
                        <Avatar className="h-16 w-16">
                            <AvatarImage
                                src={testimonialCardData.companyLogo ? testimonialCardData.companyLogo : '/user.png'}
                                alt="companyLogo"
                            />
                            <AvatarFallback><AvatarImage src={"/user.png"} /></AvatarFallback>
                        </Avatar>
                        <h2
                            onClick={() => testimonialCardData.companyURL && window.open(testimonialCardData.companyURL, '_blank')}
                            className="text-xl font-bold text-blue-600 cursor-pointer hover:underline"
                        >
                            {testimonialCardData.companyName}
                        </h2>
                    </div>

                    <div className="relative p-6 rounded-3xl flex flex-col shadow-xl border-2 border-blue-500  max-w-md mx-auto bg-white bg-opacity-90">
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
                                <h3 className="text-2xl font-semibold text-gray-700">
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
                                    className="border-none text-gray-500 bg-transparent outline-none p-0 m-0 w-full"
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
                            className="resize-none h-32 w-full px-4 py-2 rounded-2xl border border-blue-400 text-black mb-4"
                        />
                        <Button className="rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-2 px-6 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1" type="submit" loading={loading} disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                    </div>
                </form>

            </div>
        </>


    );
};

export default TestimonialSubmit;
