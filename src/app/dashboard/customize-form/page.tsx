'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import React, { useState, useCallback, useMemo } from 'react';
import { testimonialCardSchema } from '@/schemas/testimonialCardSchema';
import { z } from 'zod';

const TestimonialCardCustomizer = () => {
    const [customizations, setCustomizations] = useState<{
        [key: string]: string;
    }>({
        companyName: 'Your Company',
        companyURL: 'https://example.com',
        companyLogo: '/user.png',
        avatar: '/user.png',
        userName: 'John Doe',
        userIntro: 'CEO at XYZ',
        promptText: 'Please share your experience with us!',
        placeholder: 'How did you like our services?'
    });

    const [errors, setErrors] = useState<{ [key: string] : string }>({});

    const handleInputChange = useCallback((field: any) => (e: { target: { value: any; }; }) => {
        setCustomizations(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    }, []);

    const handleFileChange = useCallback((field: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.size > 2097152) {
            alert('File size is too large. Please select a file smaller than 2MB.');
            return;
        }

        if (file && !['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
            alert('Please select a valid image file.');
            return;
        }

        if (file && file.type.match('image.*')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomizations(prev => ({
                    ...prev,
                    [field]: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    }, []);

    const fields = useMemo(() => [
        { id: 'companyName', label: 'Company Name', type: 'text' },
        { id: 'companyURL', label: 'Company URL', type: 'text' },
        { id: 'companyLogo', label: 'Company Logo', type: 'file', accept: 'image/*' },
        { id: 'placeholder', label: 'Placeholder', type: 'textarea' },
        { id: 'promptText', label: 'Prompt Text', type: 'textarea' },
    ], []);

    const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Create an object with form data
        const formData: { [key: string]: string | null } = {
            companyName: customizations.companyName,
            companyURL: customizations.companyURL,
            companyLogo: customizations.companyLogo,
            promptText: customizations.promptText,
            placeholder: customizations.placeholder,
        };

        try {
            // Validate using Zod schema
            testimonialCardSchema.parse(formData);

            // If validation passes, create FormData object for submission
            const formDataToSubmit = new FormData();
            for (const key in formData) {
                if (formData[key] !== null) {
                    formDataToSubmit.append(key, formData[key] as string);
                }
            }

            const response = await axios.post('/api/testimonial-card', formDataToSubmit, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Map Zod errors to state for display
                const errorMessages: { [key: string]: string } = (error.errors as z.ZodIssue[]).reduce((acc: { [key: string]: string }, curr: z.ZodIssue) => {
                    acc[curr.path[0]] = curr.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            } else {
                console.error('Error saving form data', error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Testimonial Card Customizer</h1>

            <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row gap-8">
                {/* Customization */}
                <div className="w-full lg:w-1/2 rounded-md border p-4">
                    <div className="space-y-6">
                        <h2 className="text-xl text-center font-semibold mb-4">Customization</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {fields.map(({ id, label, type, accept }) => (
                                <div key={id}>
                                    <Label htmlFor={id}>{label}</Label>
                                    {type === 'textarea' ? (
                                        <Textarea
                                            id={id}
                                            name={id}
                                            value={customizations[id] ?? ''}
                                            onChange={handleInputChange(id)}
                                            aria-invalid={errors[id] ? 'true' : 'false'}
                                        />
                                    ) : (
                                        <Input
                                            id={id}
                                            name={id}
                                            type={type}
                                            value={type !== 'file' ? (customizations[id] ?? '') : undefined}
                                            accept={accept}
                                            onChange={type === 'file' ? handleFileChange(id) : handleInputChange(id)}
                                            aria-invalid={errors[id] ? 'true' : 'false'}
                                        />
                                    )}
                                    {errors[id] && <p className="text-red-500 text-sm">{errors[id]}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button type="submit" className='mt-4'>Save Form</Button>
                </div>

                {/* Preview */}
                <div className="w-full lg:w-1/2 border rounded-md p-4">
                    <h2 className="underline text-xl text-center font-semibold mb-4">Preview</h2>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Avatar className='h-16 w-16'>
                            <AvatarImage src={customizations.companyLogo ? customizations.companyLogo : '/user.png'} alt="companyLogo" />
                            <AvatarFallback>Your Logo</AvatarFallback>
                        </Avatar>
                        <h2
                            onClick={() => customizations.companyURL && window.open(customizations.companyURL, '_blank')}
                            className="text-xl font-bold cursor-pointer hover:underline"
                        >
                            {customizations.companyName}
                        </h2>
                    </div>

                    <div className="p-6 rounded-lg flex flex-col shadow-lg border-2 border-blue-500 max-w-md mx-auto">
                        <div className='flex gap-4 text-center'>
                            <Avatar className='h-16 w-16'>
                                <AvatarImage src={customizations.avatar} alt="userAvatar" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-semibold ">{customizations.userName}</h3>
                                <p className=" mb-4">{customizations.userIntro}</p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-4 mt-4">{customizations.promptText}</p>
                            <Textarea id='testimonial' name='testimonial' placeholder={customizations.placeholder ?? ''} rows={4} className="mb-4" />
                            <Button>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TestimonialCardCustomizer;
