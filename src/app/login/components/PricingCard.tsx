'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle, Gem, Tag } from 'lucide-react';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface Feature {
    text: string;
    included: boolean;
    tooltip?: string;
    commingSoon?: boolean;
}

interface PlanProps {
    title: string;
    monthlyPrice: number;
    annualPrice: number;
    features: Feature[];
    buttonText: string;
    isPro?: boolean;
    monthlyPriceId?: string;
    annualPriceId?: string;
}

const DISCOUNT_PERCENTAGE = 20; // 20% discount for the LAUNCH promo code

const PricingCard = ({ title, monthlyPrice, annualPrice, monthlyPriceId, annualPriceId, features, buttonText, isPro = false, isAnnual }: PlanProps & { isAnnual: boolean }) => {
    const discountedMonthlyPrice = monthlyPrice * (1 - DISCOUNT_PERCENTAGE / 100);
    const discountedAnnualPrice = annualPrice * (1 - DISCOUNT_PERCENTAGE / 100);

    return (
        <Card className={`relative max-w-md overflow-hidden transition-all duration-300 ${isPro ? 'border-primary shadow-lg' : 'hover:border-primary hover:shadow-md'}`}>
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-200">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl text-gray-200 font-bold mb-2">
                    ${isAnnual ? annualPrice : monthlyPrice}
                    <span className="text-lg font-normal text-gray-400">/{isAnnual ? 'year' : 'month'}</span>
                </p>
                {isPro && (
                    <p className="text-sm text-green-500 mb-6">
                        ${isAnnual ? discountedAnnualPrice.toFixed(2) : discountedMonthlyPrice.toFixed(2)} with code 'LAUNCH'
                        <br />
                        <span className="text-xs text-gray-400">
                            (Discount applies to {isAnnual ? 'first year' : 'first month'})
                        </span>
                    </p>
                )}
                <ul className="space-y-4 mb-8 flex justify-center items-start flex-col">
                    {features.map((feature, index) => (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger>
                                    <li className="flex">
                                        {feature.included ? (
                                            <Check className="text-green-500 mr-2 flex-shrink-0" />
                                        ) : (
                                            <X className="text-red-500 mr-3 flex-shrink-0" />
                                        )}
                                        <span className={feature.included ? '' : 'text-gray-400'}>
                                            <div className='relative text-gray-300'>
                                                {feature.text}
                                                {feature.commingSoon && (
                                                    <Badge className="ml-2 inline" variant="secondary">
                                                        Coming Soon
                                                    </Badge>
                                                )}
                                            </div>
                                        </span>
                                        {feature.tooltip && (
                                            <HelpCircle className="ml-2 h-4 w-4 text-muted-foreground" />
                                        )}
                                    </li>
                                </TooltipTrigger>
                                {feature.tooltip && (
                                    <TooltipContent>
                                        <p>{feature.tooltip}</p>
                                    </TooltipContent>
                                )}
                            </Tooltip>
                        </TooltipProvider>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link
                    href={buttonText === 'Get Started' ? '/login' : `/checkout?priceId=${isAnnual ? annualPriceId : monthlyPriceId}`}
                    className={buttonVariants({
                        variant: 'default',
                        size: 'lg',
                        className: 'w-full'
                    })}
                >
                    {buttonText}{isPro && <Gem className='w-4 h-4 ml-2' />}
                </Link>
            </CardFooter>
        </Card>
    );
};

export default function AwesomePricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 4);

        const updateCountdown = () => {
            const now = new Date();
            const difference = endDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeLeft('Offer expired');
            }
        };

        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);

        return () => clearInterval(timer);
    }, []);

    const plans: PlanProps[] = [
        {
            title: "Starter",
            monthlyPrice: 0,
            annualPrice: 0,
            features: [
                { text: "Collect up to 10 testimonials", included: true },
                { text: "1 Space", included: true, tooltip: "A space is a collection of testimonials for a specific product or service" },
                { text: "Public testimonial form", included: true },
                { text: "Love Gallery with our branding", included: true },
                { text: "Basic customization", included: true },
            ],
            buttonText: "Get Started",
        },
        {
            title: "Pro",
            monthlyPrice: 8,
            annualPrice: 80, // 8 * 10 = 80 (2 months free for annual)
            features: [
                { text: "Collect unlimited testimonials", included: true },
                { text: "Unlimited Spaces", included: true, tooltip: "A space is a collection of testimonials for a specific product or service" },
                { text: "Public testimonial form", included: true },
                { text: "Love Gallery without our branding", included: true },
                { text: "Advanced customization", included: true, commingSoon: true },
            ],
            buttonText: 'Upgrade Now',
            isPro: true,
            monthlyPriceId: 'pri_01j7qw0djsh1vrvh9c8gb5jn49',
            annualPriceId: 'pri_01jazh6htrrzwww5r5hys0c4c1',
        },
    ];

    return (
        <section id="pricing" className="py-10">
            <MaxWidthWrapper>
                <h2 className="text-4xl font-bold text-gray-200 tracking-tight sm:text-5xl mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-gray-400 mb-8">Choose the plan that's right for you</p>

                <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 rounded-lg mb-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center">
                        <Tag className="mr-3 text-yellow-400 animate-bounce" /> Launch Offer
                    </h3>
                    <p className="text-lg text-gray-100 text-center">
                        Use promo code <span className="font-semibold text-yellow-300">'LAUNCH'</span> to get <span className="font-bold text-white">{DISCOUNT_PERCENTAGE}%</span> off your first month (monthly plan) or first year (annual plan)!
                    </p>
                    <p className="text-md text-yellow-200 text-center mt-4">
                        Offer ends in: <span className="font-bold">{timeLeft}</span>
                    </p>
                </div>

                <div className="flex justify-center items-center space-x-4 mb-12">
                    <span className={`text-sm ${!isAnnual ? 'text-gray-200' : 'text-gray-400'}`}>Monthly</span>
                    <Switch
                        checked={isAnnual}
                        onCheckedChange={setIsAnnual}
                    />
                    <span className={`text-sm ${isAnnual ? 'text-gray-200' : 'text-gray-400'}`}>Annually (2 months free)</span>
                </div>
                <div className="mb-8 grid gap-2 items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-2  xl:grid-cols-2">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} isAnnual={isAnnual} />
                    ))}
                </div>

                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Can I upgrade or downgrade my plan at any time?</AccordionTrigger>
                            <AccordionContent>
                                Yes, you can upgrade or downgrade your plan at any time. Please send an email to <span className='text-blue-500'> support@clientwords.com</span> and we will help you with that.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Is there a long-term contract?</AccordionTrigger>
                            <AccordionContent>
                                Currently we offer monthly and annual plans. If you need a custom plan, please send an email to <span className='text-blue-500'>support@clientwords.com</span>.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
                            <AccordionContent>
                                We don't offer a free trial, but you can start with our free Starter plan and upgrade to Pro at any time.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>How does the 'LAUNCH' promo code work?</AccordionTrigger>
                            <AccordionContent>
                                The 'LAUNCH' promo code gives you a {DISCOUNT_PERCENTAGE}% discount on your first payment. For monthly plans, it applies to your first month. For annual plans, it applies to your entire first year.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>What happens if my subscription expires?</AccordionTrigger>
                            <AccordionContent>
                                If your subscription expires, you will be downgraded to the free Starter plan. You can upgrade to Pro at any time. You will not able to add more testimonials or spaces until you upgrade.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-200 mb-4">Still have questions?</p>
                    <Button variant="outline">
                        <HelpCircle className="mr-2 inline h-4 w-4 text-muted-foreground" />
                        <a href="mailto:support@clientwords.com" className="text-indigo-400 hover:underline">
                            Email Support
                        </a>
                    </Button>
                </div>
            </MaxWidthWrapper>
        </section>
    );
}