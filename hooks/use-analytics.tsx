'use client'

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '../lib/analytics';

export const useAnalytics = () => {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string>(pathname);
  
  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      trackPageView(pathname);
      prevPathnameRef.current = pathname;
    }
  }, [pathname]);
};
