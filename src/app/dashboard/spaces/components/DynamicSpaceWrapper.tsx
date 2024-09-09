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
  }, [isNewSpace]);

  if (!isNewSpace) {
    return <>{children}</>;
  }

  return (
    <TestimonialCardForm 
      isUpdate={false} 
      spaceId={spaceId} 
      setIsNewSpace={setIsNewSpace}
    />
  );
}