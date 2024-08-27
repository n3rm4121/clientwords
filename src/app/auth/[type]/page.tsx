'use client';

import { useState, useEffect } from 'react';
import {  usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import axios from 'axios';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { Navbar } from '@/components/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button, buttonVariants } from '@/components/ui/button';
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";



// todo: error displaying

// validation schemas using Zod
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const signupSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function AuthPage() {
  const router = useRouter();
  const path = usePathname();
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { data: session, status } = useSession();
  const validPath = ['/auth/login', '/auth/signup'];
  useEffect(() => {
    
    setIsSignup(path === '/auth/signup');
  
  }, [path]);

  useEffect(() => {
    if (status === 'loading') return; // Wait until the session is determined
    if (status === 'authenticated') {
      router.push('/dashboard'); // Redirect authenticated users to dashboard
    }
  }, [status, router]);



  const validateForm = () => {
    try {
      if (isSignup) {
        signupSchema.parse({ email, password, confirmPassword });
      } else {
        loginSchema.parse({ email, password });
      }
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.format();
        setErrors(formattedErrors);
      }
      return false;
    }
  };

  const handleAuth = async (event: any) => {
    event.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isSignup) {
        const res = await axios.post('/api/auth/signup', { email, password });
        router.push('/auth/login');
      } else {
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });
        console.log(res);
        if (!res?.error) {
          router.push('/dashboard');
        } else {
          console.error('Login failed');
        }
      }
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProviderSignIn = async (provider: string) => {
    await signIn(provider);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Navbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="card w-full max-w-md   shadow-lg rounded-xl border border-gray-500 p-6">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {isSignup ? 'Sign Up' : 'Login'}
            </h2>
            <form onSubmit={handleAuth} className="space-y-4">
              {isSignup && (
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="mt-1 block w-full"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full"
                />
                {errors?.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email._errors[0]}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium ">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <PiEyeSlash className="h-5 w-5 " />
                    ) : (
                      <PiEye className="h-5 w-5 " />
                    )}
                  </div>
                </div>
                {errors?.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password._errors[0]}</p>
                )}
              </div>

              {isSignup && (
                <div>
                  <Label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full"
                  />
                  {errors?.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword._errors[0]}</p>
                  )}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full mt-4"
              >
                {loading ? 'Loading...' : isSignup ? 'Sign Up' : 'Login'}
              </Button>
            </form>

         
              <div className="flex items-center my-9">
  <hr className="w-full border-t border-gray-300" />
  <span className="px-3">OR</span>
  <hr className="w-full border-t border-gray-300" />
</div>


            <div className="grid grid-cols-2 gap-6">

              <Button variant={'outline'} onClick={() => handleProviderSignIn('google')}>
                <FcGoogle className='mr-2'/>
                Google
              </Button>
              
             <Button variant={'outline'} onClick={() => handleProviderSignIn('github')}>
              <FaGithub size={16} className='mr-2'/>
              Github
             </Button>
            </div>

            <div className="text-center mt-4">
              {isSignup ? (
                <p>
                  Already have an account?{' '}
                  <Link href="/auth/login" className={buttonVariants({variant:'link'})}>
                    Login
                  </Link>
                </p>
              ) : (
                <p>
                  Don't have an account?
                  <Link href="/auth/signup" className={buttonVariants({variant:'link'})}>
                    Sign Up
                  </Link>
                </p>
              )}
            </div>
          </div>
        </div>
      
    </>
  );
}