'use client';

import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import Image from 'next/image';
import { Episode } from '@/types/episode';
import { formatDuration, getYouTubeThumbnail } from '@/lib/utils';

interface EpisodeCardProps {
  episode: Episode;
  onPlay: (episode: Episode) => void;
  index?: number;
}

export default function EpisodeCard({ episode, onPlay, index = 0 }: EpisodeCardProps) {
  const thumbnailUrl = episode.youtubeId
    ? getYouTubeThumbnail(episode.youtubeId, 'hq')
    : episode.thumbnailUrl;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative"
    >
      <button
        onClick={() => onPlay(episode)}
        className="block w-full text-left episode-card rounded-xl overflow-hidden bg-gdc-dark-lighter focus:outline-none focus:ring-2 focus:ring-gdc-red focus:ring-offset-2 focus:ring-offset-gdc-dark"
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={episode.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Episode Number Badge */}
          <div className="absolute top-3 left-3 px-2 py-1 bg-gdc-red rounded-md text-xs font-bold text-white">
            EP {episode.episodeNumber}
          </div>

          {/* Duration Badge */}
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-xs font-medium text-white flex items-center gap-1">
            <Clock size={12} />
            {formatDuration(episode.duration)}
          </div>

          {/* Play Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gdc-red/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
              <Play size={28} fill="white" className="ml-1" />
            </div>
          </div>

          {/* Bottom Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-gdc-dark-lighter to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-base mb-1 line-clamp-1 group-hover:text-gdc-red transition-colors">
            {episode.titleBM}
          </h3>
          <p className="text-gdc-gray text-sm line-clamp-2">
            {episode.descriptionBM}
          </p>
        </div>
      </button>
    </motion.article>
  );
}
