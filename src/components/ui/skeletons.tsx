'use client'

export const SkeletonSpaceCard = () => {
  return (
    <div className="bg-blue-400 backdrop-blur-sm bg-opacity-10 border border-blue-500 rounded-lg shadow-lg hover:shadow-xl animate-pulse">
      <div className="p-6">
        {/* Skeleton for icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-300 rounded-full h-12 w-12"></div>
        </div>
        
        {/* Skeleton for space name */}
        <div className="h-6 bg-gray-300 rounded-md mb-2 mx-auto w-3/4"></div>
        
        {/* Skeleton for testimonials count */}
        <div className="h-4 bg-gray-300 rounded-md mb-4 mx-auto w-1/2"></div>
        
        {/* Skeleton for button */}
        <div className="h-8 bg-gray-300 rounded-md mx-auto w-2/3"></div>
      </div>
    </div>
  );
};

export const MultipleSkeletonSpaceCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <SkeletonSpaceCard />
        </div>
      ))}
    </div>
  );
}

export function SkeletonTestimonialCard() {
    
        return (
          <div className="p-4 max-w-sm mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        );   
}

export function MultipleSkeletonTestimonialCard() {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 mx-auto max-w-7xl">

      {[...Array(6)].map((_, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          <SkeletonTestimonialCard />
        </div>
      ))}
    </div>
  );
}