import { TestimonialCard } from "@/components/TestimonialCard";

export const testimonials = [
  {
      name: "John Doe",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/wall3.jpeg'
  },
  {
      name: "Hero Doe",
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/dpe.jpg'
  },

  {
      name: "Jane Doe",  
      testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
      image: '/dpe.jpg'

  },
  {
    name: "Jane Doe",  
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
    image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

},
{
  name: "Jane Doe",  
  testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut est nec odio. Nullam nec nunc non odio luctus accumsan. Nullam nec nunc non odio luctus accumsan.",
  image: '/dpe.jpg'

}
]

export default function Testimonials() {
  return (
    <div className="px-4 py-8 bg-gray-100">
      <h1 className="text-3xl font-semibold text-center mb-8">What Our Clients Say</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto max-w-7xl">
       
        {testimonials.map((testimonial, index) => (
           <TestimonialCard key={index} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
