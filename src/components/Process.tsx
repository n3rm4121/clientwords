'use client'

import { motion } from 'framer-motion'
import { Pencil, Share2, Inbox, BarChart } from 'lucide-react'

const steps = [
    {
        name: 'Create',
        description: 'Design a custom testimonial form tailored to your business needs.',
        icon: Pencil,
    },
    {
        name: 'Share',
        description: 'Send the unique form link to your clients via email or any channel.',
        icon: Share2,
    },
    {
        name: 'Collect',
        description: 'Receive and review client testimonials in your dashboard.',
        icon: Inbox,
    },
    {
        name: 'Showcase',
        description: 'Display testimonials on your website to boost credibility and conversions.',
        icon: BarChart,
    },
]

export default function Process() {
    return (
        <section id="how-it-works" className="py-20 bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-primary font-semibold tracking-wide uppercase">How It Works</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
                        Simple steps to powerful testimonials
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-400 lg:mx-auto">
                        Follow these four easy steps to start leveraging the power of customer testimonials.
                    </p>
                </div>

                <div className="mt-10">
                    <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white">
                                        <step.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="ml-4 text-lg leading-6 font-medium text-white">{step.name}</h3>
                                </div>
                                <p className="text-base text-gray-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

