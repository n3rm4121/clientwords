'use client'
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
import { FcAddImage } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useSWR from 'swr';

interface Props {
  isUpdate: boolean;
  spaceId: string;
  setIsNewSpace?: React.Dispatch<React.SetStateAction<boolean>>;

}
const fetcher = (url: string) => axios.get(url).then(res => res.data);

const TestimonialCardForm: React.FC<Props> = ({ isUpdate, spaceId, setIsNewSpace }) => {
  const { data, error } = useSWR(isUpdate ? `/api/testimonial-card?spaceId=${spaceId}` : null, fetcher, {revalidateOnFocus: false,});

  const [companyName, setCompanyName] = useState('Your Company');
  const [companyURL, setCompanyURL] = useState('https://example.com');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [promptText, setPromptText] = useState('Please share your experience with us!');
  const [placeholder, setPlaceholder] = useState('How did you like our services?');
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [loading, setLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string>('/user.png');
  const { name } = useParams();
  const [initialData, setInitialData] = useState<any>({});
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (data && data.testimonialCard) {
      const { companyName, companyURL, companyLogo, promptText, placeholder } = data.testimonialCard;
      setCompanyName(companyName);
      setCompanyURL(companyURL);
      setPromptText(promptText);
      setPlaceholder(placeholder);
      setLogoPreview(companyLogo);   
      setCompanyLogo(companyLogo);
      setInitialData({ companyName, companyURL, companyLogo, promptText, placeholder });
    }
  }, [data]);

 
  useEffect(() => {
    if (companyLogo && companyLogo instanceof File) {
      const logoURL = URL.createObjectURL(companyLogo);
      setLogoPreview(logoURL);
      return () => URL.revokeObjectURL(logoURL);
    }
  }, [companyLogo]);

  useEffect(() => {
    if (initialData) {
      const currentData = { companyName, companyURL, companyLogo, promptText, placeholder };
      setHasChanges(JSON.stringify(currentData) !== JSON.stringify(initialData));
    }
  }, [companyName, companyURL, companyLogo, promptText, placeholder, initialData]);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setter(e.target.value);
    };

  const handleCompanyLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        if(file.size > 2 * 1024 * 1024){
          setErrors((prev) => ({ ...prev, companyLogo: 'File size should be less than 2MB' }));
          return;
        } else if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
          setErrors((prev) => ({ ...prev, companyLogo: 'Only jpeg, png, or jpg files are allowed' }));
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

  const createFormData = () => {
    const formData = new FormData();

    if (companyName !== initialData.companyName) {
      formData.append('companyName', companyName);
    }
    if (companyURL !== initialData.companyURL) {
      formData.append('companyURL', companyURL);
    }
    if (companyLogo instanceof File) {
      try {
        const avatar = avatarSchema.parse(companyLogo);
        formData.append('companyLogo', companyLogo);
        setErrors((prev) => ({ ...prev, companyLogo: null }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrors((prev) => ({ ...prev, companyLogo: error.errors[0].message }));
        }
        setLoading(false);
        return;
      }
    } else if (!companyLogo) {
      setErrors((prev) => ({ ...prev, companyLogo: 'Company Logo is required' }));
      setLoading(false);
      return;
    }
    if (promptText !== initialData.promptText) {
      formData.append('promptText', promptText);
    }
    if (placeholder !== initialData.placeholder) {
      formData.append('placeholder', placeholder);
    }
    formData.append('spaceId', spaceId);
    formData.append('spaceName', typeof name === 'string' ? name : '');
  
    return formData;
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setLoading(true);

    const formData = createFormData();
  

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
        toast.success('Form updated successfully!');
        
        
      } else {
        
        if(!errors || errors.companyLogo === null){
          await axios.post('/api/testimonial-card', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
         
          toast.success('Form submitted successfully!');
          if (setIsNewSpace) {
            setIsNewSpace(false);  // Set isNewSpace to false after successful submission
          }
            
        }else{
          return;
        }
       
      }
      setInitialData({ companyName, companyURL, companyLogo, promptText, placeholder });
      setHasChanges(false);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessages = error.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;         
          return acc;
        }, {} as { [key: string]: string });
        setErrors(errorMessages);
      } else {
        console.error('Error saving form data', error);
        toast.error((error as any).response.data.error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      {!isUpdate && <h1 className="text-2xl text-muted-foreground font-semibold text-center mb-4">Lets Customize and Create Your Message Box</h1>}
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
                aria-required="true"  
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
                aria-required="true"  
              />
              {errors.companyURL && <p className="text-red-500 text-sm">{errors.companyURL}</p>}
            </div>
            <div>
              <Label htmlFor="companyLogo">Company Logo</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={logoPreview} alt="companyLogo" />
                  <AvatarFallback><FcAddImage size={50} /></AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('companyLogo')?.click()}
                >
                  {isUpdate ? 'Change Logo' : 'Upload Logo'}
                </Button>
              </div>
        
              <input type="file" id="companyLogo"  hidden accept="image/*" onChange={handleCompanyLogoChange} />
              {errors.companyLogo && <p className="text-red-500 text-sm">{errors.companyLogo}</p>}
            </div>
            <div>
              <Label htmlFor="promptText">Prompt Text</Label>
              <Textarea
                id="promptText"
                value={promptText}
                onChange={handleInputChange(setPromptText)}
                aria-invalid={errors.promptText ? 'true' : 'false'}
                aria-required="true"  
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
                aria-required="true"  
              />
              {errors.placeholder && <p className="text-red-500 text-sm">{errors.placeholder}</p>}
            </div>
          </div>
          <Button type="submit" loading={loading} className="mt-4" disabled={loading || (isUpdate && !hasChanges)}>
          {loading ? 'Saving...' : isUpdate ? 'update' : 'Submit'}
        </Button>
        </div>

        <div className="border rounded-md p-4 ">

          <div>

         
          <h2 className="underline text-xl text-center text-gray-700 font-semibold mb-4">Preview</h2>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={logoPreview || '/user.png'} alt="companyLogo" />
              <AvatarFallback><AvatarImage src={"/user.png"} /></AvatarFallback>
            </Avatar>
            <h2
              onClick={() => companyURL && window.open(companyURL, '_blank')}
              className="text-xl font-bold text-blue-600 cursor-pointer hover:underline"
            >
              {companyName}
            </h2>
          </div>

          <div className="p-6 rounded-3xl bg-opacity-90 flex flex-col shadow-xl border-2 border-blue-500 max-w-md mx-auto">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={''} alt="userAvatar" />
                <AvatarFallback><FcAddImage size={50} /></AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold text-gray-700">John Doe</h3>
                <p className='text-gray-500'>CEO at XYZ(optional)</p>
              </div>
            </div>

            <p className="text-gray-700 font-semibold my-4 text-center">{promptText}</p>

            <Textarea
              placeholder={placeholder}
              disabled
              className="resize-none h-32 w-full px-4 py-2 rounded-lg border border-blue-400 mb-4"
            />
            <Button variant={'outline'} className='rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 font-semibold py-2 px-6 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1' disabled>Submit</Button>
          </div>
       
          </div>
           </div>
      </form>
    </div>
  );
};

export default TestimonialCardForm;