import NotFound from "@/app/not-found";
import TestimonialSubmit from "@/components/dashboard/Testimonial/testimonailSubmit";
import dbConnect from "@/lib/dbConnect";
import TestimonialCard, { ITestimonialCard } from "@/models/testimonial-card.model"; // Assuming ITestimonialCard is the correct type for TestimonialCard
import mongoose from "mongoose";

interface SubmissionPageProps {
  params: {
    spaceName: string;
    id: string; // This is the spaceId
  };
}

const SubmissionPage = async ({ params }: SubmissionPageProps) => {
  const { spaceName, id } = params;
  console.log(spaceName, id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    // Return default 404 page if the id is not a valid ObjectId
    return <NotFound />;
  }

  try {
    // Connect to MongoDB
    await dbConnect();

    // Fetch the testimonial card data based on the id (which is the spaceId)
    let testimonialCardData = await TestimonialCard.findOne({ spaceName, spaceId: id });

    if (!testimonialCardData) {
      // Return default 404 page if no testimonial card is found
      console.log("No testimonial card found");
      return <NotFound />;
    }
    
    testimonialCardData = testimonialCardData.toObject();
    testimonialCardData._id = testimonialCardData._id.toString();
  testimonialCardData.spaceId = testimonialCardData.spaceId.toString();

    
    

    return <TestimonialSubmit testimonialCardData={testimonialCardData} />;

  } catch (error) {
    console.error("Error fetching testimonial card data:", error);
    // Handle the error accordingly (return a custom error page, log it, etc.)
    return <NotFound />;
  }
};

export default SubmissionPage;
