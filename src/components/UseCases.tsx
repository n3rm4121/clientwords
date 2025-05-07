'use client'

import { motion } from 'framer-motion';
import { MaxWidthWrapper } from "@/components/MaxWidthWrapper";
import { Card } from "@/components/ui/card";
import { FaStore, FaBriefcase, FaGraduationCap, FaHotel, FaLaptopCode, FaUserMd } from "react-icons/fa";
import Link from 'next/link';

const useCases = [
    {
        name: 'E-commerce',
        description: 'Showcase product reviews to increase trust and drive more sales. Display customer experiences to highlight product quality and satisfaction.',
        icon: FaStore,
    },
    {
        name: 'B2B Services',
        description: 'Build credibility with potential clients. Highlight success stories and testimonials from satisfied customers.',
        icon: FaBriefcase,
    },
    {
        name: 'Education',
        description: 'Attract more enrollments by featuring student and parent testimonials. Showcase the quality of your programs.',
        icon: FaGraduationCap,
    },
    {
        name: 'Hospitality',
        description: 'Encourage more bookings by displaying guest reviews. Highlight your excellent service and amenities.',
        icon: FaHotel,
    },
    {
        name: 'SaaS',
        description: 'Drive user adoption by showcasing testimonials. Highlight key features and benefits of your software.',
        icon: FaLaptopCode,
    },
    {
        name: 'Healthcare',
        description: 'Build trust in your services by sharing patient testimonials. Emphasize quality care and positive outcomes.',
        icon: FaUserMd,
    }
];

const UseCasesSection = () => {
    return (
        <section id="use-cases" className="py-24 bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <span className="text-sm font-medium">Use Cases</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Perfect for Every Industry
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
                        Whether you're in e-commerce, SaaS, or healthcare, ClientWords helps you showcase authentic customer feedback.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {useCases.map((useCase, index) => (
                        <motion.div
                            key={useCase.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-all duration-200"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-lg bg-primary/10">
                                    <useCase.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-semibold text-white">{useCase.name}</h3>
                            </div>
                            <p className="text-gray-400">{useCase.description}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <Link
                        href="/login"
                        className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-500 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10 transition-colors duration-300"
                    >
                        Start Your Industry-Specific Solution
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default UseCasesSection;

