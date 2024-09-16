import NotFound from "@/app/not-found";
import TestimonialSubmit from "@/components/dashboard/Testimonial/testimonailSubmit";
import dbConnect from "@/lib/dbConnect";
import { canCollectTestimonial } from "@/lib/featureAccess";
import Space from "@/models/space.model";
import TestimonialCard, { ITestimonialCard } from "@/models/testimonial-card.model"; // Assuming ITestimonialCard is the correct type for TestimonialCard
import User from "@/models/user.model";
import { Metadata } from "next";

export const metadata: Metadata= {
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
    // Connect to MongoDB
    await dbConnect();
    // Fetch the testimonial card data based on the id (which is the spaceId)
    let testimonialCardData = await TestimonialCard.findOne({ spaceName: spaceName }).exec();
    if(!testimonialCardData) {
      return <NotFound />;
    }

    const space = await Space.findOne({name: spaceName}).select('testimonials, owner').exec();
    if (!space) {
      return <NotFound />;
    }
    const user = await User.findById(space.owner).select('subscriptionTier').exec();
    if (!user) {
      return <NotFound />;
    }

    const can = canCollectTestimonial(user.subscriptionTier, space.testimonials?.length|| 0);
    if (!can) {
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
    return <NotFound />;
  }
};

export default SubmissionPage;
