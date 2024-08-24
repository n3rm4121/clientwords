'use client'
export function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src={testimonial.userAvatar}
          alt={testimonial.userName} 
        />
        <div className="flex flex-col">
          <span className="font-medium text-lg">{testimonial.userName}</span>
          <span className="text-gray-500 text-sm">{testimonial.userIntro}</span>
        </div>
      </div>
      <p className="text-gray-700 italic">{testimonial.message}</p>
    </div>
  );
}