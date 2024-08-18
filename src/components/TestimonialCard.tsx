export function TestimonialCard({ testimonial }: { testimonial: any }) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md p-6 shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img
          className="w-12 h-12 rounded-full"
          src={testimonial.image}
          alt={testimonial.name}
        />
        <span className="font-medium text-lg">{testimonial.name}</span>
      </div>
      <p className="text-gray-700 italic">“{testimonial.testimonial}”</p>
    </div>
  );
}
