'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { z } from 'zod';
import { useParams } from 'next/navigation';
import { testimonialCardSchema, avatarSchema } from '@/schemas/validationSchema';

interface Props {
  isUpdate: boolean;
  spaceId: string;
  setIsNewSpace: React.Dispatch<React.SetStateAction<boolean>>;
}

const TestimonialCardForm: React.FC<Props> = ({ isUpdate, spaceId, setIsNewSpace }) => {
  const [companyName, setCompanyName] = useState('Your Company');
  const [companyURL, setCompanyURL] = useState('https://example.com');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [promptText, setPromptText] = useState('Please share your experience with us!');
  const [placeholder, setPlaceholder] = useState('How did you like our services?');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('/user.png');
  const { name } = useParams();

 
  
  useEffect(() =>{

    const fetchTestimonailCard = async () => {
      try {
        const res = await axios.get(`/api/testimonial-card?spaceId=${spaceId}`);
        const { companyName, companyURL, companyLogo, promptText, placeholder } = res.data.testimonialCard;
        setCompanyName(companyName);
        setCompanyURL(companyURL);
        setPromptText(promptText);
        setPlaceholder(placeholder);
        setLogoPreview(companyLogo);
      } catch (error) {
        console.error('Error fetching testimonial card data', error);
      }
    }

    if(isUpdate){
      fetchTestimonailCard();
    }
  }, [spaceId]);
 
  useEffect(() => {
    if (companyLogo) {
      const logoURL = URL.createObjectURL(companyLogo);
      setLogoPreview(logoURL);
      return () => URL.revokeObjectURL(logoURL);
    }
  }, [companyLogo]);


  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setter(e.target.value);

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // avatarSchema.parse(file);
        // setErrors((prev) => ({ ...prev, companyLogo: null }));
        if(file.size > 2 * 1024 * 1024){
          setErrors((prev) => ({ ...prev, companyLogo: 'File size should be less than 2MB' }));
          return;
        }else if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
          setErrors((prev) => ({ ...prev, companyLogo: 'Only jpeg, png, or jpg files are allowed' }));
          return;
        }else if(!file){
          setErrors((prev) => ({ ...prev, companyLogo: 'Company Logo is required' }));
          return;
        }
        
        setErrors((prev) => ({ ...prev, companyLogo: null }));
        setCompanyLogo(file);
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, companyLogo: error.errors[0].message }));
        }
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('companyName', companyName);
    formData.append('companyURL', companyURL);
    if(companyLogo){
        formData.append('companyLogo', companyLogo)
    }else {
        setErrors((prev) =>( {...prev, companyLogo: 'Company Logo is required'}))
        setLoading(false);
        return;
    }
    formData.append('promptText', promptText);
    formData.append('placeholder', placeholder);
    formData.append('spaceId', spaceId);
    formData.append('spaceName', typeof name === 'string' ? name : '');

    try {
      testimonialCardSchema.parse({
        companyName,
        companyURL,
        promptText,
        placeholder,
        spaceId,
        spaceName: typeof name === 'string' ? name : '',
      });

      if (isUpdate) {
        await axios.put('/api/testimonial-card', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsNewSpace(false);
        alert('Form updated successfully!');
      } else {
        await axios.post('/api/testimonial-card', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setIsNewSpace(false);
        alert('Form submitted successfully!');
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;         
          return acc;
        }, {} as { [key: string]: string });
        setErrors(errorMessages);
      } else {
        console.error('Error saving form data', error);
        alert('An error occurred while submitting the form.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-md border p-4">
          <div className="space-y-6">
            <h2 className="text-xl text-center font-semibold mb-4">Customization</h2>
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={handleInputChange(setCompanyName)}
                aria-invalid={errors.companyName ? 'true' : 'false'}
              />
              {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
            </div>
            <div>
              <Label htmlFor="companyURL">Company URL</Label>
              <Input
                id="companyURL"
                value={companyURL}
                onChange={handleInputChange(setCompanyURL)}
                aria-invalid={errors.companyURL ? 'true' : 'false'}
              />
              {errors.companyURL && <p className="text-red-500 text-sm">{errors.companyURL}</p>}
            </div>
            <div>
              <Label htmlFor="companyLogo">Company Logo</Label>
              <Input
                id="companyLogo"
                type="file"
                accept="image/*"
                onChange={handleCompanyLogoChange}
                aria-invalid={errors.companyLogo ? 'true' : 'false'}
              />
              {errors.companyLogo && <p className="text-red-500 text-sm">{errors.companyLogo}</p>}
            </div>
            <div>
              <Label htmlFor="promptText">Prompt Text</Label>
              <Textarea
                id="promptText"
                value={promptText}
                onChange={handleInputChange(setPromptText)}
                aria-invalid={errors.promptText ? 'true' : 'false'}
              />
              {errors.promptText && <p className="text-red-500 text-sm">{errors.promptText}</p>}
            </div>
            <div>
              <Label htmlFor="placeholder">Placeholder</Label>
              <Textarea
                id="placeholder"
                value={placeholder}
                onChange={handleInputChange(setPlaceholder)}
                aria-invalid={errors.placeholder ? 'true' : 'false'}
              />
              {errors.placeholder && <p className="text-red-500 text-sm">{errors.placeholder}</p>}
            </div>
          </div>
          <Button type="submit" className="mt-4" disabled={loading}>
            {loading ? 'Saving...' : { isUpdate } ? 'Update' : 'Submit'}
          </Button>
        </div>

        <div className="border rounded-md p-4">
          <h2 className="underline text-xl text-center font-semibold mb-4">Preview</h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={logoPreview || '/user.png'} alt="companyLogo" />
              <AvatarFallback>Your Logo</AvatarFallback>
            </Avatar>
            <h2
              onClick={() => companyURL && window.open(companyURL, '_blank')}
              className="text-xl font-bold cursor-pointer hover:underline"
            >
              {companyName}
            </h2>
          </div>

          <div className="p-6 rounded-lg flex flex-col shadow-lg border-2 border-blue-500 max-w-md mx-auto">
            <div className="flex gap-4 text-center">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/user.png" alt="userAvatar" />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-md font-bold">John Doe</h3>
                <p>CEO at XYZ</p>
              </div>
            </div>

            <p className="text-gray-700 font-semibold my-4 text-center">{promptText}</p>

            <Textarea
              placeholder={placeholder}
              disabled
              className="resize-none h-32 w-full px-4 py-2 rounded-lg border border-blue-400 mb-4"
            />
            <Button disabled>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestimonialCardForm;