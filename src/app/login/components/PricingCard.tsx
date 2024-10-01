import React from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle, Gem } from 'lucide-react';
import { MaxWidthWrapper } from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
    price: number;
    features: Feature[];
    buttonText: string;
    isPro?: boolean;
    popularPlan?: boolean;
    isBusiness?: boolean;
    priceId?: string;
}

const PricingCard = ({ title, price, priceId, features, buttonText, isPro = false, isBusiness=false, popularPlan = false }: PlanProps) => (
    <Card className={`relative overflow-hidden transition-all duration-300 ${popularPlan ? 'border-primary shadow-lg scale-105' : 'hover:border-primary hover:shadow-md'
        }`}>
        {/* {popularPlan && (
            <Badge className="absolute top-0 right-0 m-4" variant="secondary">
                Most Popular
            </Badge>
        )} */}

        <CardHeader>
            <CardTitle className={`text-2xl font-bold`}>{title}</CardTitle>
        </CardHeader>
        <CardDescription>
            {isPro && (
                <span className="text-muted-foreground">For Small Business</span>
            ) }
            {isBusiness && (
                <span className="text-muted-foreground">For Growing Business</span>
            ) }
            {!isPro && !isBusiness && (
                <span className="text-muted-foreground">For Hobby Project</span>
            ) }
            
        </CardDescription>
        <CardContent>
            <p className="text-4xl font-bold mb-6">
                ${price}<span className="text-lg font-normal text-muted-foreground">/month</span>
            </p>
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

                                    <span className={feature.included ? '' : 'text-muted-foreground'}>
                                        <div className='relative'>
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
               href = {
                     buttonText === 'Get Started' ? '/login' : `/checkout?priceId=${priceId}`
               }
                
                className={buttonVariants({
                    variant:'default',
                    size: 'lg',
                    className: 'w-full'
                })}
            >
                {buttonText}{(isPro || isBusiness) && <Gem className='w-4 h-4 ml-2'/>}
            </Link>
        </CardFooter>
    </Card>
);

const AwesomePricingSection: React.FC = () => {
    const plans: PlanProps[] = [
        {
            title: "Starter",
            price: 0,
            features: [
                { text: "Collect up to 10 testimonials", included: true },
                { text: "1 Space", included: true, tooltip: "A space is a collection of testimonials for a specific product or service" },
                { text: "Public testimonial form", included: true },
                {text: "Love Gallery with our branding", included: true},

                { text: "Basic customization", included: true },
                // { text: "Email support", included: true },
                // { text: "Analytics", included: false },
            ],
            buttonText: "Get Started",
        },
        {
            title: "Pro",
            price: 10,
            features: [
                { text: "Collect unlimited testimonials", included: true },
                { text: "1 Space", included: true, tooltip: "A space is a collection of testimonials for a specific product or service" },
                { text: "Public testimonial form", included: true },
                {text: "Love Gallery without our branding", included: true},

                { text: "Advanced customization", included: true, commingSoon: true },
                // { text: "Priority email support", included: true },
                // { text: "Basic analytics", included: true },
                // { text: "Priority support", included: true },
            ],
            // add gem icon too in buttonText
            buttonText: 'Upgrade Now',
            isPro: true,
            priceId: 'pri_01j7qw0djsh1vrvh9c8gb5jn49',
            popularPlan: false,
        },
        {
            title: "Business",
            price: 25,
            features: [
                { text: "Collect unlimited testimonials", included: true },
                { text: "5 Spaces", included: true, tooltip: "A space is a collection of testimonials for a specific product or service" },
                { text: "Public testimonial form", included: true },
                {text: "Love Gallery without our branding", included: true},
                { text: "Advanced customization", included: true, commingSoon: true },
                // { text: "Priority email support", included: true },
                // { text: "Advanced analytics", included: true },
                // { text: "Priority support", included: true },
            ],
            buttonText: "Upgrade Now",
            priceId:'pri_01j7qw282z1ny3p1zhx3afh83h',
            isBusiness: true,
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-gradient-to-b from-background to-secondary/20">
            <MaxWidthWrapper className="text-center">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-muted-foreground mb-12">Choose the plan that's right for you</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
                    {plans.map((plan, index) => (
                        <PricingCard key={index} {...plan} />
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
                                No, currently all our plans are billed monthly. Please send an email to
                                <span className='text-blue-500'> support@clientwords.com</span> for any special requests. We will reach out to you as soon as possible.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Do you offer a free trial?</AccordionTrigger>
                            <AccordionContent>
                           
                                No we do not offer a free trial at this time. You can start with our free plan and upgrade at any time.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>

                <div className="text-center mt-12">
                    <p className="text-muted-foreground mb-4">Still have questions?</p>
                    <Button variant="outline">

                        <HelpCircle className="mr-2 inline h-4 w-4" />
                        <a href="mailto:support@clientwords.com" className="text-indigo-400 hover:underline">
                            Email Support
                        </a>
                    </Button>

                </div>

            </MaxWidthWrapper>
        </section>
    );
};

export default AwesomePricingSection;