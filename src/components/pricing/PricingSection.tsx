'use client'

import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Switch } from '@/components/ui/switch';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from 'react';
import { PricingCard } from './PricingCard';
import { Button } from '../ui/button';
import { HelpCircle } from 'lucide-react';

interface Feature {
    text: string;
    included: boolean;
    tooltip?: string;
    commingSoon?: boolean;
}

export interface PlanProps {
    title: string;
    monthlyPrice: number;
    annualPrice: number;
    features: Feature[];
    buttonText: string;
    isPro?: boolean;
    monthlyPriceId?: string;
    annualPriceId?: string;
}

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(false);
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
                <h2 className="text-4xl text-center font-bold text-gray-200 tracking-tight sm:text-5xl mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-center text-gray-400 mb-8">Choose the plan that's right for you</p>

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
                            <AccordionTrigger>What happens if my subscription expires?</AccordionTrigger>
                            <AccordionContent>
                                If your subscription expires, you will be downgraded to the free Starter plan. You can upgrade to Pro at any time. You will not be able to add more testimonials or spaces until you upgrade.
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