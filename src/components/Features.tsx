'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Zap, Shield } from 'lucide-react'

const features = [
    {
        name: 'Easy Integration',
        description: 'Seamlessly integrate testimonials into your website with just a single line of code.',
        icon: CheckCircle,
    },
    {
        name: 'Boost Conversions',
        description: 'Leverage social proof to build credibility and drive your business growth.',
        icon: Zap,
    },
    {
        name: 'Secure & Reliable',
        description: 'Rest easy knowing your data is protected with enterprise-grade security measures.',
        icon: Shield,
    },
]

export default function Features() {
    return (
        <section id="features" className="py-20 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">Features</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Everything you need to succeed
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                        ClientWords provides all the tools you need to collect, manage, and showcase powerful customer testimonials.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <motion.div
                                key={feature.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative"
                            >
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-white">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-400">{feature.description}</dd>
                            </motion.div>
                        ))}
                    </dl>
                </div>
            </div>
        </section>
    )
}

