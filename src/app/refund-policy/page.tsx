import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MoveLeftIcon } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: "Refund Policy"
}

const refundPolicy = [
  {
    title: "Eligibility for Refunds",
    points: [
      "If the embed code for testimonials does not function as expected on your website, and our support team is unable to resolve the issue within a reasonable time.",
      "If the service you purchased does not match the description provided on our platform or does not meet the functionality promised.",
      "If you cancel your subscription within the first 7 days of purchase for annual or monthly plans, and the service has not been fully utilized."
    ]
  },
  {
    title: "Non-Refundable Services",
    points: [
      "Subscription fees beyond the initial 7-day period are non-refundable.",
      "Any fees paid for custom integrations or additional services beyond the standard subscription are non-refundable after the service has been delivered."
    ]
  },
  {
    title: "Refund Request Process",
    points: [
      "Refund requests must be submitted within 7 days of your subscription purchase or renewal.",
      "To initiate a refund, please contact our support team at support@clientwords.com with your account details and the reason for the refund request."
    ]
  },
  {
    title: "Refund Approval",
    points: [
      "All refund requests will be reviewed and processed within 10 business days.",
      "Approved refunds will be credited back to the original payment method used during purchase.",
      "Partial refunds may be considered based on the amount of service utilized at the time of the request."
    ]
  },
  {
    title: "Cancellation of Subscription",
    points: [
      "You can cancel your subscription at any time. Upon cancellation, you will retain access to the platform until the end of your billing cycle, but no further payments will be charged.",
      "No refunds will be provided for unused time in the current billing cycle after the 7-day initial period."
    ]
  },
  {
    title: "Amendments to the Policy",
    points: [
      "We reserve the right to amend this refund policy at any time.",
      "Any changes will be posted on this page and communicated to users if necessary."
    ]
  }
];

const RefundPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center p-4 bg-[#212121] text-gray-50">
      <div className="w-full max-w-2xl space-y-10 py-10 p-8">
        <Link href='/' className={buttonVariants()}>
          <MoveLeftIcon className="h-6 w-6 mr-2" />
          Back
        </Link>
        <h1 className="text-4xl text-center font-extrabold text-gray-200">
          Refund Policy
        </h1>

        {refundPolicy.map((section, index) => (
          <div key={index} className="p-6 rounded-lg mb-6">
            <h2 className="text-3xl font-semibold text-gray-200 mb-4">{section.title}</h2>
            <ul className="list-disc list-inside text-gray-400 leading-relaxed mb-4">
              {section.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>
        ))}

        <Card className=" p-6 rounded-lg text-white">
          <h2 className="text-3xl font-semibold mb-4">Need Help?</h2>
          <p className="text-lg leading-relaxed">
            If you have any questions or need assistance, feel free to reach out to our support team. We're here to help!
          </p>
          <a href="mailto:support@clientwords.com" className="block mt-4 text-center bg-white text-yellow-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition">
            Contact Support
          </a>
        </Card>
      </div>
      <p className="mb-6 text-gray-600">Last updated: 09-04-2024</p>
    </div>
  );
}

export default RefundPolicy;
