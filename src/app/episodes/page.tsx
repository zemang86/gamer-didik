'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import EpisodeGrid from '@/components/episodes/EpisodeGrid';
import VideoModal from '@/components/video/VideoModal';
import { episodes, getNextEpisode, getPreviousEpisode } from '@/data/episodes';
import { Episode } from '@/types/episode';

export default function EpisodesPage() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayEpisode = useCallback((episode: Episode) => {
    setSelectedEpisode(episode);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedEpisode(null), 300);
  }, []);

  const handlePreviousEpisode = useCallback(() => {
    if (selectedEpisode) {
      const prev = getPreviousEpisode(selectedEpisode.id);
      if (prev) setSelectedEpisode(prev);
    }
  }, [selectedEpisode]);

  const handleNextEpisode = useCallback(() => {
    if (selectedEpisode) {
      const next = getNextEpisode(selectedEpisode.id);
      if (next) setSelectedEpisode(next);
    }
  }, [selectedEpisode]);

  return (
    <main className="min-h-screen bg-gdc-dark pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Episodes
          </h1>
          <p className="text-gdc-gray-light text-lg">
            Season 1 • 30 Episodes of educational esports content
          </p>
        </motion.div>

        {/* Episodes Grid */}
        <EpisodeGrid episodes={episodes} onPlay={handlePlayEpisode} />
      </div>

      {/* Video Modal */}
      <VideoModal
        episode={selectedEpisode}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onPrevious={handlePreviousEpisode}
        onNext={handleNextEpisode}
        hasPrevious={selectedEpisode ? !!getPreviousEpisode(selectedEpisode.id) : false}
        hasNext={selectedEpisode ? !!getNextEpisode(selectedEpisode.id) : false}
      />
    </main>
  );
}
