'use client'

import TestimonialCardForm from '@/components/dashboard/testimonialCardForm';
import React, { useEffect, useState } from 'react';

interface DynamicSpaceWrapperProps {
  children: React.ReactNode;
  initialIsNewSpace: boolean;
  spaceId: string;
}

export default function DynamicSpaceWrapper({ children, spaceId, initialIsNewSpace }: DynamicSpaceWrapperProps) {
  const [isNewSpace, setIsNewSpace] = useState(initialIsNewSpace);

  useEffect(() => {
    console.log('DynamicSpaceWrapper rendered. isNewSpace:', isNewSpace);
  }, [isNewSpace]);

  if (!isNewSpace) {
    console.log('Rendering full page content');
    return <>{children}</>;
  }

  console.log('Rendering only TestimonialCardForm');
  return (
    <TestimonialCardForm 
      isUpdate={false} 
      spaceId={spaceId} 
      setIsNewSpace={setIsNewSpace}
    />
  );
}