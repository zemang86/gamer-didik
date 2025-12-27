'use client';

import { motion } from 'framer-motion';
import { Eye, Clock, Share2 } from 'lucide-react';
import Image from 'next/image';
import { EpisodeAnalytics, formatWatchTime } from '@/data/analyticsData';
import { getYouTubeThumbnail } from '@/lib/utils';
import { episodes } from '@/data/episodes';

interface EpisodeTableProps {
  data: EpisodeAnalytics[];
}

export default function EpisodeTable({ data }: EpisodeTableProps) {
  // Get YouTube thumbnails
  const episodeMap = new Map(episodes.map(e => [e.id, e]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="glass rounded-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">Top Episodes</h3>
        <p className="text-gdc-gray text-sm">Ranked by total views</p>
      </div>

      <div className="space-y-3">
        {data.slice(0, 10).map((episode, index) => {
          const ep = episodeMap.get(episode.episodeId);
          const thumbnail = ep?.youtubeId
            ? getYouTubeThumbnail(ep.youtubeId, 'default')
            : episode.thumbnailUrl;

          return (
            <motion.div
              key={episode.episodeId}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {/* Rank */}
              <div className="w-6 text-center">
                <span className={`font-bold ${index < 3 ? 'text-gdc-red' : 'text-gdc-gray'}`}>
                  {index + 1}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={thumbnail}
                  alt={episode.titleBM}
                  fill
                  className="object-cover"
                  sizes="64px"
                />
              </div>

              {/* Title */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {episode.titleBM}
                </p>
                <p className="text-gdc-gray text-xs">EP {episode.episodeNumber}</p>
              </div>

              {/* Stats */}
              <div className="hidden sm:flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1 text-gdc-gray">
                  <Eye size={12} />
                  <span>{episode.views.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1 text-gdc-gray">
                  <Clock size={12} />
                  <span>{formatWatchTime(episode.watchTimeMinutes)}</span>
                </div>
                <div className="flex items-center gap-1 text-gdc-gray">
                  <Share2 size={12} />
                  <span>{episode.shares.toLocaleString()}</span>
                </div>
              </div>

              {/* Completion rate */}
              <div className="text-right">
                <p className="text-gdc-red font-medium text-sm">{episode.avgWatchPercent}%</p>
                <p className="text-gdc-gray text-xs">watched</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
