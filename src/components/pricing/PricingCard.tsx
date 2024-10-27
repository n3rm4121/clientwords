'use client'

import React from 'react';
import Link from 'next/link';
import { Check, X, HelpCircle, Gem } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PlanProps } from './PricingSection';



export const PricingCard = ({ title, monthlyPrice, annualPrice, monthlyPriceId, annualPriceId, features, buttonText, isPro = false, isAnnual }: PlanProps & { isAnnual: boolean }) => {
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


