'use client'

import { useEffect, useState } from 'react';
import { Users, TrendingUp } from 'lucide-react';

interface Award {
  label: string;
  domain?: string;
  svg?: string;
  caption?: string;
}

const awards: Award[] = [
  {
    label: "Entrepreneurs Circle",
    domain: "entrepreneurscircle.org",
    caption: "Entrepreneur of the Year 2025"
  },
  {
    label: "Fluxx",
    domain: "fluxx.uk",
    caption: "Fluxx Award"
  },
  {
    label: "Top Doctors",
    domain: "topdoctors.co.uk",
    caption: "Multiple Awards"
  }
];

export function AwardsBanner() {
  const [loadedLogos, setLoadedLogos] = useState<Record<string, boolean>>({});

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="min-w-[260px] max-w-xl">
            <p className="uppercase text-xs tracking-widest text-slate-500 mb-2">Awards & Recognition</p>
            <p className="text-sm text-slate-600">
              Founded by <span className="font-semibold">Inder Birdi</span> — EC Entrepreneur of the Year 2025, Fluxx Award,
              multiple Top Doctors awards. Built a 7-figure clinic and helped others double & triple revenue.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 lg:gap-8">
            {awards.map((award) => (
              <div key={award.label} className="flex flex-col items-center gap-2" data-testid={`award-${award.label.toLowerCase().replace(/\s+/g, '-')}`}>
                {award.domain && (
                  <>
                    <img
                      src={`https://logo.clearbit.com/${award.domain}`}
                      alt={award.label}
                      title={`${award.label}${award.caption ? ` — ${award.caption}` : ''}`}
                      className={`h-10 object-contain ${loadedLogos[award.domain] === false ? 'hidden' : ''}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        setLoadedLogos(prev => ({ ...prev, [award.domain!]: false }));
                      }}
                      onLoad={(e) => {
                        setLoadedLogos(prev => ({ ...prev, [award.domain!]: true }));
                      }}
                    />
                    {loadedLogos[award.domain] === false && (
                      <div className="flex items-center justify-center bg-slate-900 text-slate-50 font-semibold rounded-xl px-3 py-2 h-12 min-w-[190px] text-sm">
                        {award.label}
                      </div>
                    )}
                  </>
                )}
                {award.caption && (
                  <div className="text-xs text-slate-600 text-center max-w-[140px]">
                    {award.caption}
                  </div>
                )}
              </div>
            ))}
            
            <div className="flex flex-col items-center gap-2" data-testid="award-7-figure-practice">
              <div className="text-brand-indigo" title="Built a 7-figure clinic" aria-label="7-Figure Practice">
                <svg viewBox="0 0 24 24" width="40" height="40" aria-hidden="true">
                  <path d="M3 3h18v4H3V3zm2 6h14v12H5V9zm3 3v6h2v-6H8zm4 0v6h2v-6h-2zm4 0v6h2v-6h-2z" fill="currentColor"/>
                </svg>
              </div>
              <div className="text-xs text-slate-600 text-center max-w-[140px]">
                Built a 7-figure clinic
              </div>
            </div>

            <div className="flex flex-col items-center gap-2" data-testid="award-mentor-growth">
              <div className="text-brand-indigo" title="Helped others 2-3× revenue" aria-label="Mentor Growth">
                <TrendingUp className="w-10 h-10" />
              </div>
              <div className="text-xs text-slate-600 text-center max-w-[140px]">
                Helped others 2–3× revenue
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
