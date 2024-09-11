import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Refund Policy"
}

const RefundPolicy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-4xl text-center font-extrabold text-gray-800 mb-6">
        Refund Policy
      </h1>
      <p className="mb-6 text-lg leading-relaxed text-gray-700 text-center">
        Welcome to <span className="font-semibold">ClientWords</span>. Our goal is to provide clear and transparent policies. Please review our <span className="font-semibold">no refund policy</span> below for details on how payments and cancellations are handled.
      </p>

      <div className="p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-semibold text-yellow-600 mb-4">1. No Refunds</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          We have a <span className="font-bold">strict no-refund policy</span>. Once payment is processed, it is final and non-refundable under any circumstances.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Please ensure that you are aware of the terms and services before making any payments.
        </p>
      </div>

      <div className="p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-semibold text-yellow-600 mb-4">2. Monthly Subscription Only</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Currently, we only offer a <span className="font-bold">monthly subscription</span> for our services. Your subscription renews every month, and you are billed accordingly.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Make sure to review your subscription settings to avoid unwanted charges.
        </p>
      </div>

      <div className="p-6 rounded-lg mb-6">
        <h2 className="text-3xl font-semibold text-yellow-600 mb-4">3. Cancellation</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          You can cancel your subscription at any time via your account settings. Once canceled, your account will remain active until the current billing cycle ends. <span className="font-bold">No refunds or prorated refunds</span> will be provided for unused time.
        </p>
      </div>

      <div className="bg-yellow-600 p-6 rounded-lg text-white">
        <h2 className="text-3xl font-semibold mb-4">Need Help?</h2>
        <p className="text-lg leading-relaxed">
          If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!
        </p>
        <a href="mailto:support@clientwords.com" className="block mt-4 text-center bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
          Contact Support
        </a>
      </div>
    </div>
  );
};

export default RefundPolicy;
