'use client'

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