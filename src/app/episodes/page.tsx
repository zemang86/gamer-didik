'use client';

import { useState, useCallback, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import EpisodeGrid from '@/components/episodes/EpisodeGrid';
import VideoModal from '@/components/video/VideoModal';
import { episodes, getNextEpisode, getPreviousEpisode, getEpisodeBySlug } from '@/data/episodes';
import { Episode } from '@/types/episode';

function EpisodesContent() {
  const searchParams = useSearchParams();
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auto-open episode from URL parameter
  useEffect(() => {
    const epSlug = searchParams.get('ep');
    if (epSlug) {
      const episode = getEpisodeBySlug(epSlug);
      if (episode && !episode.comingSoon) {
        setSelectedEpisode(episode);
        setIsModalOpen(true);
      }
    }
  }, [searchParams]);

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
    <>
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
            Season 1 • 20 Episodes of educational esports content
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
    </>
  );
}

export default function EpisodesPage() {
  return (
    <main className="min-h-screen bg-gdc-dark pt-24 pb-16">
      <Suspense fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-gdc-dark-lighter rounded w-1/3 mb-4"></div>
            <div className="h-6 bg-gdc-dark-lighter rounded w-1/2 mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="aspect-video bg-gdc-dark-lighter rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      }>
        <EpisodesContent />
      </Suspense>
    </main>
  );
}
