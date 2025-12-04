'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Episode } from '@/types/episode';
import EpisodeCard from './EpisodeCard';

interface EpisodeRowProps {
  title: string;
  subtitle?: string;
  episodes: Episode[];
  onPlay: (episode: Episode) => void;
}

export default function EpisodeRow({ title, subtitle, episodes, onPlay }: EpisodeRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
          {subtitle && (
            <p className="text-gdc-gray mt-1">{subtitle}</p>
          )}
        </div>

        {/* Navigation Arrows - Desktop */}
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Episodes Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pb-4 snap-x snap-mandatory"
      >
        {episodes.map((episode, index) => (
          <div
            key={episode.id}
            className="flex-none w-72 sm:w-80 snap-start"
          >
            <EpisodeCard episode={episode} onPlay={onPlay} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
