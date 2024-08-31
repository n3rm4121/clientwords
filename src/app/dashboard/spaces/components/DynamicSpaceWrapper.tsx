'use client'

import TestimonialCardForm from '@/components/dashboard/testimonialCardForm';
import React, { useEffect, useState } from 'react';

interface DynamicSpaceWrapperProps {
  children: React.ReactNode;
  initialIsNewSpace: boolean;
  spaceId: string;
}

const DynamicSpaceWrapper: React.FC<DynamicSpaceWrapperProps> = ({ children,spaceId, initialIsNewSpace }) => {
  const [isNewSpace, setIsNewSpace] = useState(initialIsNewSpace);

  useEffect(() => {
    console.log('DynamicSpaceWrapper rendered. isNewSpace:', isNewSpace);
  }, [isNewSpace]);


  // Clone the children and pass the setIsNewSpace function to TestimonialCardForm
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child) && child.type === TestimonialCardForm) {
      return React.cloneElement(child, { setIsNewSpace } as Partial<React.ComponentProps<typeof TestimonialCardForm>>);
    }
    return child;
  });

  // If it's no longer a new space, render the full page content
  if (!isNewSpace) {
    console.log('Rendering full page content');
    return <>{childrenWithProps}</>;
  }

  // Otherwise, render just the TestimonialCardForm
  console.log('Rendering only TestimonialCardForm');
  return (
    <>
      {/* {React.Children.toArray(childrenWithProps).find(
        (child) => React.isValidElement(child) && child.type === TestimonialCardForm
      )} */}
      <TestimonialCardForm isUpdate={false} spaceId={spaceId} />
    </>
  );
};

export default DynamicSpaceWrapper;