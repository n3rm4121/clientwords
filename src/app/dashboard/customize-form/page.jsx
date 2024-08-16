'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@radix-ui/react-label';
import axios from 'axios';
import React, { useState, useCallback, useMemo } from 'react';


const TestimonialCardCustomizer = () => {
    const [customizations, setCustomizations] = useState({
        companyName: 'Your Company',
        companyURL: 'https://example.com',
        companyLogo: '/user.png',
        avatar: null,
        userName: 'John Doe',
        userIntro: 'CEO at XYZ',
        promptText: 'Please share your experience with us!',
        placeholder: 'How did you like our services?'
    });

    const handleInputChange = useCallback((field) => (e) => {
        setCustomizations(prev => ({
            ...prev,
            [field]: e.target.value
        }));
    }, []);

    const handleFileChange = useCallback((field) => (e) => {
        const file = e.target.files[0];
        // check if file size is greater than 2MB
        if (file.size > 2097152) {
            alert('File size is too large. Please select a file smaller than 2MB.');
            return;
        }

        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
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

   
    const handleFormSubmit = async () => {
        const formData = new FormData();
        // filter username and userintro

        for (const key in customizations) {
            if (key !== 'userName' && key !== 'userIntro') {
                formData.append(key, customizations[key]);
            }

        try {
            const response = await axios.post('/api/testimonial-card', formData);
            console.log(response.data);
        } catch (error) {
            console.error('Error saving form data', error);
        }
    }
}

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-center">Testimonial Card Customizer</h1>

            <div className="flex flex-col sm:flex-row gap-8">

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
                                            value={customizations[id]}
                                            onChange={handleInputChange(id)}
                                        />
                                    ) : (
                                        <Input
                                            id={id}
                                            name={id}
                                            type={type}
                                            value={type !== 'file' ? customizations[id] : ''}
                                            accept={accept}
                                            onChange={type === 'file' ? handleFileChange(id) : handleInputChange(id)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <Button onClick={handleFormSubmit} className='mt-4'>Save Form</Button>
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
                            onClick={() => window.open(customizations.companyURL, '_blank')}
                            className="text-xl font-bold cursor-pointer hover:underline"
                        >
                            {customizations.companyName}
                        </h2>

                    </div>



                    <div className="p-6 rounded-lg flex flex-col shadow-lg border-2 border-blue-500 max-w-md mx-auto">


                        <div className='flex gap-4 text-center'>

                            <Avatar className='h-16 w-16'>
                                <AvatarImage src={customizations.avatar ? customizations.avatar : '/user.png'} alt="uesrAvatar" />
                                <AvatarFallback>Avatar</AvatarFallback>
                            </Avatar>


                            <div>
                                <h3 className="text-lg font-semibold ">{customizations.userName}</h3>
                                <p className=" mb-4">{customizations.userIntro}</p>

                            </div>
                        </div>

                        <div>
                            <p className="mb-4 mt-4">{customizations.promptText}</p>
                            <Textarea id='testimonial' name='testimonial' placeholder={customizations.placeholder} rows="4" className="mb-4" />
                            <Button>
                                Submit
                            </Button>
                        </div>

                    </div>
                </div>

                
            </div>
            
        </div>
    );
};

export default TestimonialCardCustomizer;
