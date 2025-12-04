'use client';

import { Episode } from '@/types/episode';
import EpisodeCard from './EpisodeCard';

interface EpisodeGridProps {
  episodes: Episode[];
  onPlay: (episode: Episode) => void;
}

export default function EpisodeGrid({ episodes, onPlay }: EpisodeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {episodes.map((episode, index) => (
        <EpisodeCard
          key={episode.id}
          episode={episode}
          onPlay={onPlay}
          index={index}
        />
      ))}
    </div>
  );
}
