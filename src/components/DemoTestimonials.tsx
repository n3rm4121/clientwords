'use client';

import React from 'react';
import { ITestimonial } from '@/lib/interface';
import TestimonialCarousel from './iframeLayout/carousel';
import { motion } from 'framer-motion';

// Sample demo testimonials data
const demoTestimonials: ITestimonial[] = [
    {
        _id: '1',
        spaceId: '1',
        spaceName: 'Sarah Johnson',
        userName: 'Sarah Johnson',
        userIntro: 'E-commerce Customer',
        userAvatar: '/demo/avatar2.webp',
        message: 'I was skeptical about online shopping until I found this store. The product quality exceeded my expectations and customer service was outstanding. Will definitely shop here again!',
        createdAt: new Date().toISOString(),
    },
    {
        _id: '2',
        spaceId: '2',
        spaceName: 'Michael Chen',
        userName: 'Michael Chen',
        userIntro: 'SaaS Company CEO',
        userAvatar: '/demo/avatar1.png',
        message: 'Implementing this software has increased our team productivity by 35%. The intuitive interface made onboarding new team members a breeze. Worth every penny!',
        createdAt: new Date().toISOString(),
    },
    {
        _id: '3',
        spaceId: '3',
        spaceName: 'Emma Rodriguez',
        userName: 'Emma Rodriguez',
        userIntro: 'Yoga Studio Owner',
        userAvatar: '/demo/avatar2.webp',
        message: "The booking system has revolutionized how we manage our classes. Our students love the easy scheduling and we've seen a 20% increase in class attendance.",
        createdAt: new Date().toISOString(),
    },
    {
        _id: '4',
        spaceId: '4',
        spaceName: 'James Wilson',
        userName: 'James Wilson',
        userIntro: 'Marketing Director',
        userAvatar: '/demo/avatar1.png',
        message: 'This agency delivered results beyond our expectations. Their strategic approach to our campaign generated a 40% increase in qualified leads within just two months.',
        createdAt: new Date().toISOString(),
    },
    {
        _id: '5',
        spaceId: '5',
        spaceName: 'Olivia Taylor',
        userName: 'Olivia Taylor',
        userIntro: 'Education Program Director',
        userAvatar: '/demo/avatar2.webp',
        message: 'Parents consistently tell us how much their children have improved since enrolling in our program. The curriculum is engaging and the teachers are exceptional.',
        createdAt: new Date().toISOString(),
    }
];

export default function DemoTestimonials() {
    return (
        <section id="demo" className="py-24 bg-gradient-to-b from-gray-900 to-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
                        <span className="text-sm font-medium">Live Demo</span>
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        See How It Works
                    </h2>
                    <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
                        Experience how ClientWords can transform your customer feedback into powerful social proof.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                        <span className="bg-primary text-gray-900 px-4 py-1 rounded-md font-bold text-sm uppercase tracking-wider">
                            Live Preview
                        </span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-800"
                    >
                        <TestimonialCarousel testimonials={demoTestimonials} theme="dark" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 