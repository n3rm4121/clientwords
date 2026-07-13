import NotFound from "@/app/not-found";

import dbConnect from "@/lib/dbConnect";
import { canCollectTestimonial } from "@/lib/featureAccess";
import Space from "@/models/space.model";
import TestimonialCard from "@/models/testimonial-card.model";
import User from "@/models/user.model";
import WorkerModel from "@/models/worker.model";
import { Metadata } from "next";
import { TestimonialSubmitForm } from "./components/TestimonailSubmitForm";

export const metadata: Metadata = {
  title: 'Testimonial Submission',
};

interface SubmissionPageProps {
  params: {
    spaceName: string;
    id: string; // This is the spaceId
  };
}

const SubmissionPage = async ({ params }: SubmissionPageProps) => {
  const { spaceName } = params;

  try {
    await dbConnect();

    // Use case-insensitive search for the spaceName
    const testimonialCardData = await TestimonialCard.findOne({
      spaceName: new RegExp(`^${spaceName}$`, 'i'),
    }).exec();

    if (!testimonialCardData) {
      return <NotFound />;
    }

    const space = await Space.findOne({
      name: new RegExp(`^${spaceName}$`, 'i'),
    }).select('testimonials owner').exec();

    if (!space) {
      return <NotFound />;
    }

    const user = await User.findById(space.owner).select('subscriptionTier').exec();
    if (!user) {
      return <NotFound />;
    }

    const can = canCollectTestimonial(user.subscriptionTier, space.testimonials?.length || 0);
    if (!can) {
      return <NotFound />;
    }

    const testimonialCardDataObj = testimonialCardData.toObject();
    testimonialCardDataObj._id = testimonialCardDataObj._id.toString();
    testimonialCardDataObj.spaceId = testimonialCardDataObj.spaceId.toString();

    // Fetch workers for this space
    const workersData = await WorkerModel.find({ spaceId: space._id }).select('_id name role').exec();
    const workers = workersData.map(w => ({
      _id: w._id.toString(),
      name: w.name,
      role: w.role
    }));

    return <TestimonialSubmitForm testimonialCardData={testimonialCardDataObj} spaceWorkers={workers} />;
  } catch (error) {
    console.error("Error fetching testimonial card data:", error);
    return <NotFound />;
  }
};

export default SubmissionPage;
