'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function CTA() {
    return (
        <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 to-blue-500/20 p-8 sm:p-12"
                >
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-gray-900/20" />

                    {/* Content */}
                    <div className="relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-center"
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                                <Sparkles className="w-4 h-4 mr-2" />
                                <span className="text-sm font-medium">Ready to Get Started?</span>
                            </span>

                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                                Transform Your Customer Feedback Into
                                <span className="gradient-text"> Powerful Social Proof</span>
                            </h2>

                            <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto mb-8">
                                Join thousands of businesses that trust ClientWords to collect, manage, and showcase authentic customer testimonials.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-gray-900 bg-primary hover:bg-primary/90 transition-all duration-200"
                                >
                                    Start Free Trial
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="#demo"
                                    className="inline-flex items-center justify-center px-8 py-3 border border-gray-600 text-base font-medium rounded-lg text-white hover:bg-white/10 transition-all duration-200"
                                >
                                    View Live Demo
                                </Link>
                            </div>

                            <p className="mt-6 text-sm text-gray-400">
                                No credit card required!
                            </p>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl" />
                </motion.div>
            </div>
        </section>
    )
}

