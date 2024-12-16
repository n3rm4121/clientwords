'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
    return (
        <section className="relative overflow-hidden pt-32 pb-16 sm:pb-24 hero-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
                        <span className="gradient-text">Transform Customer Words</span>
                        <br />
                        Into Powerful Social Proof
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Easily collect, curate, and showcase authentic client testimonials to skyrocket trust and boost your conversions.
                    </p>
                    <div className="mt-10 max-w-md mx-auto sm:flex sm:justify-center md:mt-12">
                        <div className="rounded-md shadow">
                            <Link
                                href="/login"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-primary hover:bg-primary/90 md:py-4 md:text-lg md:px-10"
                            >
                                Get started
                            </Link>
                        </div>
                        <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                            <Link
                                href="#features"
                                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                            >
                                Learn more
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

