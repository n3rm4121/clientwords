import { Check, Gem } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { PlanProps } from './PricingSection'
import Link from 'next/link'




interface PricingCardProps extends PlanProps {
    isAnnual: boolean
}

export function PricingCard({
    title,
    monthlyPrice,
    annualPrice,
    oneTimePrice,
    features,
    buttonText,
    isPro,
    isAnnual,
    monthlyPriceId,
    annualPriceId,
    oneTimePriceId
}: PricingCardProps) {

    const getCheckoutLink = () => {
        if (buttonText === 'Get Started') {
            return '/login'
        }

        if (oneTimePrice !== undefined) {
            return `/checkout?priceId=${oneTimePriceId}`
        }

        return `/checkout?priceId=${isAnnual ? annualPriceId : monthlyPriceId}`
    }


    const price = oneTimePrice !== undefined
        ? oneTimePrice
        : isAnnual
            ? annualPrice
            : monthlyPrice

    const priceId = oneTimePrice !== undefined
        ? oneTimePriceId
        : isAnnual
            ? annualPriceId
            : monthlyPriceId

    return (
        <Card className={`w-full ${isPro ? 'border-indigo-500' : ''}`}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>
                    {oneTimePrice !== undefined ? (
                        <span className="text-3xl font-bold">${oneTimePrice}</span>
                    ) : (
                        <>
                            <span className="text-3xl font-bold">${price}</span>
                            <span className="text-gray-500">/{isAnnual ? 'year' : 'month'}</span>
                        </>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                            <Check className="h-5 w-5 text-green-500 mr-2" />
                            {feature.tooltip ? (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="text-sm text-gray-300">{feature.text}</span>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{feature.tooltip}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ) : (
                                <span className="text-sm text-gray-300">{feature.text}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Link
                    href={getCheckoutLink()}
                    className={buttonVariants({
                        variant: isPro ? 'default' : 'outline',
                        size: 'lg',
                        className: 'w-full'
                    })}
                >
                    {buttonText}
                </Link>
            </CardFooter>
        </Card>
    )
}