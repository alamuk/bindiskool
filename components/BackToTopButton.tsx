"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // show after user has scrolled ~600px
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className="
        fixed bottom-6 right-4 sm:bottom-8 sm:right-6
        z-40
        inline-flex items-center justify-center
        h-12 w-12 rounded-full
        bg-brand-indigo text-white
        shadow-lg shadow-black/20
        hover:bg-brand-blue
        focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-2 focus:ring-offset-transparent
        transition
      "
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
