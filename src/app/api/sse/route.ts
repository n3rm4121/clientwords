import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Testimonial from '@/models/testimonials.model';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const spaceId = searchParams.get('spaceId');


  await dbConnect();

  const headers = new Headers({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      const changeStream = Testimonial.watch();

      changeStream.on("change", (change) => {
        if (change.operationType === "insert") {
          const newTestimonial = change.fullDocument;

          if (newTestimonial.spaceId.toString() === spaceId) {
            controller.enqueue(`data: ${JSON.stringify(newTestimonial)}\n\n`);
          } 
        }
      });

      request.signal.addEventListener("abort", () => {
        changeStream.close();
        controller.close();
      });
    },
  });

  return new NextResponse(readableStream, { headers });
}
