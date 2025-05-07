'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 sm:pb-24 hero-background">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 to-gray-900/80" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                            <span className="text-sm font-medium">✨ The Ultimate Testimonial Platform</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                            <span className="gradient-text">Collect, Manage & Show</span>
                            <br />
                            Customer Testimonials
                        </h1>
                        <p className="mt-3 text-lg text-gray-300 md:text-xl md:max-w-2xl">
                            The all-in-one platform to gather authentic customer feedback, organize testimonials, and display them beautifully on your website with single line of code.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-primary hover:bg-primary/90 transition-all duration-200"
                            >
                                Get Started Free
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <Link
                                href="#demo"
                                className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                            >
                                View Live Demo
                            </Link>
                        </div>

                        <p className="mt-4 text-sm text-gray-400">
                            * No credit card required!
                        </p>

                        {/* <div className="mt-8 flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden">
                                        <Image
                                            src={`/demo/avatar-${i}.png`}
                                            alt={`User ${i}`}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <p className="text-sm text-gray-400">
                                Trusted by <span className="text-primary">1,000+</span> businesses worldwide
                            </p>
                        </div> */}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/demo/dashboard-preview.png"
                                alt="Dashboard Preview"
                                width={600}
                                height={400}
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

