'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTA() {
    return (
        <section className="bg-violet-800">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                        <span className="block">Ready to boost your conversions?</span>
                        <span className="block text-primary">Start using ClientWords today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-gray-300">
                        Join thousands of businesses leveraging the power of customer testimonials to increase trust and drive growth.
                    </p>
                </motion.div>
                <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="inline-flex rounded-md shadow"
                    >
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent font-medium rounded-md text-gray-900 bg-primary hover:bg-primary/90"

                        >
                            Get started
                        </Link>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="ml-3 inline-flex rounded-md shadow"
                    >
                        <Link
                            href="#features"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-gray-900 text-base font-medium rounded-md bg-white hover:bg-gray-50"
                        >
                            Learn more
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

