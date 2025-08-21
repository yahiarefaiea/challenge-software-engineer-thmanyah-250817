'use client';

import { useEffect } from 'react';
import { addCollections } from '@/components/Icon/Icon';

export const IconInitializer = () => {
  useEffect(() => {
    addCollections();
  }, []);

  return null;
};
