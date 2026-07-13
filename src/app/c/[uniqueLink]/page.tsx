import NotFound from "@/app/not-found";
import dbConnect from "@/lib/dbConnect";
import { canCollectTestimonial } from "@/lib/featureAccess";
import Space from "@/models/space.model";
import TestimonialCard from "@/models/testimonial-card.model";
import User from "@/models/user.model";
import WorkerModel from "@/models/worker.model";
import { Metadata } from "next";
import { TestimonialSubmitForm } from "@/app/[spaceName]/components/TestimonailSubmitForm";

export const metadata: Metadata = {
  title: 'Worker Testimonial Submission',
};

interface WorkerSubmissionPageProps {
  params: {
    uniqueLink: string;
  };
}

const WorkerSubmissionPage = async ({ params }: WorkerSubmissionPageProps) => {
  const { uniqueLink } = params;

  try {
    await dbConnect();

    // Find the worker by uniqueLink
    const worker = await WorkerModel.findOne({ uniqueLink: new RegExp(`^${uniqueLink}$`, 'i') }).exec();

    if (!worker) {
      return <NotFound />;
    }

    // Find the space
    const space = await Space.findById(worker.spaceId).select('name testimonials owner').exec();

    if (!space) {
      return <NotFound />;
    }

    // Find the TestimonialCard for this space
    const testimonialCardData = await TestimonialCard.findOne({
      spaceId: space._id,
    }).exec();

    if (!testimonialCardData) {
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

    return (
      <TestimonialSubmitForm 
        testimonialCardData={testimonialCardDataObj} 
        workerId={worker._id.toString()} 
        workerName={worker.name}
      />
    );
  } catch (error) {
    console.error("Error fetching worker testimonial data:", error);
    return <NotFound />;
  }
};

export default WorkerSubmissionPage;
