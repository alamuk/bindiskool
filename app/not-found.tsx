import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Page Not Found — BirdiSkool",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">``
      <Header />

      {/* Main 404 Content */}
      <main className="flex flex-col flex-1 items-center justify-center px-6 text-center py-20">

        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-brand-indigo mb-4">
          This page could not be found
        </h2>

        <p className="text-brand-slate max-w-md text-base sm:text-lg mb-10">
          The page you're trying to access doesn't exist or may have been moved.
          Let’s get you back on track.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 rounded-lg font-montserrat font-semibold hover:bg-blue-500 transition-all hover-lift shadow-md"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </main>

      <Footer />
    </div>
  );
}