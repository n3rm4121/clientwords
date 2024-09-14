import NotFound from "@/app/not-found";
import TestimonialSubmit from "@/components/dashboard/Testimonial/testimonailSubmit";
import dbConnect from "@/lib/dbConnect";
import { canCollectTestimonial } from "@/lib/featureAccess";
import Space from "@/models/space.model";
import TestimonialCard, { ITestimonialCard } from "@/models/testimonial-card.model"; // Assuming ITestimonialCard is the correct type for TestimonialCard
import Testimonial from "@/models/testimonials.model";
import User from "@/models/user.model";
import mongoose from "mongoose";

interface SubmissionPageProps {
  params: {
    spaceName: string;
    id: string; // This is the spaceId
  };
}

const SubmissionPage = async ({ params }: SubmissionPageProps) => {

  const { spaceName, id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Return default 404 page if the id is not a valid ObjectId
    return <NotFound />;
  }

  try {
    // Connect to MongoDB
    await dbConnect();
    // Fetch the testimonial card data based on the id (which is the spaceId)
    let testimonialCardData = await TestimonialCard.findOne({ spaceName, spaceId: id });

    const space = await Space.findById(id).select('testimonials, owner').exec();
    const user = await User.findById(space.owner).select('subscriptionTier').exec();

    const can = canCollectTestimonial(user.subscriptionTier, space.testimonials?.length|| 0);
    if (!testimonialCardData) {
      // Return default 404 page if no testimonial card is found
      return <NotFound />;
    }
    
    testimonialCardData = testimonialCardData.toObject();
    testimonialCardData._id = testimonialCardData._id.toString();
    testimonialCardData.spaceId = testimonialCardData.spaceId.toString();
    
    if(!can) {
      return <NotFound />;
    }
    return <TestimonialSubmit testimonialCardData={testimonialCardData} />;

  } catch (error) {
    console.error("Error fetching testimonial card data:", error);
    // Handle the error accordingly (return a custom error page, log it, etc.)
    return <NotFound />;
  }
};

export default SubmissionPage;
