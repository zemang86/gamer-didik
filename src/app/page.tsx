'use client';

import { useState, useCallback } from 'react';
import HeroSection from '@/components/hero/HeroSection';
import EpisodeRow from '@/components/episodes/EpisodeRow';
import EpisodeGrid from '@/components/episodes/EpisodeGrid';
import VideoModal from '@/components/video/VideoModal';
import { episodes, getFeaturedEpisode, getNextEpisode, getPreviousEpisode } from '@/data/episodes';
import { Episode } from '@/types/episode';

export default function HomePage() {
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const featuredEpisode = getFeaturedEpisode();
  const latestEpisodes = episodes.slice(0, 10);
  const allEpisodes = episodes;

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

  const handleWatchNow = useCallback(() => {
    if (featuredEpisode) {
      handlePlayEpisode(featuredEpisode);
    }
  }, [featuredEpisode, handlePlayEpisode]);

  return (
    <main className="min-h-screen bg-gdc-dark">
      {/* Hero Section */}
      <HeroSection onWatchNow={handleWatchNow} />

      {/* Latest Episodes Row */}
      <section className="py-12 md:py-16">
        <EpisodeRow
          title="Latest Episodes"
          subtitle="Start watching from the beginning"
          episodes={latestEpisodes}
          onPlay={handlePlayEpisode}
        />
      </section>

      {/* All Episodes Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">All Episodes</h2>
            <p className="text-gdc-gray mt-1">Season 1 • 30 Episodes</p>
          </div>
          <EpisodeGrid episodes={allEpisodes} onPlay={handlePlayEpisode} />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gdc-dark-light">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Meet <span className="text-gdc-red">Bob</span> & <span className="text-gdc-red">Izz</span>
          </h2>
          <p className="text-gdc-gray-light text-lg mb-8">
            Join Bob, the veteran gamer, and Izz, the curious newcomer, as they explore the world of esports.
            Together, they debunk gaming myths and showcase the skills, discipline, and teamwork that make
            competitive gaming more than just play.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Bob */}
            <div className="glass rounded-2xl p-6 text-left">
              <div className="w-20 h-20 rounded-full bg-gdc-red/20 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-gdc-red">B</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Bob</h3>
              <p className="text-gdc-gray-light text-sm mb-3">The Veteran Gamer</p>
              <p className="text-gdc-gray text-sm">
                An expressive, witty, and passionate gamer who knows the esports world inside out.
                Bob brings years of competitive experience and a love for sharing gaming wisdom.
              </p>
            </div>

            {/* Izz */}
            <div className="glass rounded-2xl p-6 text-left">
              <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-white">I</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Izz</h3>
              <p className="text-gdc-gray-light text-sm mb-3">The Newcomer</p>
              <p className="text-gdc-gray text-sm">
                A curious intern who represents viewers new to esports. Izz asks the questions
                everyone is thinking and discovers the world of gaming through fresh eyes.
              </p>
            </div>
          </div>
        </div>
      </section>

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
